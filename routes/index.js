const auth = require('../middlewares/auth');

const routers = {
  memberOfTeam: require('./memberOfTeam'),
  account: require('./account'),
  board: require('./board'),
  comment: require('./comment')
};

module.exports = (app) => {
  app.use('/', routers.memberOfTeam(auth));
  app.use('/account', routers.account(auth));
  app.use('/board', routers.board(auth));
  app.use('/comment', routers.comment(auth));
};