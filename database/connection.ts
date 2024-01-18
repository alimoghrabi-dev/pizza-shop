import mongoose from "mongoose";

export async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to .env");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to MongoDB");
}
