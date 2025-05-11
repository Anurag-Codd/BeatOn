import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb conncted to ${conn.connection.host}`);
  } catch (error) {
    console.error("failde to connect to db", error);
    process.exit(1);
  }
};
