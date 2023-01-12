const express = require("express");
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

app.use(express.json());

// var privateKey = fs.readFileSync("./key.pem"); //, "utf8");
// var certificate = fs.readFileSync("./cert.pem"); //

// var credentials = { key: privateKey, cert: certificate };

app.use("/", express.static(path.join(__dirname, "build")));

// httpsOptions = {
//   key: fs.readFileSync("key.pem"), // путь к ключу
//   cert: fs.readFileSync("cert.pem"), // путь к сертификату
// };

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
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

// your express configuration here

//let httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// //httpServer.listen(8080);
// httpsServer.listen(8443);

// https.createServer(httpsOptions, app).listen(80);
