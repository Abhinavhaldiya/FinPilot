import express from 'express';
import { authenticateUser } from '../middlewares/middleware.js';
import { signup, login, create, update } from '../controllers/user.controller.js/controller.js';

const router = express.Router();

// sign-up
router.post('/user/signup', signup);

// login
router.post('/user/login', login);

// create user
router.post('/user', authenticateUser, create);

// update user
router.put('/user/:id', authenticateUser, update);

export default router;
