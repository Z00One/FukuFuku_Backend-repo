module.exports = (prisma, status) =>
  async (nickname) => {
    if (!nickname){
      return status.Unauthorized;
    };

    try {
      const account = await prisma.account.findFirst({
        where: {
          nickname: nickname
        },
      });

      if (!account) {
        return status.NotFound
      };

      if (!account?.isAdmin) {
        return status.Unauthorized;
      };

      return status.OK;

    }
    catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }