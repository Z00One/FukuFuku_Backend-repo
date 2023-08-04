const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const status = require('../../utils/status');
const parameterChecker = require('../../utils/parameterChecker');
const extractKeyFromLocation = require('../../utils/extractKeyFromLocation');
const serializing = require('../../utils/serializing');

module.exports = {
  getPosts: require('./getPosts')(prisma, status, serializing),
  writePost: require('./writePost')(prisma, status, parameterChecker, serializing),
  updatePost: require('./updatePost')(prisma, status, serializing),
  deletePost: require('./deletePost')(prisma, status, parameterChecker, extractKeyFromLocation),
  updateImage: require('./updateImage')(prisma, status, parameterChecker, extractKeyFromLocation),
  hit: require('./hit')(prisma, status),
  isPostOwner: require('./isPostOwner')(prisma, status)
};