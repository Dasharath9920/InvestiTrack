import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = asyncHandler(async (req, res) => {
   try {
      const {username, email, password} = req.body;
      if(!username || !email || !password){
         throw new Error('All fields are required');
      }

      const userExists = await User.findOne({email});
      if(userExists){
         throw new Error('User already exists');
      }

      const encryptedPassword = await bcryptjs.hash(password, 10);

      const newUser = new User({username, email, password: encryptedPassword});
      await newUser.save();
      res.status(201).json({success: true, newUser});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const loginUser = asyncHandler(async(req, res) => {
   try {
      const {email, password} = req.body;
      if(!email || !password){
         throw new Error('All fields are required');
      }

      const userExists = await User.findOne({email});
      if(!userExists){
         throw new Error('User does not exist');
      }

      const isPasswordValid = await bcryptjs.compare(password, userExists.password);
      if(!isPasswordValid){
         throw new Error('Password is incorrect');
      }

      const accessToken = jwt.sign(
         {
            user: {
               username: userExists.username,
               email: userExists.email,
               id: userExists._id,
            }
         },
         process.env.JWT_SECRET,
         {expiresIn: '1d'}
      );

      res.status(200).json({success: true, accessToken, userName: userExists.username, email: userExists.email});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const updateUser = asyncHandler(async(req, res) => {
   try{
      const { email } = req.body;

      const existingUser = await User.findOne({ email });
      if(!existingUser){
         throw new Error('User with this email does not exist');
      }

      res.status(200).json({success: true, user: existingUser});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const getCurrentUser = asyncHandler(async(req, res) => {
   res.json(req.user);
});