import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
}, {timestamps: true});

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function (password) {
    const user = await this.model('User').findById(this._id).select('password');
    return await bcrypt.compare(password, user.password);
}

userSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({_id: this._id, email: this.email}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
    return token;
}

const User = mongoose.model("User", userSchema);

export default User;