import Amount from '../backend/models/money.model.js';
import Time from '../backend/models/time.model.js';
import mongoose from 'mongoose';

export const getAmountSpendsByDays = async (userId, numberOfDays) => {
   try{
      const days = new Date();
      days.setDate(days.getDate() - numberOfDays);
      let data = await Amount.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), expenditureDate: { $gte: days}} },
         { $group: { _id: '$spentOn', totalAmount: { $sum: '$amount'}}},
      ]);

      if(data.length){
         data = data.map(item => ({spentOn: item._id, totalAmount: item.totalAmount}));
      }
      return data;
   } catch (err) {
      return [];
   }
}

export const avgAmountSpendsByTime = async (userId, numberOfDays) => {
   try{
      const days = new Date();
      days.setDate(days.getDate() - numberOfDays);
      let data = await Amount.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), expenditureDate: { $gte: days}}},
         { $group: {_id: '$spentOn', averageAmount: { $avg: '$amount'}}}
      ]);

      if(data.length){
         data = data.map(item => ({spentOn: item._id, averageAmount: item.averageAmount}));
      }
      return data;
   } catch (err) {
      return [];
   }
}

export const getTimeSpendsByTimeDays = async (userId, numberOfDays) => {
   try {
      const days = new Date();
      days.setDate(days.getDate() - numberOfDays);

      let data = await Time.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), activityDate: { $gte: days}}},
         { $group: {_id: '$investedIn', totalTime: { $sum: '$time'}}}
      ]);

      if(data.length){
         data = data.map(item => ({investedIn: item._id, totalTime: item.totalTime}));
      }

      return data;
   } catch (err) {
      return [];
   }
}

export const avgTimeSpendsByTimeDays = async (userId, numberOfDays) => {
   try {
      const days = new Date();
      days.setDate(days.getDate() - numberOfDays);

      let data = await Time.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), activityDate: { $gte: days}}},
         { $group: {_id: '$investedIn', averageTime: { $avg: '$time'}}}
      ]);

      if(data.length){
         data = data.map(item => ({investedIn: item._id, averageTime: item.averageTime}));
      }

      return data;
   } catch (err) {
      return [];
   }
}