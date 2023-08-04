module.exports = (prisma, status, parameterChecker, serializing) =>
  async (req, res) => {
    const { memberName, introduceContent } = req.body;
    const image = req.files;

    const isAuthenticParameter = parameterChecker(memberName, introduceContent);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };

    try {
      // 조원 추가
      const member = await prisma.memberofteam.create({
        data: {
          memberName: memberName,
          introduceContent: introduceContent
        }
      });

      const memberBoardNo = member.memberBoardNo;

      // 파라미터에 값이 없으면 로고이미지로 등록
      if (!image) {
        await prisma.memberImage.create({
          data: {
            memberBoardNo: memberBoardNo,
            fileName: process.env.LOGO_IMAGE,
          }
        });
      };

      // 사진 저장 주소
      const fileUrl = image[0].location;

      // 사진 추가
      const addImage = await prisma.memberImage.create({
        data: {
          memberBoardNo: memberBoardNo,
          fileName: fileUrl
        }
      });

      member.fileName = fileUrl;

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