import { PRODUCTIVE_TIME_CATEGORIES, TIME_CATEGORIES } from './constants/constants';


export const formatTime = (minutes: number): string => {
   if (minutes < 60) {
     return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
   } else if (minutes < 1440) {
     const hours = Math.floor(minutes / 60);
     return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
   } else {
     const days = Math.floor(minutes / 1440);
     return `${days} ${days === 1 ? 'day' : 'days'}`;
   }
 };

 export const getTimeDescription = (minutes: number): string => {
   if (minutes < 60) {
     return `${minutes} minutes`;
   } else if (minutes < 1440) {
     return `${(minutes / 60).toFixed(1)} hours`;
   } else {
     return `${(minutes / 1440).toFixed(1)} days`;
   }
 };

 export const getStatisticalData = (data: any, userCreatedOn: string) => {
   const daysSinceAccountCreation = Math.ceil((new Date().getTime() - new Date(userCreatedOn).getTime()) / (1000 * 3600 * 24)) + 1;

  const lastMonthAmount = data.lastMonthAmountData.reduce((totalAmount: number, curr: any) => totalAmount + curr.totalAmount, 0);
  const beforeMonthAmount = data.beforeMonthAmountData.reduce((totalAmount: number, curr: any) => totalAmount + curr.totalAmount, 0);

  const amountDifferencePercentage = beforeMonthAmount ? (lastMonthAmount - beforeMonthAmount)/beforeMonthAmount*100 : 100;

  const maxAvgAmount = data.lastMonthAvgAmountData.reduce((maxAmount: { amount: number, spentOn: string}, curr: any) => maxAmount.amount > curr.averageAmount ? maxAmount : {amount: curr.averageAmount, spentOn: curr.spentOn}, {amount: 0, spentOn: ''});
  const maxAvgAmountBeforeMonth = data.beforeMonthAvgAmountData.reduce((maxAmount: { amount: number, spentOn: string}, curr: any) => maxAmount.amount > curr.averageAmount ? maxAmount : {amount: curr.averageAmount, spentOn: curr.spentOn}, {amount: 0, spentOn: ''});

  const averageAmountDifferencePercentage = maxAvgAmountBeforeMonth.amount ? (maxAvgAmount.amount - maxAvgAmountBeforeMonth.amount)/maxAvgAmountBeforeMonth.amount*100 : 100;

  const entertainmentTime = data.lastWeekAvgTimeData.find((curr: any) => curr.investedIn === TIME_CATEGORIES.ENTERTAINMENT)?.averageTime || 0;
  const beforeWeekEntertainmentTime = data.beforeWeekAvgTimeData.find((curr: any) => curr.investedIn === TIME_CATEGORIES.ENTERTAINMENT)?.averageTime || 0;

  const entertainmentTimeDifferencePercentage = beforeWeekEntertainmentTime ? (entertainmentTime - beforeWeekEntertainmentTime)/beforeWeekEntertainmentTime*100 : 100;

  const productiveTime = data.lastWeekAvgTimeData.reduce((avgTime: number, data: any) => PRODUCTIVE_TIME_CATEGORIES.includes(data.investedIn) ? avgTime + data.averageTime : avgTime, 0);
  const beforeWeekProductiveTime = data.beforeWeekAvgTimeData.reduce((avgTime: number, data: any) => PRODUCTIVE_TIME_CATEGORIES.includes(data.investedIn) ? avgTime + data.averageTime : avgTime, 0);

  const productiveTimeDifferencePercentage = beforeWeekProductiveTime ? (productiveTime - beforeWeekProductiveTime)/beforeWeekProductiveTime*100 : 100;

  return {lastMonthAmount, maxAvgAmount, productiveTime, entertainmentTime, amountDifferencePercentage, averageAmountDifferencePercentage, entertainmentTimeDifferencePercentage, productiveTimeDifferencePercentage, daysSinceAccountCreation};
 }