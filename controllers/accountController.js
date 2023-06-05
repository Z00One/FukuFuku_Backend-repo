const { PrismaClient } = require("@prisma/client");
const { hashing } = require('../utils/hashing.js');
const prisma = new PrismaClient();

const { hashing } = require('../utils/hashings');
const jwt = require('../modules/jwt');
const status = require('../utils/status');
const parameterChecker = require('../utils/parameterChecker');

module.exports = {
  idCheck: async (req, res) => {
    const { userId } = req.query;
    const isAuthenticParameter = parameterChecker(userId);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    const account = await prisma.account.findFirst({
      where: { userId: userId },
    });

    if (account) {
      return status.Conflict;
    }
    return status.OK
  },
  signin: async (req, res) => {
    const { userId, userPassword } = req.body;
    const isAuthenticParameter = parameterChecker(userId, userPassword);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    try {
      const account = await prisma.account.findFirst({
        where: {
          userId: userId
        },
      });
      if (account && account.userPassword === hashing(userPassword)) {
        // account의 nickname 을 통해 토큰을 생성
        const jwtToken = await jwt.sign(account);
        const result = { token: jwtToken.token };

        result.isAdmin = account?.isAdmin ? isAdmin : null;

        return {
          status: 200,
          data: result
        }
      }
      else if (!account?.userId) {
        return status.NotFound;
      }
      else return status.Unauthorized;
    }
    catch (error) {
      console.log(error);
      return status.InternalServerError;
    }
  },
  signup: async (req, res) => {
    const { userId, userPassword, nickname } = req.body;
    const isAuthenticParameter = parameterChecker(userId, userPassword, nickname);
    if (isAuthenticParameter.isNotMatch) {
      return isAuthenticParameter.message;
    };
    // /signup 경로의 POST 요청을 처리할 수 있는 코드
    try {
      const account = await prisma.account.create({
        data: {
          userId: userId,
          userPassword: hashing(userPassword),
          nickname: nickname // 닉네임 중복은 db상에서 UniqueKey로 존재하므로 중복시 account 생성이 불가능함
        },
      });
      if (!account) {
        return status.Conflict;
      }
      return status.OK
    } catch (error) { // 에러 발생
      console.log(error);
      return status.InternalServerError;
    }
  }
}