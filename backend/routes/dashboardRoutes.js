import express from 'express';
import validateToken from '../middleware/validateTokenHandler.js';
import Time from '../models/time.model.js';
import Amount from '../models/money.model.js';
import mongoose from 'mongoose';
// Assume we have a service to fetch the required data

const dashboardRoutes = express.Router();

dashboardRoutes.use(validateToken);

dashboardRoutes.get('/', async (req, res) => {
  try {
    // Fetch 5 most recent time entries
    let recentTimeEntries = await Time.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch 5 most recent amount entries
    let recentAmountEntries = await Amount.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Calculate total time and amount
    const totalTimeResult = await Time.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id)}},
      { $group: {_id: null, totalTime: { $sum: '$time'}}}
    ]);
    const totalTime = totalTimeResult.length > 0? totalTimeResult[0].totalTime: 0;

    const totalAmountResult = await Amount.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id)}},
      { $group: {_id: null, totalAmount: { $sum: '$amount'}}}
    ]);
    const totalAmount = totalAmountResult.length > 0? totalAmountResult[0].totalAmount: 0;

    const response = {
      totalTime,
      totalAmount,
      recentTimeEntries,
      recentAmountEntries
    }
    res.status(200).json({success: true, statistics: response});
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

export default dashboardRoutes;