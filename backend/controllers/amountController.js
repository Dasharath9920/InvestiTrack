import asyncHandler from 'express-async-handler';
import Amount from '../models/money.model.js';

export const getAllMoneyData = asyncHandler(async (req, res) => {
   try{
      const amountData = await Amount.find({userId: req.user.id});
      res.status(200).json({success: true, amountData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const createMoneyData = asyncHandler(async (req, res) => {
   try{
      const {amount, spentOn} = req.body;
      if(!amount || !spentOn){
         throw new Error('All fields are required');
      }

      const newMoneyData = new Amount({amount, spentOn, userId: req.user.id});
      await newMoneyData.save();
      res.status(201).json({success: true, newMoneyData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const deleteMoneyData = asyncHandler(async (req, res) => {
   try{
      const {entryId, userId} = req.body;
      if(!entryId || !userId){
         throw new Error('Entry ID and User ID are required');
      }

      if(userId.toString() !== req.user.id){
         res.status(401).json({success: false, message: 'User is not authorized'});
      }

      const deletedMoneyData = await Amount.findByIdAndDelete(entryId);
      res.status(200).json({success: true, deletedMoneyData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const updateMoneyData = asyncHandler(async (req, res) => {
   try{
      const {entryId, amount, spentOn, userId} = req.body;
      if(!entryId || !amount || !spentOn || !userId){
         throw new Error('All fields are required');
      }

      if(userId.toString() !== req.user.id){
         res.status(401).json({success: false, message: 'User is not authorized'});
      }

      const updatedMoneyData = await Amount.findByIdAndUpdate(entryId, req.body, {new: true});
      res.status(200).json({success: true, updatedMoneyData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});