import model from "../schema/locker.js";
import bcrypt from "bcrypt";

const delete_locker = async (req, res, next) => {
  const { name, passkey } = req.body;
  const locker = await model.findOne({ name: name }).exec();
  if (locker) {
    const match = await bcrypt.compare(passkey, locker.passkey);
    if (match) {
      await model.deleteOne({ name: name });
      res.json({ status: 1, message: "Locker Deleted" });
    } else {
      res.json({ status: 0, message: "Incorrect Passkey" });
    }
  } else {
    res.json({ status: 0, message: "Locker Not Found" });
  }
};

export { delete_locker };
