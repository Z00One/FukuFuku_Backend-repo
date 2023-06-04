// SIGNIN
const router = require('express').Router();
const accountController = require('../../controllers/accountController')
module.exports = () => {

  router.post('/', async(req, res) => {
    // 인증 후 jwt 발급
    const jsonWebToken = await accountController.signin(req, res)
    res.send(jsonWebToken)
  });

  return router;
}