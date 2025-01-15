import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import UserModel from '../models/user.model.js'

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} =  req.body;

    if(
        [name, email, password].some(field => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await UserModel.findOne({email});
    if(existedUser) {
        throw new ApiError(409, "User already exists with same email");
    }

    const encryptedPassword = await UserModel.hashPassword(password);

    const createdUser = await UserModel.create({
        name,
        email,
        password: encryptedPassword
    })

    const isUserCreated = await UserModel.findById(createdUser._id);
    if(!isUserCreated) {
        throw new ApiError(500, "Something went wrong while storing the data in DB.")
    }

    const token = await createdUser.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: true
    })

    return res.status(201).json(
        new ApiResponse(200, {createdUser, token}, "User registered successfully")
    )
})


export {registerUser};