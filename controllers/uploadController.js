/**
 * Controller to handle successful single image uploads to S3
 */
const uploadImage = (req, res) => {
  try {
    // Multer-s3 processes the request before it reaches here.
    // If successful, the file information is available in req.file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided or invalid file format. Please upload a valid image (JPG, JPEG, PNG, WEBP).'
      });
    }

    // multer-s3 automatically attaches the S3 URL to req.file.location
    const imageUrl = req.file.location;

    // Return successful response with the uploaded file URL
    return res.status(200).json({
      success: true,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('[Upload Controller] Error handling image upload:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload the image due to an internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export { uploadImage };
