const redis = require('redis');
const { generatePresignedUrl } = require('../services/minioService');
require('dotenv').config();

console.log('Redis Host:', process.env.REDIS_HOST);
console.log('Redis Port:', process.env.REDIS_PORT);

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Successfully connected to Redis'));

// Vérifiez si le client est connecté
redisClient.connect().catch(console.error);

const getCachedPresignedUrl = async (cacheKey) => {
  try {
    const cachedUrl = await redisClient.get(cacheKey);
    console.log(`Cached URL for ${cacheKey}:`, cachedUrl);
    return cachedUrl;
  } catch (err) {
    console.error(`Error getting cached URL for ${cacheKey}:`, err);
    throw err;
  }
};

const cachePresignedUrl = async (cacheKey, url, expiration) => {
  try {
    await redisClient.setEx(cacheKey, expiration, url);
    console.log(`Cached URL for ${cacheKey} with expiration ${expiration} seconds.`);
  } catch (err) {
    console.error(`Error caching URL for ${cacheKey}:`, err);
    throw err;
  }
};

const getOrCreatePresignedUrl = async (objectName, cacheKey, expiration = 24 * 60 * 60) => {
  try {
    let url = await getCachedPresignedUrl(cacheKey);

    if (!url) {
      console.log(`No cached URL found for ${cacheKey}. Generating new presigned URL.`);
      url = await generatePresignedUrl(objectName);
      console.log(`Generated new presigned URL for ${objectName}:`, url);
      await cachePresignedUrl(cacheKey, url, expiration);
    } else {
      console.log(`Using cached URL for ${cacheKey}:`, url);
    }

    return url;
  } catch (err) {
    console.error('Error getting or creating presigned URL:', err);
    throw err;
  }
};

module.exports = {
  getOrCreatePresignedUrl
};
