import express from 'express';
import validateToken from '../middleware/validateTokenHandler.js';
import Time from '../models/time.model.js';
import Amount from '../models/money.model.js';
import mongoose from 'mongoose';

const dashboardRoutes = express.Router();

dashboardRoutes.use(validateToken);

dashboardRoutes.get('/', async (req, res) => {
  try {
    // Fetch 5 most recent time entries
    let recentTimeEntries = await Time.find({ userId: req.user.id })
      .sort({ activityDate: -1 })
      .limit(5);

    // Fetch 5 most recent amount entries
    let recentAmountEntries = await Amount.find({ userId: req.user.id })
      .sort({ expenditureDate: -1 })
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

    const statistics = {
      totalTime,
      totalAmount,
      recentTimeEntries,
      recentAmountEntries
    }

    res.status(200).json({success: true, statistics});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default dashboardRoutes;