require('dotenv').config();
const deleteClient = require('../../modules/deleteObject');

module.exports = (prisma, status, parameterChecker, extractKeyFromLocation) =>
  async (req, res) => {
    const { memberBoardNo } = req.body;
    const isAuthenticParameter = parameterChecker(memberBoardNo);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      const _memberBoardNo = BigInt(memberBoardNo);

      const isExist = await prisma.memberofteam.findFirst({
        where: {
          memberBoardNo: _memberBoardNo,
        },
      });

      if (!isExist) {
        return status.NotFound;
      };

      // 이미지 찾아오기
      const image = await prisma.memberImage.findFirst({
        where: {
          memberBoardNo: _memberBoardNo
        }
      });

      // DB 삭제
      await prisma.memberofteam.delete({
        where: {
          memberBoardNo: _memberBoardNo,
        },
      });

      const deleteKey = [];

      if (image) {
        const key = extractKeyFromLocation(image.fileName);
        if (key != process.env.LOGO_IMAGE){
          deleteKey.push(key)
        };
      };

      // S3 삭제
      if (deleteKey.length) {
        const deleteResult = deleteClient(deleteKey);
        if (!deleteResult)
          console.log(`failure delete ${deleteKey} from s3 for updating image of member`);
      };

      return status.NoContent;
    }
    catch (error) {
      console.log(error)
      return status.InternalServerError;
    };
  };