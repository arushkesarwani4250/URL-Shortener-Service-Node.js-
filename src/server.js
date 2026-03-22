require('dotenv').config();
require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const app = require('./app');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redisClient');

const PORT = process.env.PORT || 8000;

// Connect to Database and Redis, then start server
const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
};

startServer();
