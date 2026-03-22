const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
    try {
        redisClient = createClient({
            url: process.env.REDIS_URL
        });

        redisClient.on('error', (err) => console.log('Redis Client Error', err));

        await redisClient.connect();
        console.log('Redis Connected Successfully');
    } catch (error) {
        console.error(`Redis connection Error: ${error.message}`);
    }
    return redisClient;
};

const getRedisClient = () => {
    if (!redisClient) {
        throw new Error('Redis client not initialized!');
    }
    return redisClient;
};

module.exports = { connectRedis, getRedisClient };
