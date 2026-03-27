import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/s3.js'; // default export of S3Client

// Guard against module interop issues where `s3` could be wrapped as `{ default: ... }`
const s3Client = (s3 && typeof s3.send === 'function')
  ? s3
  : (s3 && typeof s3.default?.send === 'function')
    ? s3.default
    : null;

if (!s3Client) {
  throw new TypeError(
    '[Upload Middleware] Invalid S3 client: expected an AWS SDK v3 S3Client with a send() method.'
  );
}


// Function to filter file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP files are allowed.'), false);
  }
};

// Configure Multer to use S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    // Automatically determine the content type of the file
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      // Store in 'products/' folder with format: timestamp-originalname
      const fileName = `products/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
  },
  fileFilter: fileFilter
});

export default upload;
