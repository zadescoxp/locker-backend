import model from "../schema/locker.js";
import bcrypt from "bcrypt";

const check_key = async (req, res, next) => {
  const { name, key } = req.body;
  const locker = await model.findOne({ name: name }).exec();
  if (locker) {
    const match = await bcrypt.compare(key, locker.passkey);
    if (match) {
      res.json({ status: 1, name: locker.name, data: locker.data });
    } else {
      res.status(400).json({ status: 0, message: "Incorrect Passkey" });
    }
  } else {
    res.status(404).json({ status: 0, message: "Locker Not Found" });
  }
};

export { check_key };
