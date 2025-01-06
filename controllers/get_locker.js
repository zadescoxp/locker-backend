import model from "../schema/locker.js";

const get_locker = async (req, res, next) => {
  const { name } = req.body;
  const locker = await model.findOne({ name: name }).exec();
  if (locker) {
    res.json({ status: 1 });
  } else {
    res.status(400).json({ status: 0, message: "Locker not found" });
  }
};

export { get_locker };
