import UserModel from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'

export const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, 'Unauthorized reqest');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decoded._id);
        if(!user) {
            throw new ApiError(401, 'Invalid token');
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(409, "Something went wrong")
    }
})