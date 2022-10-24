import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import users from './routes/users.js';
import bodyParser from 'body-parser';
import mongoose from './config/database.js';
import jwt from 'jsonwebtoken';
const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

app.use(cors());
app.use(express.json())

// connection to mongodb
mongoose.connection.on('Erro', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
res.json({"Bem vindo" : "API Projeto final"});
});

// public route
app.use('/users', users);


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"erro", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}


app.use(function(req, res, next) {
	let err = new Error('Não encontrado');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Não encontrado"});
  else	
    res.status(500).json({message: "Algo deu errado"});

});

app.listen(8080, function(){
	console.log('O server está ouvindo na porta 8080');
});
