import express from 'express';
import * as mahasiswaController from '../controllers/mahasiswaController.js';

const router = express.Router();

router.get('/', mahasiswaController.getAllMahasiswa);
router.get('/:nim', mahasiswaController.getMahasiswaByNim);
router.post('/', mahasiswaController.createMahasiswa);
router.put('/:nim', mahasiswaController.updateMahasiswa);
router.delete('/:nim', mahasiswaController.deleteMahasiswa);
router.post('/bulk', mahasiswaController.bulkCreateMahasiswa);

export default router;
