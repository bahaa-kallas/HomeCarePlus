import multer from "multer";
import path from "path";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

let storageEngine: multer.StorageEngine = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const isAwsS3Configured = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION && process.env.AWS_BUCKET_NAME;
if (isAwsS3Configured) {
  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  });

  storageEngine = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, "aws_" + Date.now().toString() + "_" + file.originalname);
    },
  });
}

export default storageEngine;
export {
  isAwsS3Configured,
};