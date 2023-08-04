const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const status = require('../../utils/status');
const parameterChecker = require('../../utils/parameterChecker');

module.exports = {
  getComments: require('./getComments')(prisma, status),
  writeComment: require('./writeComment')(prisma, status, parameterChecker),
  updateComment: require('./updateComment')(prisma, status, parameterChecker),
  deleteComment: require('./deleteComment')(prisma, status, parameterChecker),
  isCommentOwner: require('./isCommentOwner')(prisma, status)
};