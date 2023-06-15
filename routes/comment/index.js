const router = require('express').Router();
const commentController = require('../../controllers/commentController');
const boardController = require('../../controllers/boardController');

module.exports = (auth) => {

  // 댓글 가져오기
  router.get('/', async (req, res) => {
    const { boardNo } = req.query;
    const comments = await commentController.getComments(boardNo);
    const hit = await boardController.hit(boardNo); // 조회 수 올리기
    res.status(comments.status).send(comments);
  });

  router.route('/')
    // 댓글 작성
    .post(auth.isUser, auth.personalAuth, async (req, res) => {
      const result = await commentController.writeComment(req, res);
      res.status(result.status).json(result);
    })
    // 댓글 수정
    .put(auth.isUser, auth.personalAuth, auth.isCommentOwner, async (req, res) => {
      const result = await commentController.updateComment(req, res);
      res.status(result.status).json(result);
    })
    // 댓글 삭제
    .delete(auth.isUser, auth.personalAuth, auth.isCommentOwner, async (req, res) => {
      const result = await commentController.deleteComment(req, res);
      res.status(result.status).json(result);
    });

  return router;
};