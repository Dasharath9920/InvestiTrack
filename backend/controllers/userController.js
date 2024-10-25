import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

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

      const apiKey = process.env.MAILBOXLAYER_KEY;

      const response = await axios.get(`http://apilayer.net/api/check`, {
         params: {
            access_key: apiKey,
            email: email,
            smtp: 1,
            format: 1
         }
      });

      const data = response.data;

      if (!data.format_valid || !data.smtp_check) {
         throw new Error('Invalid email or email address is undeliverable.');
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
   try{
      const user = await User.findById(req.user.id);
      if(!user){
         throw new Error('User not found');
      }
      const userData = {
         userId: user._id,
         username: user.username,
         email: user.email,
         profilePicture: user.profilePicture?.data ? `data:${user.profilePicture.contentType};base64,${user.profilePicture.data.toString('base64')}` : null,
         accountCreatedOn: user.createdAt
      }
      res.status(200).json({success: true, userData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const uploadProfilePicture = asyncHandler(async(req, res) => {
   try{
      const user = await User.findById(req.user.id);
      if(!user){
         throw new Error('User not found');
      }

      user.profilePicture = {
         data: req.file.buffer,
         contentType: req.file.mimetype
      }

      await user.save();
      res.status(200).json({success: true, message: 'Profile picture uploaded successfully'});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});