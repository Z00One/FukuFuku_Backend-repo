// 닉네임, 내용 요청
// boardNo, nickname, comment 받아서 처리
module.exports = (prisma, status, parameterChecker) =>
  async (req, res) => {
    const { nickname } = req.headers;
    const { boardNo, comment } = req.body;

    const isAuthenticParameter = parameterChecker(boardNo, nickname, comment);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      // db 등록
      const newComment = await prisma.comment.create({
        data: {
          boardNo: boardNo,
          nickname: nickname,
          comment: comment,
          commentDate: new Date()
        }
      });

      const serializedComment = JSON.stringify(newComment, (key, value) => {
        if (typeof value === 'bigint') {
          return Number(value); // BigInt to Number
        }
        return value;

      });
      return {
        status: 200,
        data: serializedComment
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };