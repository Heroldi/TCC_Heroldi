import express from 'express';
const router = express.Router();
import userController from'../controllers/users.js';

router.get('/', userController.user);
router.post('/registrar', userController.cadastrarUser);
router.post('/login', userController.authenticate);
router.post('/verifica', userController.verificaToken);
router.get('/listar', userController.listarUsers);

export default router;