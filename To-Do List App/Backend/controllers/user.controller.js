const userModel = require('../models/user.model');
const {validationResult} = require('express-validator')
const userService = require('../Services/user.service');
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');

const otpStore = new Map();

module.exports.registerUser = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        fullname,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken();
    res.cookie('token', token);

    res.status(201).json({token, user})
}

module.exports.loginUser = async (  req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user) {
        return res.status(401).json({error: 'Invalid email or password'})
    }

    const isValidPassword = await user.comparePassword(password, user.password);
    if(!isValidPassword) {
        return res.status(401).json({error: 'Invalid email or password'})
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({token, user});
}

module.exports.sendOtp = async (req, res) => {
    const {email} = req.body;


    if(!email) {
        return res.status(400).json({error: 'Email is required'})
    }

    const otp = otpGenerator.generate(4, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });

    otpStore.set(email, otp);
    console.log(otpStore)
    setTimeout(() => otpStore.delete(email), 5 * 60 * 1000);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your To-Do App OTP',
        text: `Your otp is ${otp}. It will expire in 5 minutes.`
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: 'OTP sent successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Failed to send OTP'})
    }

}

module.exports.verifyOtp = async (req, res) => {
    const {email, OTP} = req.body;

    const storedOtp = otpStore.get(email);
    if(!storedOtp) {
        return res.status(400).json({error: 'Something went wrong'})
    }

    if(storedOtp === OTP) {
        otpStore.delete(email);
        res.status(200).json({message: 'OTP verified successfully'});
    } else {
        return res.status(400).json({error: 'Invalid OTP'})
    }

}

module.exports.getProfile = (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}