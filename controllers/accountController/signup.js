module.exports = (prisma, status, parameterChecker, hashing) =>
  async (req, res) => {
    const { userId, userPassword, nickname } = req.body;
    const isAuthenticParameter = parameterChecker(userId, userPassword, nickname);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    // /signup 경로의 POST 요청을 처리할 수 있는 코드
    try {
      const account = await prisma.account.create({
        data: {
          userId: userId,
          userPassword: hashing(userPassword),
          nickname: nickname // 닉네임 중복은 db상에서 UniqueKey로 존재하므로 중복시 account 생성이 불가능함
        },
      });
      if (!account) {
        return status.Conflict;
      }

      return status.Created

    } catch (error) { // 에러 발생
      console.log(error);
      return status.InternalServerError;
    }
  }