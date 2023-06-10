// 회원 탈퇴
// key : nickname
// 토큰 등 데이터 삭제 - 프론트
module.exports = (prisma, status) =>
  async (req, res) => {
    // 미들웨어로 nickname 확인
    const { nickname } = req.body;

    try {
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