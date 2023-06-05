module.exports = (prisma, numberConverter) =>
  async () => {
    // 유저 정보
    const memberofteam = await prisma.memberofteam.findMany();
    // memberofteam 키 값으로 image 테이블에 접근해 맴버 fileName 받아오기
    for (const e of memberofteam) {
      let memberBoardNo = e.memberBoardNo;
      const image = await prisma.image.findFirst({
        where: {
          memberBoardNo: memberBoardNo
        }
      });
      const fileName = image?.fileName || ''; // 조회된 값의 여부에 따라 데이터 구성
      e.fileName = fileName;
      memberBoardNo = numberConverter(memberBoardNo);
      e.memberBoardNo = memberBoardNo;
    }
    return {
      status: 200,
      data: memberofteam
    }
  }