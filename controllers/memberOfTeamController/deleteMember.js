module.exports = (prisma, status, parameterChecker, numberConverter) =>
  async (memberBoardNo) => {
    const isAuthenticParameter = parameterChecker(memberBoardNo);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    try {
      const _memberBoardNo = numberConverter(memberBoardNo);

      const isExist = await prisma.memberofteam.findUnique({
        where: {
          memberBoardNo: _memberBoardNo,
        },
      });

      if (!isExist) {
        return status.NotFound;
      }

      await prisma.memberofteam.delete({
        where: {
          memberBoardNo: _memberBoardNo,
        },
      });

      return status.NoContent;

    } catch (error) {
      console.log(error)
      return status.InternalServerError;
    }
  }