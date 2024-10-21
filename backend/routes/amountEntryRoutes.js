import express from 'express';
import { getAllMoneyData, createMoneyData, deleteMoneyData, updateMoneyData } from '../controllers/amountController.js';

const moneyEntryRoutes = express.Router();

moneyEntryRoutes.get('/', getAllMoneyData);
moneyEntryRoutes.post('/', createMoneyData);
moneyEntryRoutes.delete('/:id', deleteMoneyData);
moneyEntryRoutes.put('/:id', updateMoneyData);

export default moneyEntryRoutes;