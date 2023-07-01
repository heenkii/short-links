const { Router } = require("express");
const dotenv = require("dotenv");
const LinksModel = require("../models/Links");

dotenv.config();

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const link = process.env.BASE_URL + "/rdr/" + req.params.id;
    LinksModel.findOneAndUpdate(
      {
        from: link,
      },
      {
        $inc: {
          clicks: 1,
        },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "return value error",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "error",
          });
        }
        res.redirect(doc.to);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Undefined link",
    });
  }
});

module.exports = router;
