module.exports = (prisma, status, serializing) =>
  async (req, res) => {
    const { memberBoardNo, memberName, introduceContent } = req.body;
    // 파라미터에 값이 있을 때에만 업데이트
    try {
      if (!(memberName || introduceContent)) {
        return status.NoContent;
      };

      const _memberBoardNo = BigInt(memberBoardNo);

      const member = await prisma.memberofteam.update({
        where: {
          memberBoardNo: _memberBoardNo,
        },
        data: {
          memberName: memberName,
          introduceContent: introduceContent
        },
        rejectOnNotFound: false,
      });

      if (!member) {
        return status.NotFound;
      };

      const serializedMember = serializing(member);

      return {
        status: status.Created.status,
        data: serializedMember
      };

    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    };
  };