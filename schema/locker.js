import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const lockerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passkey: {
    type: String,
    required: true,
  },
  data: [fileSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("locker", lockerSchema);

export default model;
