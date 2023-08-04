const NOT_FOUND_ERROR = 'P2025';

module.exports = (prisma, status, parameterChecker, serializing) =>
  async (req, res) => {
    const { id, comment } = req.body;

    const isAuthenticParameter = parameterChecker(id, comment);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    // 댓글 수정, boardNo, nickname, 등록 일자로 구분
    try {
      const _id = BigInt(id);

      // boardNo, id 댓글의 comment 수정
      const _comment = await prisma.comment.update({
        where: {
          id: _id
        },
        data:{
          comment: comment
        }
      });

      const serializedComment = serializing(_comment);

      return {
        status: status.Created.status,
        data: serializedComment
      };

    } catch (error) {
      console.log(error);

      if (error?.code == NOT_FOUND_ERROR) {
        return status.NotFound;
      };

      return status.InternalServerError;
    };
  };