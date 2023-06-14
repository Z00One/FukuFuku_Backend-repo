module.exports = (prisma, status) =>
  async (id, nickname) => {
    try {
      const comment = await prisma.comment.findFirst({
        where: {
          id: BigInt(id)
        }
      });

      if (!comment) {
        return status.NotFound;
      };

      const isCommentOwner = nickname == comment.nickname;

      if (isCommentOwner) {
        return status.OK;
      };

      return status.Unauthorized;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };