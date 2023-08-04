module.exports = (prisma, status) =>
  async (boardNo, title, content) => {
    try {
      if (!(title || content)) {
        return status.NoContent;
      }

      const post = await prisma.board.update({
        where: {
          boardNo: boardNo
        },
        data: {
          title: title,
          content: content
        },
        rejectOnNotFound: false
      });

      if (!post) {
        return status.NotFound;
      };

      return status.Created;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }