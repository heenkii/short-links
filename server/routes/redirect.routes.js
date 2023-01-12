const { Router } = require("express");
const config = require("config");

const LinksModel = require("../models/Links");

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const link = config.get("baseUrl") + "/rdr/" + req.params.id;
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
          console.log(err);
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
