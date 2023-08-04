const NUM_OF_POST_PER_PAGE = 2;

module.exports = (prisma, status) =>
  async (page) => {
    // 글 정보 조회
    try {
      const skip = page ? (page - 1) * NUM_OF_POST_PER_PAGE : page;

      const posts = await prisma.board.findMany({
        skip: skip,
        take: NUM_OF_POST_PER_PAGE
      });

      let images;
      // 이미지 url 가져오기
      for (const post of posts) {
        const boardNo = post.boardNo;
        images = await prisma.image.findMany({
          where: {
            board: { boardNo }
          }
        });

        let imageFiles = [];

        // 이미지 있는 경우
        if (images.length) {
          for (const image of images) {
            imageFiles.push(image);
          }
        }
        post.fileName = imageFiles;
      }

      const serializedPosts = JSON.stringify(posts, (key, value) => {
        if (typeof value === 'bigint') {
          return Number(value); // BigInt to Number
        }
        return value;
      });

      return {
        status: 200,
        data: serializedPosts
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }