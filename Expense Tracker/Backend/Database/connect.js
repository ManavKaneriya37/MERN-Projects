import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log(error);
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDb;