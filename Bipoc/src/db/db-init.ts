import mongoose from 'mongoose';
import { MONGO_URI } from '../authentication/secrets';


async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Connected to BIPOC DB")
  }
  catch (e) {
    console.log(e);
  }

}

export default connectDB;