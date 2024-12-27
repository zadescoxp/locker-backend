import model from "../schema/locker.js";

const check_locker = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.json({ error: "Name is required" });
  } else {
    const checkName = await model.findOne({ name: name }).exec();
    if (checkName) {
      res.json({ error: "Name already exists" });
    } else {
      res.json({ message: "Name is available" });
    }
  }
};

export { check_locker };
