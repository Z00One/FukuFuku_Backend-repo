const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const { secretKey, option } = require('../config/secretkey');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  // 토큰 발급
  sign: async (account) => {
    const nickname = account.nickname;
    const payload = {
      nickname: nickname,
    };
    const token = {
      token: jwt.sign(payload, secretKey, option),
      refreshToken: randToken.uid(256)
    };
    return token;
  },
  // 토큰 인증
  verify: async (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      }
      console.log('invalid token');
      return TOKEN_INVALID;
    }
  }
}