const mongoose = require("mongoose");

const UserShema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    confirm: {
      type: Boolean,
      require: false,
      default: false,
    },
    passwordHash: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserShema);
