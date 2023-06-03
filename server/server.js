const express = require("express");
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "..", "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.use("/auth", require("./routes/auth.routes"));
app.use("/links", require("./routes/links.routes"));
app.use("/rdr", require("./routes/redirect.routes"));

mongoose
  .connect(config.get("mongoUri"))
  .then(() => console.log("DB ok"))
  .catch((error) => console.log(`DB error ${error}`));

app.listen(config.get("port"), () => {
  try {
    console.log(`Server successful started on ${config.get("port")} port`);
  } catch (err) {
    console.log("error");
    console.log(err);
  }
});
