import model from "../schema/locker.js";

const get_locker = async (req, res, next) => {
  const { id } = req.params;
  const locker = await model.findOne({ name: id }).exec();
  if (locker) {
    res.json({ status: 0 });
  } else {
    res.json({ status: 1 });
  }
};

export { get_locker };
