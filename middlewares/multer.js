require('dotenv').config();
const { S3Client } = require("@aws-sdk/client-s3");
const shortId = require('shortid');
const multer = require('multer');
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      region: process.env.S3_REGION,
    }),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, callback) {
      const fileId = shortId.generate();
      const type = file.mimetype.split('/')[1];
      const fileName = `${fileId}.${type}`;
      callback(null, fileName);
    },
    acl: 'public-read-write',
  }),
});

module.exports = upload;