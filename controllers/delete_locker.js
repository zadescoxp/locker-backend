import model from "../schema/locker.js";
import bcrypt from "bcrypt";
import { s3 } from "../config/aws.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { decryptObjectValues } from "../config/utils.js";

const delete_locker = async (req, res, next) => {
  const { name, passkey } = decryptObjectValues(req.body);
  const locker = await model.findOne({ name: name }).exec();
  if (locker) {
    const match = await bcrypt.compare(passkey, locker.passkey);
    if (match) {
      if (locker.data.length > 0) {
        for (let i = 0; i < locker.data.length; i++) {
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: locker.data[i].fileName,
          };
          const command = new DeleteObjectCommand(params);
          await s3.send(command);
        }
      }
      await model.deleteOne({ name: name });
      res.json({ status: 1, message: "Locker Deleted" });
    } else {
      res.status(400).json({ status: 0, message: "Incorrect Passkey" });
    }
  } else {
    res.status(400).json({ status: 0, message: "Locker Not Found" });
  }
};

export { delete_locker };
