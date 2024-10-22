import express from 'express';
import validateToken from '../middleware/validateTokenHandler.js';
import Time from '../models/time.model.js';
import Amount from '../models/money.model.js';
// Assume we have a service to fetch the required data

const dashboardRoutes = express.Router();

dashboardRoutes.use(validateToken);

dashboardRoutes.get('/', async (req, res) => {
  try {
    let times = await Time.find({userId: req.user.id});
    let amounts = await Amount.find({userId: req.user.id});
    res.status(200).json({success: true, times, amounts});
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

export default dashboardRoutes;