module.exports = (prisma, status, parameterChecker) =>
  async (req, res) => {
    const { userId } = req.query;
    const isAuthenticParameter = parameterChecker(userId);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    try {
      const account = await prisma.account.findFirst({
        where: { userId: userId },
      });

      if (account) {
        return status.Conflict;
      }

      return status.OK

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }