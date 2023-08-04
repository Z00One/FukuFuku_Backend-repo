module.exports = (prisma, numberConverter) =>
  async () => {
    const memberofteam = await prisma.memberofteam.findMany();

    for (const member of memberofteam) {
      let memberBoardNo = member.memberBoardNo;
      const image = await prisma.memberImage.findFirst({
        where: {
          memberBoardNo: memberBoardNo
        }
      });

      const fileName = image?.fileName || ''; // 조회된 값의 여부에 따라 데이터 구성
      member.fileName = fileName;
      memberBoardNo = numberConverter(memberBoardNo);
      member.memberBoardNo = memberBoardNo;
    };

    return {
      status: 200,
      data: memberofteam
    };
  };