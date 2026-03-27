import express from 'express';
import upload from '../middlewares/upload.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload a single product image to Amazon S3
 * @access  Public (Adjust this according to your authentication middleware, e.g., using requireAuth)
 */
router.post('/', upload.single('image'), uploadImage);

// Example to handle multer error separately (optional extension based on limits/filters)
router.use((error, req, res, next) => {
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'File upload failed'
    });
  }
  next();
});

export default router;
