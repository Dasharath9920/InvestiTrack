import express from 'express';
import { getStatistics, getTimeStatistics, getAmountStatistics, timeChartData, amountChartData } from '../controllers/statisticsController.js';
import validateToken from '../middleware/validateTokenHandler.js';
const statisticsRoutes = express.Router();

statisticsRoutes.use(validateToken);

statisticsRoutes.get('/', getStatistics);
statisticsRoutes.get('/time', getTimeStatistics);
statisticsRoutes.get('/amount', getAmountStatistics);
statisticsRoutes.get('/chart/time', timeChartData);
statisticsRoutes.get('/chart/amount', amountChartData);

export default statisticsRoutes;