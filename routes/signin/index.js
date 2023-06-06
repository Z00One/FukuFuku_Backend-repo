const router = require('express').Router();
const accountController = require('../../controllers/accountController')

module.exports = () => {

  router.post('/', async (req, res) => {
    const result = await accountController.signin(req, res);
    res.status(result.status).json(result);
  })
  
  router.post('/signup', async (req, res) => {
    const result = await accountController.signup(req, res);
    res.status(result.status).json(result);
  });
  
  router.get('/idcheck', async (req, res) => {
    const result = await accountController.idCheck(req, res);
    res.status(result.status).json(result);
  });

  return router;
}