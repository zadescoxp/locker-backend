import model from "../schema/locker.js";
import bcrypt from "bcrypt";

const add_locker = async (req, res, next) => {
  const { name } = await req.body;
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
  const findName = model.findOne({ name });
  if (findName.length > 0) {
    return res.json({
      error: "Name already exists",
    });
  } else {
    const { passkey } = await req.body;
    if (!passkey) {
      return res.json({
        error: "Passkey is required",
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
