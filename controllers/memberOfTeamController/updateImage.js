require('dotenv').config();
const deleteClient = require('../../modules/deleteObject');

module.exports = (prisma, status, parameterChecker, extractKeyFromLocation) =>
  async (req, res) => {
    const { memberboardno } = req.headers;
    const image = req.files;

    const isAuthenticParameter = parameterChecker(memberboardno);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    if (!image.length) {
      return status.UnprocessableEntity
    };

    const _image = image[0];

    try {
      const _memberBoardNo = BigInt(memberboardno);
      const isExist = await prisma.memberofteam.findFirst({
        where: {
          memberBoardNo: _memberBoardNo,
        }
      });

      if (!isExist) {
        return status.NotFound;
      };

      const prevImage = await prisma.memberImage.findFirst({
        where: {
          memberBoardNo: _memberBoardNo
        }
      });

      // 요청의 이미지와 같은 것만 남기고
      // 이미지가 요청온 이미지에 포함되는지 확인
      const deleteKey = [];

      let prevKey;

      if (prevImage?.fileName) {
        prevKey = extractKeyFromLocation(prevImage?.fileName);
      };

      if (prevKey && _image.key != prevKey) {
        await prisma.memberImage.delete({
          where: {
            memberBoardNo: _memberBoardNo,
          }
        });
        deleteKey.push(prevKey);
      };

      // s3에서 삭제
      if (deleteKey.length) {
        const deleteResult = await deleteClient(deleteKey);
        if (!deleteResult)
          console.log(`failure delete ${deleteKey} from s3 for updating image of member`);
      };

      // 파라미터에 값이 없으면 로고이미지로 등록
      if (!_image) {
        await prisma.memberImage.create({
          data: {
            memberBoardNo: _memberBoardNo,
            fileName: process.env.LOGO_IMAGE,
          }
        });
      }

      // DB에 새로 생긴 이미지 넣기
      else {
        await prisma.memberImage.create({
          data: {
            memberBoardNo: _memberBoardNo,
            fileName: _image.location
          }
        });
      };
      
      return {
        status: status.Created.status,
        data: _image.location
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };