const mongoose = require('mongoose')

const connectToDb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectToDb;