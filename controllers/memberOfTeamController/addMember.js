module.exports = (prisma, status, parameterChecker) =>
  async (memberName, introduceContent, fileName) => {
    // 맴버 추가
    try {
      const isAuthenticParameter = parameterChecker(memberName, introduceContent, fileName);
      if (isAuthenticParameter.isNotMatch) {
        return isAuthenticParameter.message;
      };
      // 조원 추가
      const member = await prisma.memberofteam.create({
        data: {
          memberName: memberName,
          introduceContent: introduceContent
        }
      });
      // 사진 추가
      const memberBoardNo = member.memberBoardNo;
      const addImage = await prisma.image.create({
        data: {
          memberBoardNo: memberBoardNo,
          fileName: fileName,
        }
      });

      return status.Created;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }