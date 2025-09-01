

import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not set. Create a .env file with MONGO_URI.");
    process.exit(1);
  }

  try {
   
    await mongoose.connect(`${uri}/me-playground`,{ autoIndex: true });
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB
