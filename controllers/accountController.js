const jwt = require('../modules/jwt');
const { PrismaClient } = require("@prisma/client");
const { hashing } = require('../utils/hashing.js');
const prisma = new PrismaClient();

module.exports = {

  // 클라이언트로부터 GET을 통한 사용자의 id 중복 체크
  idCheck: async (req, res) => {
    const { userId } = req.query;
    const account = await prisma.account.findFirst({
      where: { userId: userId },
    });

    if (account !== null) {
      // id가 존재하면
      res.json({ exists: 1 });
    } else {
      // 없으면
      res.json({ exists: 0 });
    }
  },

  // 클라이언트가 POST를 통해 사용자 회원가입, 단 닉네임 중복시 에러 메시지 표출
  signup: async (req, res) => {
    const { userId, userPassword, nickname } = req.body;
    let message = "이미 존재하는 닉네임 입니다";
    // /signup 경로의 POST 요청을 처리할 수 있는 코드
      try {
        const account = await prisma.account.create({
          data: {
            userId: userId,
            userPassword: hashing(userPassword),
            nickname: nickname // 닉네임 중복은 db상에서 UniqueKey로 존재하므로 중복시 account 생성이 불가능함
          },
        });
        // 성공/실패 시 클라이언트에 메시지
        if(account){
          message = "회원가입 성공";
          console.log('성공!');
        }
        res.json({message});
      } catch (error){ // 에러 발생
        res.json({message});
      }
  },


  // 로그인 시 사용자의 id를 바탕으로 토큰 발급
  signin: async (req, res) => {
    const { userId, userPassword } = req.body;
    console.log(req.body);
    // 로그인 로직 작성
    try{
        // account정보를 DB에서 조회
      const account = await prisma.account.findFirst({
        where: {
          userId: userId
        },
      });

      if(account && account.userPassword === hashing(userPassword)){ 
        // 계정 존재 확인 && 로그인 비밀번호와 암호화푼 비밀번호와 동일한지 검색, 틀리다면 error


        // 회원의 닉네임과 관리자 여부 값을 반환
        const isAdmin = account.isAdmin;

        // account의 nickname 을 통해 토큰을 생성
        const jwtToken = await jwt.sign(account);
        const token = jwtToken.token;
        res.json({
          token,
          isAdmin
        });
      } else {
        // 로그인 정보가 올바르지 않으면 토큰 없이 response
        const message = '존재하지 않는 아이디 또는 비밀번호를 틀렸습니다!'
        res.json(message);
      }
    } catch (error){
      // 에러
      console.error(error);
    }
  }
}