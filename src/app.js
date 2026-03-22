const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const urlRoutes = require('./routes/url.routes');
const { redirectUrl } = require('./controllers/url.controller');

const app = express();

app.use(cors({
    origin: process.env.CORS_ORGIN || '*'
}));
app.use(express.json());

// Main health route to test server setup
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', urlRoutes); // Mounts /shorten, /info, /search

// Mount Redirect Route at root
app.get('/:shortCode', redirectUrl);

module.exports = app;
