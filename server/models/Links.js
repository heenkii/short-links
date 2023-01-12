const mongoose = require("mongoose");

const LinkShema = new mongoose.Schema(
  {
    owner: {
      //user email
      type: String,
      require: true,
    },
    from: {
      type: String,
      require: true,
    },
    to: {
      //original link
      type: String,
      require: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Links", LinkShema);
