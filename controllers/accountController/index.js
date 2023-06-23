const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require('../../modules/jwt');
const status = require('../../utils/status');
const { hashing } = require('../../utils/hashing');
const parameterChecker = require('../../utils/parameterChecker');

module.exports = {
  check: require('./check')(prisma, status),
  signin: require('./signin')(prisma, status, parameterChecker, hashing, jwt),
  signUp: require('./signUp')(prisma, status, parameterChecker, hashing),
  isAdmin: require('./isAdmin')(prisma, status),
  withdrawal: require('./withdrawal')(prisma, status, parameterChecker),
  updateUserId: require('./updateUserId')(prisma, status)
};