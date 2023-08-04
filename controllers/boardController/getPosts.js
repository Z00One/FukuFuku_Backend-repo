const NUM_OF_POST_PER_PAGE = 21;

module.exports = (prisma, status, serializing) =>
  async (req, res) => {
    try {
      const { page } = req.query;

      let posts;

      if (page) {
        const skip = page ? (page - 1) * NUM_OF_POST_PER_PAGE : page;

        posts = await prisma.board.findMany({
          skip: skip,
          take: NUM_OF_POST_PER_PAGE
        });
      }
      // query 에 값이 없다면 유저의 글 조회
      else {
        const { nickname } = req.headers;

        if (!nickname) {
          return status.UnprocessableEntity;
        };

        posts = await prisma.board.findMany({
          where: {
            writer: nickname
          }
        });
      };

      let images;
      // 이미지 url 가져오기
      for (const post of posts) {
        const boardNo = post.boardNo;
        images = await prisma.postImage.findMany({
          where: {
            board: { boardNo }
          }
        });

        let imageFiles = [];

        // 이미지 있는 경우
        if (images.length) {
          for (const image of images) {
            imageFiles.push(image);
          };
        };

        const imageUrls = imageFiles.map((image) => image.fileName);

        post.fileName = imageUrls;
      };

      const serializedPosts = serializing(posts);

      return {
        status: 200,
        data: serializedPosts
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };