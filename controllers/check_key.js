import model from "../schema/locker.js";
import bcrypt from "bcrypt";
import { s3 } from "../config/aws.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { decryptObjectValues } from "../config/utils.js";

dotenv.config();

const check_key = async (req, res, next) => {
  const { name, key } = decryptObjectValues(req.body);
  const locker = await model.findOne({ name: name }).exec();
  if (locker) {
    const match = await bcrypt.compare(String(key), locker.passkey);
    if (match) {
      let lockerData = [];
      if (locker.data.length > 0) {
        for (let i = 0; i < locker.data.length; i++) {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: locker.data[i].fileName,
          };
          const command = new GetObjectCommand(getObjectParams);
          const signedUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });
          lockerData.push({
            fileName: locker.data[i].fileName,
            url: signedUrl,
          });
        }
      }
      res.json({ status: 1, name: locker.name, data: lockerData });
    } else {
      res.status(400).json({ status: 0, message: "Incorrect Passkey" });
    }
  } else {
    res.status(404).json({ status: 0, message: "Locker Not Found" });
  }
};

export { check_key };
