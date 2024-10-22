import express from 'express';
import { createUser, loginUser, getCurrentUser, updateUser } from '../controllers/userController.js';
import validateToken from '../middleware/validateTokenHandler.js';

const userRoutes = express.Router();

userRoutes.post('/register', createUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/current', validateToken, getCurrentUser);
// userRoutes.post('/logout', logoutUser);
userRoutes.put('/update', validateToken, updateUser);

export default userRoutes;