const deleteClient = require('../../modules/deleteObject');

module.exports = (prisma, status, parameterChecker, extractKeyFromLocation) =>
  async (boardNo) => {
    console.log(boardNo);
    const isAuthenticParameter = parameterChecker(boardNo);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    // db에서 값 조회후 해당 정보 저장
    try {
      const post = await prisma.board.findFirst({
        where: {
          boardNo: boardNo
        }
      });

      if (!post) {
        return status.NotFound;
      }

      // 이미지 값 있으면
      const images = await prisma.image.findMany({
        where: {
          board: { boardNo }
        }
      });

      // db 값 삭제 - Cascade라 이미지는 자동 삭제됨
      await prisma.board.delete({
        where: {
          boardNo: boardNo
        }
      });

      const deleteKey = [];
      for (const image of images) {
        const key = extractKeyFromLocation(image.fileName);
        deleteKey.push(key);
      }

      // s3에서 삭제
      if (deleteKey.length) {
        const deleteResult = await deleteClient(deleteKey);
        if (!deleteResult)
          console.log(`failure delete ${deleteKey} from s3 for updating image of member`);
      };

      return status.NoContent;

    } catch (error) {
      console.log(error)
      return status.InternalServerError;
    }
  }