const koreaTime = require('../../utils/koreaTime')();

module.exports = (prisma, status, parameterChecker, serializing) =>
  async (req, res) => {
    const { nickname } = req.headers;
    const { boardNo, comment } = req.body;

    const isAuthenticParameter = parameterChecker(boardNo, nickname, comment);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      const _boardNo = BigInt(boardNo); 
      // db 등록
      const newComment = await prisma.comment.create({
        data: {
          boardNo: _boardNo,
          nickname: nickname,
          comment: comment,
          commentDate: koreaTime
        }
      });

      const serializedComment = serializing(newComment);
      
      return {
        status: 200,
        data: serializedComment
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };