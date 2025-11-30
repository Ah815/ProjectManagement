import dotenv, { configDotenv } from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(PORT, () => {
  console.log(` my server is listing in ${PORT}`);
});
