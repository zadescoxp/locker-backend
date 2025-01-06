import { PutObjectCommand } from "@aws-sdk/client-s3";
import model from "../schema/locker.js";
import dotenv from "dotenv";
import { s3 } from "../config/aws.js";

dotenv.config();

const uploadFile = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  res.send({});
};

export { uploadFile };
