const multer = require("multer");
const path = require("path");
function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  //file upload folder
  const UPLOADS_FOLDER = `${__dirname}/..public/uploads/${subfolder_path}/`;
  //define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
      //Important File.pdf => important-file-6543676685.pdf
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
  //prepare the final multer upload object
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg));
      }
    },
  });
  return upload;
}
module.exports = uploader;
