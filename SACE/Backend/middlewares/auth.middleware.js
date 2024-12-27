const jwt = require('jsonwebtoken');
const redisClient = require('../services/redis.service');

module.exports.authUser = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new Error('Unauthorized');
        }

        const isBlackListed = redisClient.get(token);
        if (isBlackListed) {
            res.clearCookie('token');
            throw new Error('Unauthorized');
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }

}