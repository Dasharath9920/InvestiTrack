import asyncHandler from 'express-async-handler';
import Time from '../models/time.model.js';

export const getAllTimeData = asyncHandler(async (req, res) => {
   try {
      const timeData = await Time.find({userId: req.user.id}).sort({createdAt: -1});
      res.status(200).json({success: true, timeData});
   } catch (error) {
      res.status(500).json({success: false,message: error.message});
   }
});

export const createTimeData = asyncHandler(async (req, res) => {
   try{
      const {time, investedIn, otherCategory, activityDate} = req.body;
      if(!time || !investedIn || !activityDate){
         throw new Error('All fields are required');
      }
      console.log('activityDate: ',activityDate)
      let data = await Time.find({userId: req.user.id, activityDate: activityDate, investedIn: investedIn});
      console.log('data: ',data)
      if(data.length > 0){
         data[0].time = data[0].time + time; 
         await data[0].save();
      }
      else{
         data = new Time({time, investedIn, userId: req.user.id, otherCategory, activityDate});
         await data.save();
      }
      
      res.status(201).json({success: true, newTimeData: data});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const deleteTimeData = asyncHandler(async (req, res) => {
   try{
      const {entryId, userId} = req.body;
      if(!entryId || !userId){
         throw new Error('Entry ID and User ID are required');
      }

      if(userId.toString() !== req.user.id){
         res.status(401).json({success: false, message: 'User is not authorized'});
      }

      const deletedTimeData = await Time.findByIdAndDelete(entryId);
      res.status(200).json({success: true, deletedTimeData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const updateTimeData = asyncHandler(async (req, res) => {
   try {
      const {entryId, time, investedIn, userId, activityDate} = req.body;
      if(!entryId || !time || !investedIn || !userId || !activityDate){
         throw new Error('All fields are required');
      }

      if(userId.toString() !== req.user.id){
         res.status(401).json({success: false, message: 'User is not authorized'});
      }

      const updatedTimeData = await Time.findByIdAndUpdate(entryId, req.body, {new: true});
      res.status(201).json({success: true, updatedTimeData});
   } catch (err) {
      res.status(500).json({success: false, message: err.message});
   }
});