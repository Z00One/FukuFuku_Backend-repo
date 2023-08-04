module.exports = (prisma, status, serializing) =>
  async (req, res) => {
    const { title, content } = req.body;
    const { boardno, nickname } = req.headers;

    try {
      if (!(title || content)) {
        return status.NoContent;
      };

      const _boardNo = BigInt(boardno);

      const post = await prisma.board.update({
        where: {
          boardNo: _boardNo
        },
        data: {
          title: title,
          content: content
        },
        rejectOnNotFound: false
      });

      if (nickname != post?.writer) {
        return status.Unauthorized
      };

      if (!post) {
        return status.NotFound;
      };

      const serializedPost = serializing(post);

      return {
        status: status.Created.status,
        data: serializedPost
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };