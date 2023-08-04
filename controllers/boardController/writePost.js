module.exports = (prisma, status, parameterChecker) =>
  async (writer, title, content, images) => {
    try {
      const isAuthenticParameter = parameterChecker(writer, title, content);
      if (isAuthenticParameter.isNotMatch) {
        return isAuthenticParameter.message;
      };
      // 게시글 만들기
      const post = await prisma.board.create({
        data: {
          writer: writer,
          title: title,
          content: content,
          hit: 0n
        }
      });
      
      const boardNo = post.boardNo
      // 파라미터에 값이 없으면 로고이미지로 등록 
      if (!images.length) {
        await prisma.image.create({
          data: {
            boardNo: boardNo,
            fileName: 'https://yju-fukufuku.s3.us-east-1.amazonaws.com/fKrhHv7mY.png',
          }
        });
        
        return status.Created;
      };
      
      const imageRecords = images.map((image) => ({
        boardNo: boardNo,
        fileName: image.location,
      }));

      await prisma.image.createMany({
        data: imageRecords,
        skipDuplicates: true,
      });
      
      return status.Created;
      
    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }