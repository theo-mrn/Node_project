import express from 'express';
import { verifyGoogleToken } from '../controllers/authController';

const router = express.Router();

router.post('/google-auth', verifyGoogleToken);

export default router;