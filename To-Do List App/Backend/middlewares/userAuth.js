const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const blackListTokenModel = require('../models/blackListToken.model')

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookie?.token || req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized with no token' });
        }

        const isBlackListed = await blackListTokenModel.findOne({token})
        if(isBlackListed){
            return res.status(401).json({ message: 'Unauthorized with blacklisted' });   
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
        console.log(error.message)
        return res.status(401).json({message: 'Unauthorized to auth user'})
    }
}