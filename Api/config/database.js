import mongoose from 'mongoose';

const mongoDB = "";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

export default mongoose;
