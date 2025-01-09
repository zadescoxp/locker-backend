import model from "../schema/locker.js";
import bcrypt from "bcrypt";
import { s3 } from "../config/aws.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { decryptObjectValues } from "../config/utils.js";

const delete_file = async (req, res) => {
  const { name, passkey, fileName } = decryptObjectValues(req.body);
  const locker = await model.findOne({ name: name }).exec();
  if (locker) {
    const match = await bcrypt.compare(passkey, locker.passkey);
    if (match) {
      const file = locker.data.find((file) => file.fileName === fileName);
      if (file) {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: file.fileName,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        locker.data = locker.data.filter((file) => file.fileName !== fileName);
        await locker.save();
        res.json({ status: 1, message: "File Deleted" });
      } else {
        res.status(400).json({ status: 0, message: "File Not Found" });
      }
    } else {
      res.status(400).json({ status: 0, message: "Incorrect Passkey" });
    }
  } else {
    res.status(400).json({ status: 0, message: "Locker Not Found" });
  }
};

export { delete_file };
