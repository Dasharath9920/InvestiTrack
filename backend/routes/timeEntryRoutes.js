import express from 'express';
import { getAllTimeData, createTimeData, deleteTimeData, updateTimeData } from '../controllers/timeController.js';
import validateToken from '../middleware/validateTokenHandler.js';

const timeEntryRoutes = express.Router();

timeEntryRoutes.use(validateToken);
timeEntryRoutes.get('/', getAllTimeData);
timeEntryRoutes.post('/', createTimeData);
timeEntryRoutes.delete('/', deleteTimeData);
timeEntryRoutes.put('/:id', updateTimeData);

export default timeEntryRoutes;