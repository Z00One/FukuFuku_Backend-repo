module.exports = (prisma, status) =>
  async(req, res) => {
    const prevNickname = req.headers.nickname;

    const { nickname } = req.body;
    
    if (!nickname) {
      return status.UnprocessableEntity;
    };

    try {
      await prisma.account.update({
        where: {
          nickname: prevNickname
        },
        data:{
          nickname: nickname
        }
      });

      return {
        status: status.Created.status,
        data: nickname
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };