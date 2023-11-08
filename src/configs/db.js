import mongoose from 'mongoose';
import { config } from './config.js';

export const connectWithDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('connected with database successfully');
  } catch (error) {
    console.log(error);
  }
};
