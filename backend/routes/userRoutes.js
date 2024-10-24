import express from 'express';
import { createUser, loginUser, getCurrentUser, updateUser, uploadProfilePicture, getProfilePicture } from '../controllers/userController.js';
import validateToken from '../middleware/validateTokenHandler.js';
import multer from 'multer';


const userRoutes = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

userRoutes.post('/register', createUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/current', validateToken, getCurrentUser);
// userRoutes.post('/logout', logoutUser);
userRoutes.put('/update', validateToken, updateUser);
userRoutes.post('/upload-profile-picture', validateToken, upload.single('profilePicture'), uploadProfilePicture);
userRoutes.get('/profile-picture', validateToken, getProfilePicture);
export default userRoutes;