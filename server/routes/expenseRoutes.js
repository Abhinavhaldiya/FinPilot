import express from 'express';
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = express.Router();

router.use(authenticateUser);

router.post('/', createExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
