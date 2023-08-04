const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const status = require('../../utils/status');
const numberConverter = require('../../utils/numberConverter');
const parameterChecker = require('../../utils/parameterChecker');

module.exports = {
  getAllMember: require('./getAllMember')(prisma, numberConverter),
  addMember: require('./addMember')(prisma, status, parameterChecker),
  updateMember: require('./updateMember')(prisma, status, parameterChecker, numberConverter),
  deleteMember: require('./deleteMember')(prisma, status, parameterChecker, numberConverter),
}