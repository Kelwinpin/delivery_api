const express = require('express');
const router = express.Router();
const upload = require('./../../base/constants/s3/multer.config.js');

const awsWorker = require('../controllers/UploadController.js');

router.post('/:tipoUpload', upload.single('file'), awsWorker.doUpload);
router.post('/:tipoUpload/:id', upload.single('file'), awsWorker.doUpload);

module.exports = router;