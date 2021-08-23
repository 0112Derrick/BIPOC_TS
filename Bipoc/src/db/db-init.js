import mongoose from 'mongoose';
import { MONGO_URI } from '../authentication/secrets.js';
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
            .then((data) => console.log("Connected to BIPOC DB "))
            .catch((e) => console.log("Failed to connect to db "));
    }
    catch (e) {
        console.log("Failed to connect to db ");
        console.log(e);
    }
}
export default connectDB;
