import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

export const createUser = asyncHandler(async (req, res) => {
   try {
      const {username, email, password} = req.body;
      if(!username || !email || !password){
         throw new Error('All fields are required');
      }

      const newUser = new User({username, email, password});
      await newUser.save();
      res.status(201).json({success: true, newUser});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});