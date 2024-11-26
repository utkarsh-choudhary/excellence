import express from 'express';
import { register, login, sendMFA, verifyMFA, googleLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/mfa/send', sendMFA);
router.post('/mfa/verify', verifyMFA);
router.post('/google-login', googleLogin);

export default router;
