const userModel = require('../models/user.model')

module.exports.createUser = async ({
    fullname,
    email,
    password
}) => {
    if(!fullname, !email, !password) {
        throw new Error('Please fill in all fields' );
    }

    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist) {
        throw new Error('The user is already exist');
    }

    const user = await userModel.create({
        fullname,
        email,
        password
    })

    return user;
}