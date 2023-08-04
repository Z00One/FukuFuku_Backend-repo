module.exports = (prisma, status, parameterChecker, hashing, jwt) =>
  async (req, res) => {
    const { userId, userPassword } = req.body;
    const isAuthenticParameter = parameterChecker(userId, userPassword);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      const account = await prisma.account.findFirst({
        where: {
          userId: userId
        },
      });

      if (account && account.userPassword === hashing(userPassword)) {
        // account의 nickname 을 통해 토큰을 생성
        const jwtToken = await jwt.sign(account);
        const result = account.isAdmin ? {
          token: jwtToken.token,
          nickname: account.nickname,
          userId: account.userId,
          isAdmin: true,
        } : {
          token: jwtToken.token,
          nickname: account.nickname,
          userId: account.userId
        };

        return {
          status: 200,
          data: result
        };
      };

      return status.BadRequest;

    }
    catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };