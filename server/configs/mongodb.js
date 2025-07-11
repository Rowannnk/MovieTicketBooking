import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database is connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/movieticket`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
