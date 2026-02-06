import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/me', authController.verifyToken, authController.me);
router.post('/change-password', authController.verifyToken, authController.changePassword);

export default router;
