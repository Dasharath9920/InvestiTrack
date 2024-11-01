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

export const getTimeChartData = async (userId) => {
   let chartData = {
      dataFor7Days: {},
      dataFor30Days: {},
      dataFor6Months: {},
      dataFor12Months: {},
      dataFor5Years: {}
   }
   try {
      const periods = [
         { key: 'dataFor7Days', days: 7 },
         { key: 'dataFor30Days', days: 30 },
         { key: 'dataFor6Months', days: 180 },
         { key: 'dataFor12Months', days: 365 },
         { key: 'dataFor5Years', days: 1825 }
      ];

      for(const period of periods){
         const days = new Date();
         days.setDate(days.getDate() - period.days);
         const data = await Time.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), activityDate: { $gte: days}}},
            { $group: {_id: '$investedIn', totalTime: { $sum: '$time'}}}
         ]);

         if(data.length){
            chartData[period.key] = data.map(item => ({investedIn: item._id, totalTime: item.totalTime}));
            chartData[period.key].sort((a, b) => a.investedIn.localeCompare(b.investedIn));
         }
      }

      return chartData;
   } catch (err) {
      return chartData;
   }
}

export const getAmountChartData = async (userId) => {
   let chartData = {
      dataFor7Days: {},
      dataFor30Days: {},
      dataFor6Months: {},
      dataFor12Months: {},
      dataFor5Years: {}
   }
   try {
      const periods = [
         { key: 'dataFor7Days', days: 7 },
         { key: 'dataFor30Days', days: 30 },
         { key: 'dataFor6Months', days: 180 },
         { key: 'dataFor12Months', days: 365 },
         { key: 'dataFor5Years', days: 1825 }
      ];

      for(const period of periods){
         const days = new Date();
         days.setDate(days.getDate() - period.days);
         const data = await Amount.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), expenditureDate: { $gte: days}}},
            { $group: {_id: '$spentOn', totalAmount: { $sum: '$amount'}}}
         ]);

         if(data.length){
            chartData[period.key] = data.map(item => ({spentOn: item._id, totalAmount: item.totalAmount}));
            chartData[period.key].sort((a, b) => a.spentOn.localeCompare(b.spentOn));
         }
      }

      return chartData;
   } catch (err) {
      return chartData;
   }
}