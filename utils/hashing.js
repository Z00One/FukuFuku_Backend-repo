const crypto = require('crypto');
const { getSalt } = require('./salt');

// crypto 모듈을 통한 비밀번호 암호화
function hashing(password){
  return crypto.pbkdf2Sync(password, getSalt(), 1, 32, 'sha512').toString('hex');
};

module.exports = { hashing };