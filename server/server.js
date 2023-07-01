const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/links", require("./routes/links.routes"));
app.use("/rdr", require("./routes/redirect.routes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB ok");
    app.listen(process.env.PORT, () => {
      try {
        console.log(`Server successful started on ${process.env.PORT} port`);
      } catch (err) {
        console.error(err);
      }
    });
  })
  .catch((error) => console.error(`DB error ${error}`));
