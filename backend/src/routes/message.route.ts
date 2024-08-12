import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMassege } from '../controllers/messages.controller.js';

const router = express.Router();

router.post('/send/:id', protectRoute, sendMassege);

router.get('/messages', (_req, res) => {
    res.send('Message route');
});

export default router;
