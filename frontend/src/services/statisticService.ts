import { ACCESS_TOKEN, AMOUNT_CATEGORIES, SAFE_LIMITS_WEEKLY, TIME_CATEGORIES, TIME_PERIODS } from '../constants/constants';

export const getStatistics = async () => {
   try{
      const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
      const response = await fetch('http://localhost:3000/api/statistics',{
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      });
      const result = await response.json();
      if(result.success){
         Object.values(AMOUNT_CATEGORIES).forEach((category) => {
            if(!result.statistics.lastMonthAmountData.find((amount: any) => amount.spentOn === category)){
              result.statistics.lastMonthAmountData.push({spentOn: category, totalAmount: 0});
            }
            if(!result.statistics.beforeMonthAmountData.find((amount: any) => amount.spentOn === category)){
              result.statistics.beforeMonthAmountData.push({spentOn: category, totalAmount: 0});
            }
            if(!result.statistics.lastMonthAvgAmountData.find((amount: any) => amount.spentOn === category)){
              result.statistics.lastMonthAvgAmountData.push({spentOn: category, averageAmount: 0});
            }
            if(!result.statistics.beforeMonthAvgAmountData.find((amount: any) => amount.spentOn === category)){
              result.statistics.beforeMonthAvgAmountData.push({spentOn: category, averageAmount: 0});
            }
          });
          Object.values(TIME_CATEGORIES).forEach((category) => {
            if(!result.statistics.lastWeekTimeData.find((time: any) => time.investedIn === category)){
              result.statistics.lastWeekTimeData.push({investedIn: category, totalTime: 0});
            }
            if(!result.statistics.beforeWeekTimeData.find((time: any) => time.investedIn === category)){
              result.statistics.beforeWeekTimeData.push({investedIn: category, totalTime: 0});
            }
            if(!result.statistics.lastWeekAvgTimeData.find((time: any) => time.investedIn === category)){
              result.statistics.lastWeekAvgTimeData.push({investedIn: category, averageTime: 0});
            }
            if(!result.statistics.beforeWeekAvgTimeData.find((time: any) => time.investedIn === category)){
              result.statistics.beforeWeekAvgTimeData.push({investedIn: category, averageTime: 0});
            }
          });

         result.statistics.lastMonthAmountData = result.statistics.lastMonthAmountData.sort((a: any, b: any) => b.totalAmount - a.totalAmount);
         result.statistics.lastWeekTimeData = result.statistics.lastWeekTimeData.sort((a: any, b: any) => b.totalTime - a.totalTime);
      }
      return result;
   } catch(err: any) {
      return {success: false, message: err.message};
   }
}

export const addMissingCategoriesToTimeData = (timeData: any) => {
   Object.keys(timeData).map((key: string) => {
      let data = timeData[key];
      Object.values(TIME_CATEGORIES).forEach((category) => {
         if(!data.find((time: any) => time.investedIn === category)){
           data.push({investedIn: category, totalTime: 0});
         }
       });
      timeData[key] = data;
   });
   return timeData;
}

export const addMissingCategoriesToAmountData = (amountData: any) => {
   Object.keys(amountData).map((key: string) => {
      let data = amountData[key];
      Object.values(AMOUNT_CATEGORIES).forEach((category) => {
         if(!data.find((amount: any) => amount.spentOn === category)){
           data.push({spentOn: category, totalAmount: 0});
         }
       });
   });
   return amountData;
}

export const getTimeStatistics = async () => {
   try {
      const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
   const response = await fetch('http://localhost:3000/api/statistics/time', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
   });
      const result = await response.json();
      if(result.success){

         // Add missing categories to the time data
         result.data = addMissingCategoriesToTimeData(result.data);

         // Sort the data by totalTime in descending order
         Object.keys(result.data).forEach((key: string) => {
            result.data[key] = result.data[key].sort((a: any, b: any) => b.totalTime - a.totalTime);
         })
      }
      return result;
   } catch(err: any) {
      return {success: false, message: err.message};
   }
}

export const getAmountStatistics = async () => {
   try {
      const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
      const response = await fetch('http://localhost:3000/api/statistics/amount', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      });
      const result = await response.json();
      if(result.success){

         // Add missing categories to the amount data
         result.data = addMissingCategoriesToAmountData(result.data);

         // Sort the data by totalAmount in descending order
         Object.keys(result.data).forEach((key: string) => {
            result.data[key] = result.data[key].sort((a: any, b: any) => b.totalAmount - a.totalAmount);
         })
      }
      return result;
   } catch(err: any) {
      return {success: false, message: err.message};
   }
}

export const getSafeLimits = () => {
   let safeLimits: any = {
      time: {},
      amount: {}
   };

   TIME_PERIODS.forEach((period: any) => {
      safeLimits.time[period.id] = {...SAFE_LIMITS_WEEKLY.TIME};
      safeLimits.amount[period.id] = {...SAFE_LIMITS_WEEKLY.AMOUNT};
      Object.keys(SAFE_LIMITS_WEEKLY.TIME).forEach((key: string) => {
         safeLimits.time[period.id][key] = Math.ceil(safeLimits.time[period.id][key] * Math.ceil(period.value / 7));
      });
      Object.keys(SAFE_LIMITS_WEEKLY.AMOUNT).forEach((key: string) => {
         safeLimits.amount[period.id][key] = Math.ceil(safeLimits.amount[period.id][key] * Math.ceil(period.value / 7));
      });
   });

   return safeLimits;
}

export const getChartData = async () => {
   try {
      const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '{}');
      const response = await fetch('http://localhost:3000/api/statistics/chart', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      });
      const result = await response.json();
      if(result.success){
         result.chartData.time = addMissingCategoriesToTimeData(result.chartData.time);
         result.chartData.amount = addMissingCategoriesToAmountData(result.chartData.amount);
      }
      return {success: true, chartData: result.chartData};
   } catch(err: any) {
      return {success: false, message: err.message};
   }
}