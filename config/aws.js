import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";

dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export { upload, s3 };
