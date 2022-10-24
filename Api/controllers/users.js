import userModel from'../models/users.js';
import bcrypt from'bcrypt';	
import jwt from'jsonwebtoken';	
import express from 'express';

export default {
	user: function(req, res, next) {
				  	res.json({status: "Sucesso", message: "você está aqui"});
	},

	cadastrarUser: function(req, res) {
		let emailFiltro = /^.+@.+\..{2,}$/;
        let senhaFiltro = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
		let email = req.body.email;
		let senha = req.body.senha;

		if(email ==='' && senha === ''){
			res.status(500).json({message: "Nenhum email nem senha foram inseridos"});
		  }else if(email === ''){ 
			res.status(500).json({message: "Nenhum email foi inserido"});
		  }else if(senha === ''){
			res.status(500).json({message: "Nenhuma senha foi inserida"}); 
		  }else if (!emailFiltro.test(email) && !senhaFiltro.test(senha)) {
			res.status(500).json({message: "O email e senha inseridos não atendem aos requisitos"}); 
		  }else if(!emailFiltro.test(email)){
			res.status(500).json({message: "O email inserido não atende aos requisitos"});  
		  }else if(!senhaFiltro.test(senha)){
			res.status(500).json({message: "A senha inserida não atende aos requisitos"});
		  }else{					
				try{
					userModel.create({ email: email, senha: senha }, function () {
						res.status(200).json({status: "Sucesso", message: "usuário cadastrado com sucesso"});	
		  			});
				}catch{
					res.status(500).json({message: "Algo deu errado"});
				}
		  }			
			

	},

	listarUsers:  function(req, res, next) {
		userModel.find((err, userModel) => {      
			if(err){
			  next(err)
			}else{
				res.status(200).json(userModel);
			}
		})
	  },
	  

	verificaToken: function(req, res){
		let token = req.body.token;
		const secretKey = req.app.get('secretKey');

		if(!secretKey){
			res.status(401).json({erro: "Secret key vazia"});
		}
		try{
			if(token){
				if(jwt.verify(token, secretKey)){
					res.json({status: true})
				}else{
					res.json({status: false})
				}
			}else{
				res.json({erro: "Token Vazio"});
			}
		}catch(err){
			res.status(500).json({erro: "Token Inválido"});
		}
	},

	authenticate: function(req, res) {
		let emailFiltro = /^.+@.+\..{2,}$/;
        let senhaFiltro = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
		let email = req.body.email;
		let senha = req.body.senha;

		if(email ==='' && senha === ''){
			res.status(500).json({message: "Nenhum email nem senha foram inseridos"});
		  }else if(email === ''){ 
			res.status(500).json({message: "Nenhum email foi inserido"});
		  }else if(senha === ''){
			res.status(500).json({message: "Nenhuma senha foi inserida"}); 
		  }else if (!emailFiltro.test(email) && !senhaFiltro.test(senha)) {
			res.status(500).json({message: "Usuário ou senha inválidos. Tente novamente!"}); 
		  }else if(!emailFiltro.test(email)){
			res.status(500).json({message: "Usuário ou senha inválidos. Tente novamente!"});  
		  }else if(!senhaFiltro.test(senha)){
			res.status(500).json({message: "Usuário ou senha inválidos. Tente novamente!"});
		  }else{

		userModel.findOne({email:req.body.email}, function(err, userInfo){
					try{
						if(userInfo != null && bcrypt.compareSync(senha, userInfo.senha)) {
							const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 
							res.status(200).json({menssagem:"Sucesso", message: "Usuário encontrado", data:{user: userInfo, token:token}});	
						}else{
							   res.status(500).json({Message: "Email ou senha inválido", data:null});
						   	 }
					}catch {
						console.error("Erro");			
					}
				});
			}
	},

}					
