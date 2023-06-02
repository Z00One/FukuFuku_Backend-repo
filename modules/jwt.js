// jwt 발급

const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;
const options = require('../config/secretkey').option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  // 토큰 발급
  sign: async (account) => {
    // nickname 사용
    const payload = {
      nickname: account.nickname,
    };
    const result = {
      // sign메소드를 통해 access token 발급
      token: jwt.sign(payload, secretKey, options),
      refreshToken: randToken.uid(256)
    };
    return result;
  },
  // 토큰 인증
  verify: async (token) => {
    let decoded;
    try {
      // verify를 통해 값 decode
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }

    // 
    return decoded;
  }
}