import express from 'express';
import { login, logout, signup, getMe } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/me', protectRout, getMe);

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;
