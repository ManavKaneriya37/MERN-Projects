const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized with no token' });
        }

        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await userModel.findById(decode._id);

            req.user = user;

            return next();

        } catch (error) {
            return res.status(401).json({message: 'Unauthorized to get user'});
        }
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized to auth user'})
    }
}