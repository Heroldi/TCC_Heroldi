import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true, 
		lowercase: true,
		unique: true,
		minlength: 5
	},
	senha: {
		type: String,
		trim: true,
		required: true,
		minlength: 6
	}
});

UserSchema.pre('save', function(next){
this.senha = bcrypt.hashSync(this.senha, saltRounds);
next();
});

export default mongoose.model('User', UserSchema);