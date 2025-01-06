import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { add_locker } from "./controllers/add_locker.js";
import { check_locker } from "./controllers/check_locker.js";
import { get_locker } from "./controllers/get_locker.js";
import { check_key } from "./controllers/check_key.js";
import { delete_locker } from "./controllers/delete_locker.js";
import { uploadFile } from "./controllers/upload.js";
import { upload } from "./config/aws.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.json({ data: "this is some information" });
});

app.post("/api/check", check_locker);

app.post("/api/locker", add_locker);

app.post("/api/get", get_locker);

app.post("/api/check_key", check_key);

app.post("/api/delete", delete_locker);

app.post("/api/upload", upload.single("file"), uploadFile);

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Databse Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error(err);
  });
