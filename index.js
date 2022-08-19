const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog-routes");
const router = require("./routes/user-routes");
const cors = require("cors");
const path = require("path");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static( "/frontend/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(express.json());
app.use(cors());
app.use("/api/user", router); //middle-ware
app.use("/api/blog", blogRouter); //middle-ware

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT)) //listen to port 5000
  .then(() =>
    console.log(`Connected to data base listening to port number ${PORT}`)
  )
  .catch((err) => {
    console.log(err);
  });
