import mongoose from "mongoose";


export const connectMongoDB = async () => {
  const mongodbUri = process.env.MONGODB_URI;


    if (!mongodbUri) {
      console.error(`MONGODB_URI is not defined in environment variables. Current value: ${process.env.MONGODB_URI || "undefined"}`);
      return;
    }

  try {
    await mongoose.connect(mongodbUri);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
  
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Unknown error occurred while connecting to MongoDB.");
    }
  }
};
