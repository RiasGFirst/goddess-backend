const minioClient = require('../config/minio');
require('dotenv').config();


const bucketName = process.env.MINIO_BUCKET; // Remplacez par le nom de votre bucket

const uploadFile = async (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    minioClient.putObject(bucketName, fileName, fileBuffer, fileBuffer.length, (err, etag) => {
      if (err) {
        return reject(err);
      }
      const fileUrl = `${minioClient.host}:${minioClient.port}/${bucketName}/${fileName}`;
      resolve(fileUrl);
    });
  });
};

const deleteFile = (objectName) => {
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucketName, objectName, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  uploadFile,
  deleteFile,
};
