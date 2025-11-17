import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://mongo:27017/courseproject');
    console.log(`Підлючено до бази даних: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Помилка: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
