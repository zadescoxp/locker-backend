import { decryptObjectValues } from "../config/utils.js";
import model from "../schema/locker.js";
import bcrypt from "bcrypt";

const add_locker = async (req, res, next) => {
  const { name } = decryptObjectValues(req.body);
  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }
  const findName = model.findOne({ name });
  if (findName.length > 0) {
    return res.status(400).json({
      message: "Name already exists",
    });
  } else {
    const { passkey } = await decryptObjectValues(req.body);
    if (!passkey) {
      return res.status(400).json({
        message: "Passkey is required",
      });
    }
    const key = bcrypt.hashSync(passkey, 10);
    const newLocker = new model({
      name: name,
      passkey: key,
    });
    newLocker.save();
  }
};

export { add_locker };
