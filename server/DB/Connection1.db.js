import mongoose from "mongoose";

const connectWithMongoose = async () => {
    const MONGO_URL = process.env.MONGO_URL;
    try {
        const connectionInstance = await mongoose.connect(MONGO_URL);
        console.log("Connection successful! Host:",
            connectionInstance.connection.host
        );
    } catch (error) {
        console.error(error);
    }
};

export { connectWithMongoose };
