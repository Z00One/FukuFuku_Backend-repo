module.exports = (prisma, status, parameterChecker, numberConverter) =>
  async (memberBoardNo, memberName, introduceContent, fileName) => {
    const isAuthenticParameter = parameterChecker(memberBoardNo, memberName, introduceContent, fileName);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    const _memberBoardNo = numberConverter(memberBoardNo);
    try {
      const member = await prisma.memberofteam.update({
        where: {
          memberBoardNo: _memberBoardNo,
        },
        data: {
          memberName: memberName,
          introduceContent: introduceContent
        },
        rejectOnNotFound: false, // 레코드가 없을 경우 에러 발생하지 않음
      });

      if (!member) {
        return status.NotFound;
      }

      await prisma.image.update({
        where: {
          memberBoardNo: _memberBoardNo,
        },
        data: {
          fileName: fileName,
        },
      });

      return status.Created;

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  }