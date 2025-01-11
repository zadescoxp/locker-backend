import { PutObjectCommand } from "@aws-sdk/client-s3";
import model from "../schema/locker.js";
import dotenv from "dotenv";
import { s3 } from "../config/aws.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { decryptObjectValues } from "../config/utils.js";

dotenv.config();

const encryptName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const uploadFile = async (req, res) => {
  const { name, passkey } = decryptObjectValues(req.body);
  const locker = await model.findOne({ name });
  if (!locker) {
    return res.status(400).json({ message: "Locker doesn't exists" });
  }
  const match = await bcrypt.compare(passkey, locker.passkey);
  if (!match) {
    return res.status(400).json({ message: "Incorrect Passkey" });
  }
  if (locker.data.length >= 10) {
    return res.status(400).json({ message: "Locker is full" });
  }
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: encryptName(),
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  locker.data.push({
    fileUrl: `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${params.Key}`,
    fileName: params.Key,
  });
  await locker.save();
  const command = new PutObjectCommand(params);
  await s3.send(command);

  res.json({ message: "File uploaded" });
};

export { uploadFile };
