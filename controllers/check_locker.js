import model from "../schema/locker.js";

const check_locker = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ status: 0, message: "Name is required" });
  } else {
    const checkName = await model.findOne({ name: name }).exec();
    if (checkName) {
      res.json({ status: 2, message: "Name already exists" });
    } else {
      res.json({ status: 1, message: "Name is available" });
    }
  }
};

export { check_locker };
