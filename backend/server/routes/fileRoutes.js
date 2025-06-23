const express = require('express');
const multer = require('multer');
const { uploadExcel } = require('../controllers/fileController'); // adjust name if different

const router = express.Router();

// store file in memory (buffer) so SheetJS can read it
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('file'), uploadExcel);

module.exports = router;
