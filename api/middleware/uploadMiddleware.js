const s3 = require('./../../base/constants/s3/s3.config.js');

const uploadMiddleware = (req, res, next) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;
    
  // Generate unique file name
  const fileName = new Date().getTime().toString() + '_' + req.file.originalname;
  params.Key = `Upload/${req.params.tipoUpload}/${req.params.id}/${fileName}`;
  params.Body = req.file.buffer;

  // Construct the S3 URL for the uploaded file
  const urlImage = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

  // Upload the file to S3
  s3Client.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading to S3:', err);
      return res.status(500).json({ error: 'Error uploading file to S3', details: err.message });
    }

    // Store the URL in req for access in subsequent middleware
    req.urlImage = urlImage;

    // Move to the next middleware
    next();
  });
};

module.exports = {
  uploadMiddleware,
};
