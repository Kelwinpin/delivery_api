const s3 = require('./../../base/constants/s3/s3.config');

exports.doUpload = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;

  const fileName =
    new Date().getTime().toString() + '_' + req.file.originalname;
  if (req.params.id) {
    params.Key =
      'Upload/' + req.params.tipoUpload + '/' + req.params.id + '/' + fileName;
  } else {
    params.Key = 'Upload/' + req.params.tipoUpload + '/' + fileName;
  }

  params.Body = req.file.buffer;

  const urlImage = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
  s3Client.upload(params, (err, data) => {
    if (err) {
      console.log('Error -> ' + err);
      res.status(500).json({
        error: 'Error -> ' + err,
      });
    }
    return res.status(200).send(urlImage);
  });
};

exports.doUploadPromise = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // Validar se req.file existe
      if (!req.file || !req.file.buffer) {
        reject(new Error('Nenhum arquivo foi enviado ou arquivo inválido'));
        return;
      }

      const s3Client = s3.s3Client;
      const params = { ...s3.uploadParams }; // Fazer uma cópia para evitar mutação

      const fileName = new Date().getTime().toString() + '_' + req.file.originalname;
      
      if (req.params.id) {
        params.Key = 'Upload/' + req.params.tipoUpload + '/' + req.params.id + '/' + fileName;
      } else {
        params.Key = 'Upload/' + req.params.tipoUpload + '/' + fileName;
      }

      params.Body = req.file.buffer;
      params.ContentType = req.file.mimetype || 'application/octet-stream';
      
      s3Client.upload(params, (err, data) => {
        if (err) {
          console.error('S3 Upload Error:', err);
          reject(new Error('Erro no upload: ' + err.message));
          return;
        }

        resolve({
          success: true,
          url: data.Location,
        });
      });

    } catch (error) {
      console.error('Upload Controller Error:', error);
      reject(new Error('Erro interno do servidor: ' + error.message));
    }
  });
};

exports.deleteFile = (file) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;

  file = file.replace('https://win14tech.s3.amazonaws.com/', '');

  params.Key = file;

  const newParams = {
    Bucket: params.Bucket,
    Key: params.Key,
  };
  s3Client.deleteObject(newParams, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return true;
  });
};
