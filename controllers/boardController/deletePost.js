const deleteClient = require('../../modules/deleteObject');

module.exports = (prisma, status, parameterChecker, extractKeyFromLocation) =>
  async (req, res) => {
    const { boardno } = req.headers;

    const isAuthenticParameter = parameterChecker(boardno);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      const _boardNo = BigInt(boardno);

      const post = await prisma.board.findFirst({
        where: {
          boardNo: _boardNo
        }
      });

      if (!post) {
        return status.NotFound;
      };

      const images = await prisma.postImage.findMany({
        where: {
          boardNo: {
            in: _boardNo
          }
        }
      });

      if (images?.length) {
        const deleteKey = [];
        for (const image of images) {
          const key = extractKeyFromLocation(image.fileName);
          deleteKey.push(key);
        };

        // s3에서 삭제
        if (deleteKey.length) {
          const deleteResult = await deleteClient(deleteKey);
          if (!deleteResult)
            console.log(`failure delete ${deleteKey} from s3 for updating image of member`);
        };
      };

      await prisma.board.delete({
        where: {
          boardNo: _boardNo
        }
      });

      return status.NoContent;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }