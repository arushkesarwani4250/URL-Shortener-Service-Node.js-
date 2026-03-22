const Url = require('../models/Url');
const { getRedisClient } = require('../config/redisClient');
const { nanoid } = require('nanoid');

exports.shortenUrl = async (req, res) => {
    try {
        const { long_url, name, description, expiry } = req.body;
        
        if (!long_url || !name) {
            return res.status(400).json({ success: false, error: 'Please provide long_url and name' });
        }

        const short_code = nanoid(8); // Generates an 8-character string

        const newUrl = await Url.create({
            long_url,
            short_code,
            name,
            description,
            expiry,
            user_id: req.user._id
        });

        // Cache in Redis (optional: add expiry)
        const redisClient = getRedisClient();
        await redisClient.set(`url:${short_code}`, long_url);

        const short_url = `${req.protocol}://${req.get('host')}/${short_code}`;

        res.status(201).json({
            success: true,
            short_url,
            data: newUrl
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getUrls = async (req, res) => {
    try {
        const { name, page = 1, page_size = 20 } = req.query;
        
        const query = { user_id: req.user._id };
        if (name) {
            query.name = name;
        }

        const limit = parseInt(page_size, 10);
        const skip = (parseInt(page, 10) - 1) * limit;

        const urls = await Url.find(query).skip(skip).limit(limit);
        const total = await Url.countDocuments(query);

        const clickAggregation = await Url.aggregate([
            { $match: { user_id: req.user._id } },
            { $group: { _id: null, totalClicks: { $sum: "$clicks" } } }
        ]);
        const total_clicks = clickAggregation.length > 0 ? clickAggregation[0].totalClicks : 0;

        res.status(200).json({
            success: true,
            count: urls.length,
            total,
            total_clicks,
            data: urls
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.searchUrls = async (req, res) => {
    try {
        const { q, page = 1, page_size = 20 } = req.query;
        
        const query = { user_id: req.user._id };
        
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];
        }

        const limit = parseInt(page_size, 10);
        const skip = (parseInt(page, 10) - 1) * limit;

        const urls = await Url.find(query).skip(skip).limit(limit);
        const total = await Url.countDocuments(query);

        res.status(200).json({
            success: true,
            count: urls.length,
            total,
            data: urls
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const redisClient = getRedisClient();
        
        // Check cache first
        const cacheKey = `url:${shortCode}`;
        const cachedUrl = await redisClient.get(cacheKey);

        if (cachedUrl) {
            Url.updateOne({ short_code: shortCode }, { $inc: { clicks: 1 } }).exec();
            return res.redirect(cachedUrl);
        }

        // Cache miss -> check MongoDB
        const urlEntry = await Url.findOne({ short_code: shortCode });

        if (!urlEntry) {
            return res.status(404).json({ success: false, error: 'URL not found' });
        }

        // Increment clicks
        urlEntry.clicks++;
        await urlEntry.save();

        // Update cache
        await redisClient.set(cacheKey, urlEntry.long_url);

        return res.redirect(urlEntry.long_url);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
