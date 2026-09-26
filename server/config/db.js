import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devsprint';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning (Local DB running?): ${error.message}`);
  }
};
