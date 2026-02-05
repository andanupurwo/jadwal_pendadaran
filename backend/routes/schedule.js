import express from 'express';
import * as scheduleController from '../controllers/scheduleController.js';

const router = express.Router();

router.post('/generate', scheduleController.generateSchedule);
router.post('/move', scheduleController.moveSlot);

export default router;
