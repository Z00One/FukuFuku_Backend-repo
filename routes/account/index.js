const router = require('express').Router();
const accountController = require('../../controllers/accountController');

module.exports = (auth) => {

  router.post('/', async (req, res) => {
    const result = await accountController.signin(req, res);
    res.status(result.status).json(result);
  })

  router.post('/signUp', async (req, res) => {
    const result = await accountController.signUp(req, res);
    res.status(result.status).json(result);
  });

  router.get('/idCheck', async (req, res) => {
    const result = await accountController.check(req, res);
    res.status(result.status).json(result);
  });

  router.get('/nicknameCheck', auth.isUser, auth.personalAuth, async (req, res) => {
    const result = await accountController.check(req, res);
    res.status(result.status).json(result);
  });

  router.delete('/withdrawal', auth.isUser, auth.personalAuth, async (req, res) => {
    const result = await accountController.withdrawal(req, res);
    res.status(result.status).json(result);
  });
  
  router.put('/updateUserId', auth.isUser, auth.personalAuth, async (req, res) => {
    const result = await accountController.updateUserId(req, res);
    res.status(result.status).json(result);
  })

  return router;
};