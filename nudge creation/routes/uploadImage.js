const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename format
    }
});

const upload = multer({ storage: storage });

// API for uploading image
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl: `/uploads/images/${req.file.filename}` });
});

module.exports = router;
