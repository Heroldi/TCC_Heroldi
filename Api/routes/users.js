import express from 'express';
const router = express.Router();
import userController from'../controllers/users.js';

router.get('/', userController.user);
router.get('/listar', userController.listarUsers);
router.post('/listarum', userController.listarUmUser);
router.post('/registrar', userController.cadastrarUser);
router.post('/login', userController.authenticate);
router.post('/verifica', userController.verificaToken);
router.delete('/excluir', userController.DeletarUser);
router.put('/editar', userController.EditaUser);

export default router;