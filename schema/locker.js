import mongoose from "mongoose";

const lockerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passkey: {
    type: String,
    required: true,
  },
  data: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("locker", lockerSchema);

export default model;
