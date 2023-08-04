const router = require('express').Router();
const boardController = require('../../controllers/boardController');
const upload = require('../../middlewares/multer');

const LIMIT_OF_IMAGE = 5;

module.exports = (auth) => {

  // 글 가져오기
  router.get('/', async (req, res) => {
    const posts = await boardController.getPosts(req, res);
    res.status(posts.status).send(posts);
  });

  // 자신의 글 가져오기
  router.get('/myPosts', auth.isUser, auth.personalAuth, async (req, res) => {
    const myPosts = await boardController.getPosts(req, res);
    res.status(myPosts.status).send(myPosts);
  });

  router.route('/post')
    // 글 작성
    .post(auth.isUser, auth.personalAuth, upload.array('image', LIMIT_OF_IMAGE), async (req, res) => {
      const result = await boardController.writePost(req, res);
      res.status(result.status).json(result);
    })
    // 글 수정
    .put(auth.isUser, auth.personalAuth, auth.isPostOwner, async (req, res) => {
      const result = await boardController.updatePost(req, res);
      res.status(result.status).json(result);
    })
    // 글 삭제
    .delete(auth.isUser, auth.personalAuth, auth.isPostOwner, async (req, res) => {
      const result = await boardController.deletePost(req, res);
      res.status(result.status).json(result);
    });

  // 이미지 업데이트
  router.put('/post/image', auth.isUser, auth.personalAuth, auth.isPostOwner, upload.array('image', LIMIT_OF_IMAGE), async (req, res) => {
    const result = await boardController.updateImage(req, res);
    res.status(result.status).json(result);
  });

  return router;
};