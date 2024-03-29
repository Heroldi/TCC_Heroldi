import userModel from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import cry from 'crypto-js';

export default {
	user: function (req, res, next) {
		res.json({ status: "Sucesso", message: "você está aqui" });
	},

	cadastrarUser: function (req, res) {
		let emailFiltro = /^.+@.+\..{2,}$/;
		let senhaFiltro = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
		let nome = req.body.nome;
		let email = req.body.email;
		let senha = req.body.senha;
		let cpf = req.body.cpf;
		let telefone = req.body.telefone;
		let endereco = req.body.endereco;

		if (email === '' && senha === '') {
			res.status(500).json({ message: "Nenhum email nem senha foram inseridos" });
		} else if (email === '') {
			res.status(500).json({ message: "Nenhum email foi inserido" });
		} else if (senha === '') {
			res.status(500).json({ message: "Nenhuma senha foi inserida" });
		} else if (!emailFiltro.test(email) && !senhaFiltro.test(senha)) {
			res.status(500).json({ message: "O email e senha inseridos não atendem aos requisitos" });
		} else if (!emailFiltro.test(email)) {
			res.status(500).json({ message: "O email inserido não atende aos requisitos" });
		} else if (!senhaFiltro.test(senha)) {
			res.status(500).json({ message: "A senha inserida não atende aos requisitos" });
		} else {
			try {
				let nomeCry = cry.AES.encrypt(nome, 'secret key 123').toString();
				let emailCry = cry.AES.encrypt(email, 'secret key 123').toString();
				let cpfCry = cry.AES.encrypt(cpf, 'secret key 123').toString();
				let telefoneCry = cry.AES.encrypt(telefone, 'secret key 123').toString();
				let enderecoCry = cry.AES.encrypt(endereco, 'secret key 123').toString();


				userModel.create({nome: nomeCry, email: emailCry, senha: senha, cpf: cpfCry, telefone: telefoneCry, endereco: enderecoCry }, function () {
					res.status(200).json({ status: "Sucesso", message: "usuário cadastrado com sucesso" });
				});
			} catch {
				res.status(500).json({ message: "Algo deu errado" });
			}
		}


	},

	listarUsers: function (req, res, next) {

		userModel.find((err, userModel) => {

			let result = [];
			userModel.forEach(element => {
				const json = {
					'id':element._id,
					"nome": cry.AES.decrypt(element.nome, 'secret key 123').toString(cry.enc.Utf8),
					"email": cry.AES.decrypt(element.email, 'secret key 123').toString(cry.enc.Utf8),
					"cpf": cry.AES.decrypt(element.cpf, 'secret key 123').toString(cry.enc.Utf8),
					"telefone": cry.AES.decrypt(element.telefone, 'secret key 123').toString(cry.enc.Utf8),
					"endereco": cry.AES.decrypt(element.endereco, 'secret key 123').toString(cry.enc.Utf8)
				}
				result.push(json);
			});

			if (err) {
				next(err)
			} else {
				res.status(200).json(result);
			}
		})
	},

	listarUmUser: function(req,res,next){

		let nome;
		let email;
		let cpf;
		let telefone;
		let endereco;
		const idReq = req.body.id;
		userModel.findOne({_id:idReq},(err,userModel) =>
		{

			nome =  cry.AES.decrypt(userModel.nome, 'secret key 123').toString(cry.enc.Utf8);
			email=  cry.AES.decrypt(userModel.email, 'secret key 123').toString(cry.enc.Utf8);
			cpf =  cry.AES.decrypt(userModel.cpf, 'secret key 123').toString(cry.enc.Utf8);
			telefone =  cry.AES.decrypt(userModel.telefone, 'secret key 123').toString(cry.enc.Utf8);
			endereco =  cry.AES.decrypt(userModel.endereco, 'secret key 123').toString(cry.enc.Utf8);
			if(err){
				next(err);
			}else{
				res.status(200).json({nome, email, cpf, telefone, endereco});
			}
		})
	},

	DeletarUser: function (req, res, next) {
		const idReq = req.body.id;

		userModel.deleteOne({_id:idReq},(err, userModel) => {					
					if(err){
						next(err);
					}else{
						res.status(200).json(userModel);
					}
				})		
	},

	EditaUser: function (req, res, next) {
		let idReq = req.body.id;

		const emailReq = req.body.email;
		const nomeReq = req.body.nome;
		const cpfReq = req.body.cpf;
		const telefoneReq = req.body.telefone;
		const enderecoReq = req.body.endereco;
	
		let nomeCry = cry.AES.encrypt(nomeReq, 'secret key 123').toString();
		let emailCry = cry.AES.encrypt(emailReq, 'secret key 123').toString();
		let cpfCry = cry.AES.encrypt(cpfReq, 'secret key 123').toString();
		let telefoneCry = cry.AES.encrypt(telefoneReq, 'secret key 123').toString();
		let enderecoCry = cry.AES.encrypt(enderecoReq, 'secret key 123').toString();

			userModel.findOneAndUpdate({_id: idReq},{email:emailCry , nome:nomeCry, cpf: cpfCry, telefone: telefoneCry, endereco: enderecoCry},(err, userModel) => {					
				if(err){
					next(err);
				}else{
					res.status(200).json({message: 'sucesso', userModel});
				}
			})		
	},


	verificaToken: function (req, res) {
		let token = req.body.token;
		const secretKey = req.app.get('secretKey');

		if (!secretKey) {
			res.status(401).json({ erro: "Secret key vazia" });
		}
		try {
			if (token) {
				if (jwt.verify(token, secretKey)) {
					res.json({ status: true })
				} else {
					res.json({ status: false })
				}
			} else {
				res.json({ erro: "Token Vazio" });
			}
		} catch (err) {
			res.status(500).json({ erro: "Token Inválido" });
		}
	},

	authenticate: function (req, res) {
		let emailFiltro = /^.+@.+\..{2,}$/;
		let senhaFiltro = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
		let email = req.body.email;
		let senha = req.body.senha;

		if (email === '' && senha === '') {
			res.status(500).json({ message: "Nenhum email nem senha foram inseridos" });
		} else if (email === '') {
			res.status(500).json({ message: "Nenhum email foi inserido" });
		} else if (senha === '') {
			res.status(500).json({ message: "Nenhuma senha foi inserida" });
		} else if (!emailFiltro.test(email) && !senhaFiltro.test(senha)) {
			res.status(500).json({ message: "Email ou senha inválidos. Tente novamente!" });
		} else if (!emailFiltro.test(email)) {
			res.status(500).json({ message: "Email ou senha inválidos. Tente novamente!" });
		} else if (!senhaFiltro.test(senha)) {
			res.status(500).json({ message: "Email ou senha inválidos. Tente novamente!" });
		} else {

			userModel.find((err, userModel) => {
				let emailCry;
				userModel.forEach(element => {
					emailCry = cry.AES.decrypt(element.email, 'secret key 123').toString(cry.enc.Utf8);
					if (emailCry == email) {
						try {
							if (element != null && bcrypt.compareSync(senha, element.senha)) {
								const idReq = element._id.toString();
								console.log(idReq);
								// const token = jwt.sign({ id: element._id }, req.app.get('secretKey'), { expiresIn: '1h' });
								res.status(200).json({ menssagem: "Usuário encontrado", id: idReq});
							} else {
								res.status(400).json({ Messagem: "Email ou senha inválido" });
							}
						} catch {
							console.error("Erro");
						}
					}
				})
			});
		}
	},
}					
