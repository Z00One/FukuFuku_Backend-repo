module.exports = (prisma, status) =>
  async (boardNo) => {
    // 댓글
    try {
      if (!boardNo) {
        return status.UnprocessableEntity;
      };

      const _boardNo = BigInt(boardNo);

      // 게시글 번호로 댓글 조회
      const comments = await prisma.comment.findMany({
        where: {
          boardNo: _boardNo
        }
      });

      const serializedComments = JSON.stringify(comments, (key, value) => {
        if (typeof value === 'bigint') {
          return Number(value); // BigInt to Number
        }
        return value;
      });

      return {
        status: 200,
        data: serializedComments
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }