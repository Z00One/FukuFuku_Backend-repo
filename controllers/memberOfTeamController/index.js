const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const status = require('../../utils/status');
const numberConverter = require('../../utils/numberConverter');
const parameterChecker = require('../../utils/parameterChecker');
const extractKeyFromLocation = require('../../utils/extractKeyFromLocation');
const serializing = require('../../utils/serializing');

module.exports = {
  getAllMember: require('./getAllMember')(prisma, numberConverter),
  addMember: require('./addMember')(prisma, status, parameterChecker, serializing),
  updateMember: require('./updateMember')(prisma, status, serializing),
  updateImage: require('./updateImage')(prisma, status, parameterChecker, extractKeyFromLocation),
  deleteMember: require('./deleteMember')(prisma, status, parameterChecker, extractKeyFromLocation),
};