import express from 'express';
import authController from './auth.controller';

const authRoutes = express.Router();

authRoutes.post('/login', authController.userLogin);
authRoutes.get('/login', authController.loginWeb);

export default authRoutes;