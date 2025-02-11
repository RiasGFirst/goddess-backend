const Minio = require('minio');
require('dotenv').config();

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST, // Remplacez par l'adresse de votre instance MinIO
    port: process.env.MINIO_PORT,
    useSSL: process.env.MINIO_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS, // Remplacez par votre clé d'accès
    secretKey: process.env.MINIO_SECRET, // Remplacez par votre clé secrète
});

module.exports = minioClient;