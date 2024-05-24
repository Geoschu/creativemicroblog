const router = require("express").Router(); // update for react router (daniel)
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: false,
});
// this is all updated for curent file folder for this project (daniel)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "media",
    use_filename: true,
    overwrite: true,
  },
});

const parser = multer({ storage: storage });
//needs update for posting or mutation within the rest of the prject.. (daniel)
router.post("/upload", parser.single("image"), (req, res) => {
  // if you need to store a path to the image as stored on Cloudinary in your database,
  // req.file has that info
  console.log(req.file);
  res.json(req.file);
});

module.exports = router;