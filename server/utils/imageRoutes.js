const router = require("express").Router();
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

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wingspan",
    use_filename: true,
    overwrite: true,
  },
});

const parser = multer({ storage: storage });

router.post("/upload", parser.single("image"), (req, res) => {
  // if you need to store a path to the image as stored on Cloudinary in your database,
  // req.file has that info
  console.log(req.file);
  res.json(req.file);
});

module.exports = router;