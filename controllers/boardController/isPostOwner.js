module.exports = (prisma, status) =>
  async (boardNo, nickname) => {
    try {
      const post = await prisma.board.findFirst({
        where: {
          boardNo: BigInt(boardNo)
        }
      });

      if (!post) {
        return status.NotFound;
      };

      const isOwner = nickname == post.writer;

      if (isOwner) {
        return status.OK;
      };

      return status.Unauthorized;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };