require('dotenv').config();
const deleteClient = require('../../modules/deleteObject');

// 1. 새로운 이미지 사용: 새로운 이미지 db, S3 등록, 기존의 이미지 db, S3 삭제
// 2. 기본 이미지 사용: 기존의 이미지 db, S3 삭제
module.exports = (prisma, status, parameterChecker, extractKeyFromLocation) =>
  async (req, res) => {
    const { boardNo } = req.body;
    const images = req.files;

    const isAuthenticParameter = parameterChecker(boardNo, images);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      const _boardNo = BigInt(boardNo);

      const isExist = await prisma.board.findFirst({
        where: {
          boardNo: _boardNo,
        }
      });

      if (!isExist) {
        return status.NotFound;
      };

      const prevImages = await prisma.postImage.findMany({
        where: {
          boardNo: {
            in: _boardNo
          }
        }
      });
      
      // s3에서 삭제
      if (prevImages?.length) {
        const deleteKey = prevImages.map(key => extractKeyFromLocation(key.fileName));
        
        if (deleteKey.length) {
          const deleteResult = await deleteClient(deleteKey);
          if (!deleteResult)
          console.log(`failure delete ${deleteKey} from s3 for updating image of member`);
          
          for (const image of prevImages) {
            const fileName = image.fileName;
            // db에서 url 삭제
            await prisma.postImage.delete({
              where: {
                fileName: fileName
              }
            });
          };
        };
      };
      
      // 로고 이미지를 사용하려는 경우
      if (!images.length){
        return status.Created;
      };
      
      // 새로운 이미지 db등록
      const imageRecords = images.map((image) => ({
        boardNo: _boardNo,
        fileName: image.location,
      }));
      
      const newImages = await prisma.postImage.createMany({
        data: imageRecords,
        skipDuplicates: true,
      });

      const imageUrls = imageRecords.map((image) => image.fileName);

      return {
        status: status.Created.status,
        data: imageUrls
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };