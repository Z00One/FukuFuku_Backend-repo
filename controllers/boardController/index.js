const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const status = require('../../utils/status');
const parameterChecker = require('../../utils/parameterChecker');
const extractKeyFromLocation = require('../../utils/extractKeyFromLocation');
const numberConverter = require('../../utils/numberConverter');

module.exports = {
  getPosts: require('./getPosts')(prisma, status),
  writePost: require('./writePost')(prisma, status, parameterChecker),
  updatePost: require('./updatePost')(prisma, status),
  deletePost: require('./deletePost')(prisma, status, parameterChecker, extractKeyFromLocation),
  updateImage: require('./updateImage')(prisma, status, parameterChecker, extractKeyFromLocation)
}