const router = require('express').Router();
const auth = require('../../middlewares/auth')
const memberOfTeamController = require('../../controllers/memberOfTeamController/');

module.exports = () => {

  router.get('/', async (req, res) => {
    const allMember = await memberOfTeamController.getAllMember();
    res.status(allMember.status).json(allMember);
  })

  router.route('/member')
    // 조원 추가
    .post(auth.isUser, auth.isAdmin, async (req, res) => {
      const { memberName, introduceContent, fileName } = req.body;
      const result = await memberOfTeamController.addMember(memberName, introduceContent, fileName);
      res.status(result.status).json(result);
    })
    // 조원 수정
    .put(auth.isUser, auth.isAdmin, async (req, res) => {
      const { memberBoardNo, memberName, introduceContent, fileName } = req.body;
      const result = await memberOfTeamController.updateMember(memberBoardNo, memberName, introduceContent, fileName);
      res.status(result.status).json(result);
    })
    // 조원 삭제
    .delete(auth.isUser, auth.isAdmin, async (req, res) => {
      const { memberBoardNo } = req.body;
      const result = await memberOfTeamController.deleteMember(memberBoardNo);
      res.status(result.status).json(result);
    });

  return router;
}