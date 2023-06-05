const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const accountController = require('../controllers/accountController');

const jwt = require('../modules/jwt')
const status = require('../utils/status')

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
        }

        if (decodedToken === TOKEN_INVALID || decodedToken.nickname === undefined) {
            return res.status(status.Unauthorized.status).json({ message: 'TOKEN_INVALID' });
        }
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
            return isAdmin
        }
        // 관리자
        next();
    }
}