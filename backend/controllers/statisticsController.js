import { getAmountSpendsByDays, getTimeSpendsByTimeDays, avgAmountSpendsByTime, avgTimeSpendsByTimeDays } from '../helper.js';

export const getStatistics = async (req, res) => {
    try{
        const lastMonthAmountData = await getAmountSpendsByDays(req.user.id, 30);
        const lastMonthTimeData = await getTimeSpendsByTimeDays(req.user.id, 30);
        const lastMonthAvgAmountData = await avgAmountSpendsByTime(req.user.id, 30);
        const lastMonthAvgTimeData = await avgTimeSpendsByTimeDays(req.user.id, 30);

        const statistics = {
            lastMonthAmountData,
            lastMonthTimeData,
            lastMonthAvgAmountData,
            lastMonthAvgTimeData
        }

        res.status(200).json({success: true, statistics});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const getTimeStatistics = async (req, res) => {
    try{
        res.status(200).json({success: true, message: 'Time statistics fetched successfully'});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}

export const getAmountStatistics = async (req, res) => {
    try{
        res.status(200).json({success: true, message: 'Amount statistics fetched successfully'});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
}