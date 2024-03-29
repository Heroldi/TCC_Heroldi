import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	nome: {
		type: String,
		required: true,
		trim: true,
		maxlength: 150
	},
	email: {
		type: String,
		required: true,
		trim: true, 
		unique: true,
		minlength: 5
	},
	senha: {
		type: String,
		trim: true,
		required: true,
		minlength: 6
	},
	cpf: {
		type: String,
		trim: true,
		required: true,
		minlength: 14,
		unique: true
	},
	telefone: {
		type: String,
		trim: true,
		required: true,
		minlength: 11,
		unique: true
	},
	endereco: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next){
this.senha = bcrypt.hashSync(this.senha, saltRounds);
next();
});

export default mongoose.model('User', UserSchema);