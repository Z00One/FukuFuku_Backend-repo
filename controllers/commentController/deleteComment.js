const NOT_FOUND_ERROR = 'P2025';

module.exports = (prisma, status) =>
  async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return status.UnprocessableEntity;
    };
    // 댓글 삭제, boardNo, id로 구분
    try {
      const _id = BigInt(id);
      // boardNo, id 댓글의 comment 삭제
      await prisma.comment.delete({
        where: {
          id: _id
        }
      });

      return status.NoContent;

    } catch (error) {
      console.log(error);

      if (error?.code == NOT_FOUND_ERROR) {
        return {
          status: status.NotFound.status,
          message: error.meta.cause
        };
      };

      return status.InternalServerError;
    }
  }