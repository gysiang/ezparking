const { multer } = require("multer");

const fileFilter = (req,file,cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false);
    }
};


module.exports = {fileFilter}