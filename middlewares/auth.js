const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const accountController = require('../controllers/accountController');
const boardController = require('../controllers/boardController');
const commentController = require('../controllers/commentController');

const jwt = require('../modules/jwt');
const status = require('../utils/status');

module.exports = {
  // 유저 권한 체크
  isUser: async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
      return res.status(status.Unauthorized.status).json(status.Unauthorized)
    }
    const decodedToken = await jwt.verify(token);

    if (decodedToken === TOKEN_EXPIRED) {
      return res.status(status.Unauthorized.status).json({ message: 'TOKEN_EXPIRED' })
    };

    if (decodedToken === TOKEN_INVALID || decodedToken.nickname === undefined) {
      return res.status(status.Unauthorized.status).json({ message: 'TOKEN_INVALID' });
    };
    // 유효한 토큰 - 사용자
    next();
  },

  // 관리자 권한 체크
  isAdmin: async (req, res, next) => {
    // header는 대소문자 구분하지 않음
    const { token } = req.headers;

    const decodedToken = await jwt.verify(token);

    const isAdmin = await accountController.isAdmin(decodedToken?.nickname);

    if (isAdmin.status != 200) {
      return res.status(isAdmin.status).json(isAdmin);
    };
    // 관리자
    next();
  },

  // 유저 본인 확인
  personalAuth: async (req, res, next) => {
    const { token, nickname } = req.headers;

    if (!(token && nickname)) {
      return res.status(status.UnprocessableEntity.status).json(status.UnprocessableEntity);
    };

    const decodedToken = await jwt.verify(token);

    // 다른 경우
    if (nickname != decodedToken.nickname) {
      return res.status(status.Unauthorized.status).json(status.Unauthorized);
    };

    next();
  },
  // 유저 본인이 작성한 글인지 확인
  isPostOwner: async (req, res, next) => {
    const { nickname, boardno } = req.headers;

    const isPostOwner = await boardController.isPostOwner(boardno, nickname);

    if (isPostOwner.status != 200) {
      return res.status(isPostOwner.status).json(isPostOwner);
    };

    next();
  },

  isCommentOwner: async (req, res, next) => {

    const { nickname, isadmin } = req.headers;
    const { id } = req.body;

    const isCommentOwner = await commentController.isCommentOwner(id, nickname);

    if (isCommentOwner.status != 200) {
      return res.status(isCommentOwner.status).json(isCommentOwner);
    };

    next();
  }
};