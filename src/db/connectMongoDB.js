import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Successfully connect database');
  } catch (error) {
    console.log('Failed connect database', error.mongoose);
    throw error;
  }
};

export { connectMongoDB };
