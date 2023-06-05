const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require('../../modules/jwt');
const status = require('../../utils/status');
const { hashing } = require('../../utils/hashings');
const parameterChecker = require('../../utils/parameterChecker');

module.exports = {
  idCheck: require('./idCheck')(prisma, status, parameterChecker),
  signin: require('./signin')(prisma, status, parameterChecker, hashing, jwt),
  signup: require('./signup')(prisma, status, parameterChecker, hashing),
  isAdmin: require('./isAdmin')(prisma, status),
}