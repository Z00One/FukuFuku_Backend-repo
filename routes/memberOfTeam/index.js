const router = require('express').Router();
const memberOfTeamController = require('../../controllers/memberOfTeamController');
const upload = require('../../middlewares/multer');

const LIMIT_OF_IMAGE = 1;

module.exports = (auth) => {

  // 멤버 정보 가져오기
  router.get('/', async (req, res) => {
    const allMember = await memberOfTeamController.getAllMember();
    res.status(allMember.status).json(allMember.data);
  })

  router.route('/member')
    // 조원 추가
    .post(auth.isUser, auth.isAdmin, upload.array('image', LIMIT_OF_IMAGE), async (req, res) => {
      const result = await memberOfTeamController.addMember(req, res);
      res.status(result.status).json(result);
    })
    // 조원 내용 수정
    .put(auth.isUser, auth.isAdmin, async (req, res) => {
      const result = await memberOfTeamController.updateMember(req, res);
      res.status(result.status).json(result);
    })
    // 조원 삭제
    .delete(auth.isUser, auth.isAdmin, async (req, res) => {
      const result = await memberOfTeamController.deleteMember(req, res);
      res.status(result.status).json(result);
    });
    
    // 조원 이미지 업데이트
    router.put('/member/image', auth.isUser, auth.isAdmin, upload.array('image', LIMIT_OF_IMAGE), async (req, res) => {
      const result = await memberOfTeamController.updateImage(req, res);
      res.status(result.status).json(result);
    });

  return router;
}