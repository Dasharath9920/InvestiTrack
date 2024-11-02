import { getAmountSpendsByDays, getTimeSpendsByDays, avgAmountSpendsByTime, avgTimeSpendsByDays, getBeforeMonthAmountData, getBeforeMonthAvgAmountData, getBeforeWeekTimeData, getBeforeWeekAvgTimeData, getTimeChartData, getAmountChartData } from '../service.js';

export const getStatistics = async (req, res) => {
    try{
        const lastMonthAmountData = await getAmountSpendsByDays(req.user.id, 30);
        const lastMonthAvgAmountData = await avgAmountSpendsByTime(req.user.id, 30);
        const lastWeekTimeData = await getTimeSpendsByDays(req.user.id, 7);
        const lastWeekAvgTimeData = await avgTimeSpendsByDays(req.user.id, 7);
        const beforeMonthAmountData = await getBeforeMonthAmountData(req.user.id);
        const beforeMonthAvgAmountData = await getBeforeMonthAvgAmountData(req.user.id);
        const beforeWeekTimeData = await getBeforeWeekTimeData(req.user.id);
        const beforeWeekAvgTimeData = await getBeforeWeekAvgTimeData(req.user.id);

        const statistics = {
            lastMonthAmountData,
            lastMonthAvgAmountData,
            beforeMonthAmountData,
            beforeMonthAvgAmountData,
            lastWeekTimeData,
            lastWeekAvgTimeData,
            beforeWeekTimeData,
            beforeWeekAvgTimeData
        }

        res.status(200).json({success: true, statistics});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const getTimeStatistics = async (req, res) => {
    try{
         const dataFor7Days = await getTimeSpendsByDays(req.user.id, 7);
         const dataFor30Days = await getTimeSpendsByDays(req.user.id, 30);
         const dataFor6Months = await getTimeSpendsByDays(req.user.id, 180);
         const dataFor12Months = await getTimeSpendsByDays(req.user.id, 365);
         const dataFor5Years = await getTimeSpendsByDays(req.user.id, 1825);

         const data = {
            dataFor7Days,
            dataFor30Days,
            dataFor6Months,
            dataFor12Months,
            dataFor5Years
         }

        res.status(200).json({success: true, data});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const getAmountStatistics = async (req, res) => {
    try{
        const dataFor7Days = await getAmountSpendsByDays(req.user.id, 7);
        const dataFor30Days = await getAmountSpendsByDays(req.user.id, 30);
        const dataFor6Months = await getAmountSpendsByDays(req.user.id, 180);
        const dataFor12Months = await getAmountSpendsByDays(req.user.id, 365);
        const dataFor5Years = await getAmountSpendsByDays(req.user.id, 1825);

        const data = {
            dataFor7Days,
            dataFor30Days,
            dataFor6Months,
            dataFor12Months,
            dataFor5Years
        }
        res.status(200).json({success: true, data});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const timeChartData = async (req, res) => {
    try {
        const { timePeriod, daysToBeSkipped } = req.query;
        const data = await getTimeChartData(req.user.id, timePeriod, daysToBeSkipped);
        return res.status(200).json({success: true, data});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

export const amountChartData = async (req, res) => {
    try {
        const { timePeriod, daysToBeSkipped } = req.query;
        const data = await getAmountChartData(req.user.id, timePeriod, daysToBeSkipped);
        return res.status(200).json({success: true, data});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}