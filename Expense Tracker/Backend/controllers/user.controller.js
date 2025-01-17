import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import UserModel from '../models/user.model.js'
import redisClient from '../utils/redisClient.js'

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

    return res
    .status(201)
    .json(
        new ApiResponse(200, {createdUser, token}, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
        const {email, password} = req.body;
        if(
            [email, password].some(field => field?.trim() === '')
        ) {
            throw new ApiError(400, "All fields are required");
        }

        const user = await UserModel.findOne({email});
        if(!user) {
            throw new  ApiError(409, "Something went wrong");
        }

        const isValidPassword = await user.comparePassword(password);

        if(!isValidPassword) {
            throw new ApiError(401, "Authentication failed.");
        }

        const token = await user.generateAuthToken();
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        });

        return res
        .status(200)
        .json(
            new ApiResponse(200, {user, token}, "User logged in successfully")
        )

})

const getCurrentUser = asyncHandler((req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "User profile retrieved successfully")
    )
}) 

const logoutUser = asyncHandler(async(req, res) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, "Unauthorized with no token");
        }

        redisClient.set(token, "logout", "EX", 3600*24);

        res.clearCookie("token");
        return res
        .status(200)
        .json(
            new ApiResponse(200, null, "User logged out successfully")
        )

    } catch (error) {
        throw new ApiError(500, "Something went wrong with logout")
    }
})

export {
    registerUser, 
    loginUser, 
    getCurrentUser, 
    logoutUser
};