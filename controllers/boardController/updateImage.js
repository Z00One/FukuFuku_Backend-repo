require('dotenv').config();
const deleteClient = require('../../modules/deleteObject');

module.exports = (prisma, status, parameterChecker, extractKeyFromLocation) =>
  async (boardNo, images, prevImages) => {
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
      // s3에서 삭제
      const deleteKey = prevImages.map(key => extractKeyFromLocation(key));

      if (deleteKey.length) {
        const deleteResult = await deleteClient(deleteKey);
        if (!deleteResult)
          console.log(`failure delete ${deleteKey} from s3 for updating image of member`);

        for (const fileName of prevImages) {
          // db에서 url 삭제
          await prisma.image.delete({
            where: {
              fileName: fileName
            }
          });
        };
      };

      // 새로운 이미지 db등록
      const imageRecords = images.map((image) => ({
        boardNo: _boardNo,
        fileName: image.location,
      }));

      await prisma.image.createMany({
        data: imageRecords,
        skipDuplicates: true,
      });

      return status.Created;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  };