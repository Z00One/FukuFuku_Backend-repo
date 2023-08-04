const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const status = require('../../utils/status');
const parameterChecker = require('../../utils/parameterChecker');
const serializing = require('../../utils/serializing');

module.exports = {
  getComments: require('./getComments')(prisma, status, serializing),
  writeComment: require('./writeComment')(prisma, status, parameterChecker, serializing),
  updateComment: require('./updateComment')(prisma, status, parameterChecker, serializing),
  deleteComment: require('./deleteComment')(prisma, status, parameterChecker),
  isCommentOwner: require('./isCommentOwner')(prisma, status)
};