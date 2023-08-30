import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URI) return console.log("MongoDB_URI is not defined");

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}