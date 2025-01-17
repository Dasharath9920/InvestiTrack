import express from 'express';
import { getAllMoneyData, createMoneyData, deleteMoneyData, updateMoneyData } from '../controllers/amountController.js';
import validateToken from '../middleware/validateTokenHandler.js';

const moneyEntryRoutes = express.Router();

moneyEntryRoutes.use(validateToken);
moneyEntryRoutes.get('/', getAllMoneyData);
moneyEntryRoutes.post('/', createMoneyData);
moneyEntryRoutes.delete('/', deleteMoneyData);
moneyEntryRoutes.put('/', updateMoneyData);

export default moneyEntryRoutes;