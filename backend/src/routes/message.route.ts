import express from 'express';

const router = express.Router();

router.get('/conversations', (_req, res) => {
    res.send('Conversation route');
});

router.get('/messages', (_req, res) => {
    res.send('Message route');
});

export default router;
