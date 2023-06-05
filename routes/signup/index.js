// SIGNUP
const router = require('express').Router();
const accountController = require('../../controllers/accountController')
module.exports = () => {
    // 회원가입
    router.post('/', async (req, res) => {
      await accountController.signup(req, res);
    });
    // id 중복체크
    router.get('/', async (req, res) => {
      await accountController.idCheck(req, res);
    });

    return router;
}