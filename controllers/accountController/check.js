module.exports = (prisma, status) =>
  async (req, res) => {
    let isIdCheck;
    const { userId, nickname } = req.query;

    if (userId) {
      isIdCheck = true;
    }
    else if (nickname) {
      isIdCheck = false;
    }
    else {
      return status.UnprocessableEntity;
    };

    try {
      let account;

      if (isIdCheck) {
        account = await prisma.account.findFirst({
          where: { userId: userId },
        });
      }
      else {
        account = await prisma.account.findFirst({
          where: { nickname: nickname },
        });
      };

      if (account) {
        return status.Conflict;
      }

      return status.OK;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }