const multer = require("multer");
const path = require("path");

const UPLOADS_FOLDER = "./upload";

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },

  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});
// upload middleware
const uploader = multer({
  // dest: UPLOADS_FOlDER,
  storage: storage,
  limits: {
    fileSize: 5000000, // 5mb
  },

  fileFilter: (req, file, cb) => {
    // console.log("fileFilter", file, cb);
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .jpg, .png, .jpeg formats are allowed"));
    }
  },
});

module.exports = uploader;
