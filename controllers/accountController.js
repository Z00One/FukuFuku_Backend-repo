const jwt = require('../modules/jwt');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

  // 로그인 시 사용자의 id를 바탕으로 토큰 발급
  signin: async (req, res) => {
    // 로그인 로직 작성
    // 로그인 정보가 올바르지 않으면 토큰 없이 response
    
    // account정보를 DB에서 조회
    const account = await prisma.account.findFirst({
      where: {
        userId: userId,
      },
    });


    // userId, userPassword 비교
    const userId = req.body.userId;
    const userPassword = req.body.userId;


    // account의 nickname 을 통해 토큰을 생성
    const jwtToken = await jwt.sign(account);
    return { token: jwtToken.token };
  }
}

