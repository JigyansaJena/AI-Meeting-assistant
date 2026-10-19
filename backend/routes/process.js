const express = require('express');
const multer = require('multer');
const router = express.Router();
const {transcribeAudio} = require('../utils/transcribe');
const {summarizeMeeting} = require('../utils/summarize');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {fileSize: 25 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    const allowed = ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/m4a', 'audio/webm', 'video/mp4'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only audio files allowed'));
  }
});

router.post('/process', upload.single('audio'), async(req, res) => {
  try {
    if(!req.file) {
      return res.status(400).json({error: 'No audio file uploaded'});
    }
    console.log('File received: ', req.file.filename);

    console.log('Transcribing...');
    const transcript = await transcribeAudio(req.file.path);

    console.log('summarizing...');
    const summary = await summarizeMeeting(transcript);

    const fs = require('fs');
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      transcript,
      summary
    });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;