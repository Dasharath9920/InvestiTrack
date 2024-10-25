import express from 'express';
import { getStatistics, getTimeStatistics, getAmountStatistics } from '../controllers/statisticsController.js';
import validateToken from '../middleware/validateTokenHandler.js';
const statisticsRoutes = express.Router();

statisticsRoutes.use(validateToken);

statisticsRoutes.get('/', getStatistics);
statisticsRoutes.get('/time', getTimeStatistics);
statisticsRoutes.get('/amount', getAmountStatistics);

export default statisticsRoutes;