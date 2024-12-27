const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
    /*validate: {
            validator: function(v) {
                return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(v);
            },
            message: props => `${props.value} is not a valid password.`
        }, */
  },
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
  return token;
}

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model("User", userSchema);
