import asyncHandler from 'express-async-handler';
import Amount from '../models/money.model.js';

export const getAllMoneyData = asyncHandler(async (req, res) => {
   try{
      const amountData = await Amount.find();
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
      const {id} = req.params;
      if(!id){
         throw new Error('Id is required');
      }

      const deletedMoneyData = await Amount.findByIdAndDelete(id);
      res.status(200).json({success: true, deletedMoneyData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});

export const updateMoneyData = asyncHandler(async (req, res) => {
   try{
      const {id} = req.params;
      if(!id){
         throw new Error('Id is required');
      }

      const {money, spentOn} = req.body;
      if(!money || !spentOn){
         throw new Error('All fields are required');
      }

      const updatedMoneyData = await Amount.findByIdAndUpdate(id, {money, spentOn}, {new: true});
      res.status(200).json({success: true, updatedMoneyData});
   } catch(err) {
      res.status(500).json({success: false, message: err.message});
   }
});