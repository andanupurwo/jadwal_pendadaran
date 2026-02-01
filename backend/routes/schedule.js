import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/generate', scheduleController.generateSchedule);

export default router;
