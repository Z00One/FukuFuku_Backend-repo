// 조회 시 1up
module.exports = (prisma, status) =>
  async (boardNo) => {
    try {
      const _boardNo = BigInt(boardNo);

      await prisma.board.update({
        where: {
          boardNo: _boardNo
        },
        data: {
          hit: {
            increment: 1
          }
        }
      });

    } catch (error) {
      console.log(error);
    };
  };