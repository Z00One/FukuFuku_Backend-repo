const routers = {
  main: require('./main/'),
  signin: require('./signIn')
}

module.exports = (app) => {
  app.use('/', routers.main());
  app.use('/signin', routers.signin());
}