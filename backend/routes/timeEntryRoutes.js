import express from 'express';
import { getAllTimeData, createTimeData, deleteTimeData, updateTimeData } from '../controllers/timeController.js';

const timeEntryRoutes = express.Router();

timeEntryRoutes.get('/', getAllTimeData);
timeEntryRoutes.post('/', createTimeData);
timeEntryRoutes.delete('/:id', deleteTimeData);
timeEntryRoutes.put('/:id', updateTimeData);

export default timeEntryRoutes;