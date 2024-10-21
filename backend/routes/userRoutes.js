import express from 'express';
import { createUser } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', createUser);
// userRoutes.post('/login', loginUser);
// userRoutes.post('/logout', logoutUser);
// userRoutes.put('/update', updateUser);

export default userRoutes;