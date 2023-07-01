const { Router } = require("express");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");

const LinksModel = require("../models/Links");
const { checkAuth, checkConfirm } = require("../utils/checkAuth");

dotenv.config();

const router = Router();

router.get("/getAll", checkAuth, checkConfirm, async (req, res) => {
  try {
    const userId = req.userId;
    const userLinks = await LinksModel.find({ owner: userId });
    res.status(200).json({
      message: true,
      data: userLinks,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Get links error",
    });
  }
});

router.post("/create", checkAuth, checkConfirm, async (req, res) => {
  try {
    const urlId = nanoid();
    const redirectUrl = process.env.BASE_URL + "/rdr/" + urlId;

    const doc = new LinksModel({
      owner: req.userId,
      from: redirectUrl,
      to: req.body.originalLink,
    });
    const link = await doc.save();
    res.json({ success: true, data: link });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Link is' n created",
    });
  }
});

// router.patch("/update/:id", checkAuth, async (req, res) => {
//   try {
//     const linkId = req.params.id;
//     await LinksModel.updateOne(
//       {
//         _id: linkId,
//       },
//       {
//         to: req.body.to,
//       }
//     );
//     const link = await doc.save();
//     res.json({
//       success: true,
//       data: link,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Update link false",
//     });
//   }
// });

router.delete("/delete/:id", checkAuth, checkConfirm, async (req, res) => {
  try {
    const linkId = req.params.id;
    const doc = await LinksModel.findOneAndDelete({ _id: linkId });
    if (!doc) {
      return res.status(400).json({
        message: "Link not found",
      });
    }
    res.status(201).json({
      success: true,
      data: { id: linkId },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
