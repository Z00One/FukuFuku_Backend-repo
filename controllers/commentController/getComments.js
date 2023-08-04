module.exports = (prisma, status, serializing) =>
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

      const serializedComments = serializing(comments);

      return {
        status: 200,
        data: serializedComments
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }