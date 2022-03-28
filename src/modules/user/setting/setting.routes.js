import express from 'express';
import userController from '../user.controller';

const userRoutes = express.Router();

userRoutes.get('/dashboard', userController.dashboard);

export default userRoutes;