const { hashing } = require('../../utils/hashing');

module.exports = (prisma, status, parameterChecker) =>
  async (req, res) => {
    // 미들웨어로 nickname 확인
    const { nickname, userPassword } = req.body;
    
    const isAuthenticParameter = parameterChecker(nickname, userPassword);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      const account = await prisma.account.findFirst({
        where:{
          nickname: nickname
        }
      });
      
      if (!account) {
        return status.NotFound
      };
      
      const _userPassword = account.userPassword;

      // 비밀번호 확인
      if (_userPassword != hashing(userPassword)) {
        return {
          status: status.Unauthorized.status,
          message: 'Incorrect password'
        };
      };

      await prisma.account.delete({
        where: {
          nickname: nickname
        }
      });

      return status.NoContent;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };