import Amount from '../backend/models/money.model.js';
import Time from '../backend/models/time.model.js';
import mongoose from 'mongoose';
import { AMOUNT_CATEGORIES, TIME_CATEGORIES } from './contants/constants.js';

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

export const getTimeSpendsByDays = async (userId, numberOfDays) => {
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

export const avgTimeSpendsByDays = async (userId, numberOfDays) => {
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

export const getBeforeMonthAmountData = async (userId) => {
   try{
      const currentMonthDays = new Date();
      const beforeMonthDays = new Date();
      currentMonthDays.setDate(currentMonthDays.getDate() - 30);
      beforeMonthDays.setDate(beforeMonthDays.getDate() - 60);

      let data = await Amount.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), expenditureDate: { $gte: beforeMonthDays, $lte: currentMonthDays}}},
         { $group: {_id: '$spentOn', totalAmount: { $sum: '$amount'}}}
      ]);

      if(data.length){
         data = data.map(item => ({spentOn: item._id, totalAmount: item.totalAmount}));
      }

      return data;
   } catch(err){
      return [];
   }
}

export const getBeforeMonthAvgAmountData = async (userId) => {
   try{
      const currentMonthDays = new Date();
      const beforeMonthDays = new Date();
      currentMonthDays.setDate(currentMonthDays.getDate() - 30);
      beforeMonthDays.setDate(beforeMonthDays.getDate() - 60);

      let data = await Amount.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), expenditureDate: { $gte: beforeMonthDays, $lte: currentMonthDays}}},
         { $group: {_id: '$spentOn', avgerageAmount: { $avg: '$amount'}}}
      ]);

      if(data.length){
         data = data.map(item => ({spentOn: item._id, totalAmount: item.totalAmount}));
      }

      return data;
   } catch(err){
      return [];
   }
}

export const getBeforeWeekTimeData = async (userId) => {
   try{
      const currentWeekDays = new Date();
      const beforeWeekDays = new Date();
      currentWeekDays.setDate(currentWeekDays.getDate() - 7);
      beforeWeekDays.setDate(beforeWeekDays.getDate() - 14);

      let data = await Time.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), activityDate: { $gte: beforeWeekDays, $lte: currentWeekDays}}},
         { $group: {_id: '$investedIn', totalTime: { $sum: '$time'}}}
      ]);

      if(data.length){
         data = data.map(item => ({investedIn: item._id, totalTime: item.totalTime}));
      }

      return data;
   } catch(err){
      return [];
   }
}

export const getBeforeWeekAvgTimeData = async (userId) => {
   try{
      const currentWeekDays = new Date();
      const beforeWeekDays = new Date();
      currentWeekDays.setDate(currentWeekDays.getDate() - 7);
      beforeWeekDays.setDate(beforeWeekDays.getDate() - 14);

      let data = await Time.aggregate([
         { $match: { userId: new mongoose.Types.ObjectId(userId), activityDate: { $gte: beforeWeekDays, $lte: currentWeekDays}}},
         { $group: {_id: '$investedIn', averageTime: { $avg: '$time'}}}
      ]);

      if(data.length){
         data = data.map(item => ({investedIn: item._id, averageTime: item.averageTime}));
      }

      return data;
   } catch(err){
      return [];
   }
}

export const getTimeChartData = async (userId, timePeriod, daysToBeSkipped) => {
   try{
      const fromDate = new Date(), toDate = new Date();
      
      if(timePeriod === 'dataFor7Days' || timePeriod === 'dataFor30Days'){
         fromDate.setDate(fromDate.getDate() - (daysToBeSkipped + (timePeriod === 'dataFor7Days' ? 7 : 30)));
         toDate.setDate(toDate.getDate() - daysToBeSkipped);

         const data = await Time.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), activityDate: { $gte: fromDate, $lte: toDate}} }
         ]);

         const categories = Object.values(TIME_CATEGORIES);

         let result = {};
         for(const category of categories) {
            if(!result[category]) {
               result[category] = [];
               // Fill in all dates between fromDate and toDate
               for(let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
                  result[category].push({
                     date: d.toISOString().split('T')[0],
                     time: 0
                  });
               }
            }
         }

         // Then update with actual values from data
         for(const item of data) {
            const date = item.activityDate.toISOString().split('T')[0];
            const categoryArray = result[item.investedIn];
            const existingEntry = categoryArray.find(entry => entry.date === date);
            if(existingEntry) {
               existingEntry.time = item.time;
            }
         }

         return result;
      }
   } catch(err){
      return [];
   }
}

export const getAmountChartData = async (userId, timePeriod, daysToBeSkipped) => {
   try{
      const fromDate = new Date(), toDate = new Date();

      if(timePeriod === 'dataFor7Days' || timePeriod === 'dataFor30Days'){
         fromDate.setDate(fromDate.getDate() - (daysToBeSkipped + (timePeriod === 'dataFor7Days' ? 7 : 30)));
         toDate.setDate(toDate.getDate() - daysToBeSkipped);

         const data = await Amount.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), expenditureDate: { $gte: fromDate, $lte: toDate}} }
         ]);

         const categories = Object.values(AMOUNT_CATEGORIES);

         let result = {};
         for(const category of categories) {
            if(!result[category]) {
               result[category] = [];
               // Fill in all dates between fromDate and toDate
               for(let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
                  result[category].push({
                     date: d.toISOString().split('T')[0],
                     time: 0
                  });
               }
            }
         }

         // Then update with actual values from data
         for(const item of data) {
            const date = item.expenditureDate.toISOString().split('T')[0];
            const categoryArray = result[item.spentOn];
            const existingEntry = categoryArray.find(entry => entry.date === date);
            if(existingEntry) {
               existingEntry.time = item.amount;
            }
         }

         return result;
      }
   } catch(err){
      return [];
   }
}

export const getTimeChartDataByTime = async (userId, timePeriod) => {
   let chartData = [];
   try {

   } catch (err) {
      return chartData;
   }
}