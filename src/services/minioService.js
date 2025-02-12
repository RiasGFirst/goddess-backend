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

const generatePresignedUrl = (objectName) => {
  return new Promise((resolve, reject) => {
    console.log(`Generating presigned URL for bucket: ${bucketName}, object: ${objectName}`);
    minioClient.presignedGetObject(bucketName, objectName, 24 * 60 * 60, (err, url) => {
      if (err) {
        console.error(`Error generating presigned URL: ${err}`);
        return reject(err);
      }
      console.log(`Presigned URL generated: ${url}`);
      resolve(url);
    });
  });
};

module.exports = {
  uploadFile,
  deleteFile,
  generatePresignedUrl,
};
