// PrismaClient 모듈 인스턴스 생성
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const status = require('../utils/status');
const NumberConverter = require('../utils/numberConverter');
const parameterChecker = require('../utils/parameterChecker');

module.exports = {
  // 모든 멤버의 관련 데이터 가져오기
  getAllMember: async () => {
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
      memberBoardNo = NumberConverter(memberBoardNo);
      e.memberBoardNo = memberBoardNo;
    }
    return {status:200,
      data:memberofteam
    }
  },

  addMember: async (memberName, introduceContent, fileName) => {

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
      console.log(member);
      return status.Created;
    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  },

  updateMember: async (memberBoardNo, memberName, introduceContent, fileName) => {
    const isAuthenticParameter = parameterChecker(memberBoardNo, memberName, introduceContent, fileName);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    const _memberBoardNo = NumberConverter(memberBoardNo);
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

      return status.OK;
    } catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  },

  deleteMember: async (memberBoardNo) => {
    const isAuthenticParameter = parameterChecker(memberBoardNo);
    if (isAuthenticParameter.isNotMatch) {
      console.log('#############')
      console.log(isAuthenticParameter)
      return isAuthenticParameter.message;
    };
    try {
      const _memberBoardNo = NumberConverter(memberBoardNo);

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
}