import asyncHandler from 'express-async-handler';
import Time from '../models/time.model.js';

export const getAllTimeData = asyncHandler(async (req, res) => {
   try {
      const timeData = await Time.find();
      res.status(200).json({success: true, timeData});
   } catch (error) {
      res.status(500).json({success: false,message: error.message});
   }
});

export const createTimeData = asyncHandler(async (req, res) => {
   try{
      const {time, investedIn} = req.body;
      if(!time || !investedIn){
         throw new Error('All fields are required');
      }

      const newTimeData = await Time.create({time, investedIn});
      res.status(201).json({success: true, newTimeData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const deleteTimeData = asyncHandler(async (req, res) => {
   try{
      const {id} = req.params;
      if(!id){
         throw new Error('Id is required');
      }

      const deletedTimeData = await Time.findByIdAndDelete(id);
      res.status(200).json({success: true, deletedTimeData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const updateTimeData = asyncHandler(async (req, res) => {
   try {
      const {id} = req.params;
      if(!id){
         throw new Error('Id is required');
      }
      const timeData = await Time.findById(id);
      if(!timeData){
         throw new Error('Time data not found');
      }
      const {time, investedIn} = req.body;
      if(!time || !investedIn){
         throw new Error('All fields are required');
      }
      const updatedTimeData = await Time.findByIdAndUpdate(id, req.body, {new: true});
      res.status(201).json({success: true, updatedTimeData});
   } catch (err) {
      res.status(500).json({success: false, message: err.message});
   }
});