import mongoose from 'mongoose';

const mongoDB = "mongodb+srv://Heroldi:123@dbprojetofinal.lnxnr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

export default mongoose;
