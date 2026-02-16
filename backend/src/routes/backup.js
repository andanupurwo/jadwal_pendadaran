import express from 'express';
import multer from 'multer';
import path from 'path';
import { exportBackup, importBackup } from '../controllers/backupController.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'backup-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
    fileFilter: (req, file, cb) => {
        // Accept only .sql files
        if (path.extname(file.originalname).toLowerCase() === '.sql') {
            cb(null, true);
        } else {
            cb(new Error('Only .sql files are allowed'));
        }
    }
});

// Routes
router.post('/export', exportBackup);
router.post('/import', upload.single('backup'), importBackup);

export default router;
