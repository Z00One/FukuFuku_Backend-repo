module.exports = (prisma, status) =>
  async (boardNo, nickname) => {

    try {
      const _boardNo = BigInt(boardNo);

      const post = await prisma.board.findFirst({
        where: {
          boardNo: _boardNo
        }
      });

      if (!post) {
        return status.NotFound;
      };

      const account = await prisma.account.findFirst({
        where: {
          nickname: nickname
        }
      });

      const isAdmin = account?.isAdmin;

      const isOwner = nickname == post.writer;

      if (isOwner || isAdmin) {
        return status.OK;
      };

      return status.Unauthorized;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };