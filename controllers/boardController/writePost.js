const koreaTime = require('../../utils/koreaTime')();

module.exports = (prisma, status, parameterChecker, serializing) =>
  async (req, res) => {
    const { nickname } = req.headers;
    const { title, content } = req.body;
    const images = req.files;

    const isAuthenticParameter = parameterChecker(nickname, title, content);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      // 게시글 만들기
      const post = await prisma.board.create({
        data: {
          writer: nickname,
          title: title,
          content: content,
          hit: 0n,
          writeDate: koreaTime
        }
      });

      const boardNo = BigInt(post.boardNo);
      let newPostImages;

      if (images?.length) {

        const imageRecords = images.map((image) => ({
          boardNo: boardNo,
          fileName: image.location,
        }));

        await prisma.postImage.createMany({
          data: imageRecords,
          skipDuplicates: false,
        });

        const _boardNo = [boardNo];

        newPostImages = await prisma.postImage.findMany({
          where: {
            boardNo: {
              in: _boardNo
            }
          }
        });
      }

      console.log(newPostImages)

      if (newPostImages?.length) {

        const imageUrls = newPostImages.map((image) => image.fileName);
        
        post.fileName = imageUrls;
      }

      const serializedPost = serializing(post);

      return {
        status: 201,
        data: serializedPost
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };