const userModel = require('../models/user.model');

module.exports.createUser = async ({email, password}) => {
    try {
        if(!email || !password) {
            throw new Error('Email and password are required');
        }

        const isAlreadyExistingUser = await userModel.findOne({email});
        if(isAlreadyExistingUser) {
            throw new Error('User already exists');
        }
        
        const user = await userModel.create({email, password});

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}