const userModel = require('../models/user.model');
const { validationResult } = require('express-validator')
const userServices = require('../services/user.service');
const redisClient = require('../services/redis.service')

module.exports.signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg});
        } 

        const {email, password} = req.body;

        const hashedPassword = await userModel.hashPassword(password);
      
        const user = await userServices.createUser({
            email,
            password: hashedPassword
        })

        const token = await user.generateAuthToken();
        res.cookie('token', token);

        res.status(201).json({user, token});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.signIn = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg});
        } 

        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const token = await user.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({user, token});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.signOut = async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);

        res.clearCookie('token');
        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}