module.exports = (prisma, status) =>
  async (id, nickname) => {
    try {
      const _id = BigInt(id);

      const comment = await prisma.comment.findFirst({
        where: {
          id: _id
        }
      });

      if (!comment) {
        return status.NotFound;
      };

      const account = await prisma.account.findFirst({
        where: {
          nickname: nickname
        }
      });

      const isAdmin = account?.isAdmin;

      const isCommentOwner = nickname == comment.nickname;

      if (isCommentOwner || isAdmin) {
        return status.OK;
      };

      return status.Unauthorized;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };