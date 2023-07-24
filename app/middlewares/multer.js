const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 100000000).toString(16) + '-' + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    //reject file
    cb({ message: 'Unsupported file format' }, false);
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter,
});

module.exports = uploadMiddleware;
