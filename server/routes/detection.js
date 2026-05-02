import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/detect', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No image uploaded' });
  }

  const imagePath = req.file.path;
  const pythonScript = path.join(__dirname, '..', 'predict.py');

  // Use 'python' or 'python3' depending on system
  const pyProcess = spawn('python', [pythonScript, imagePath]);

  let dataString = '';

  pyProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });

  pyProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data.toString()}`);
  });

  pyProcess.on('close', (code) => {
    // Clean up uploaded file
    fs.unlink(imagePath, (err) => {
      if (err) console.error(`Error deleting temp file: ${err}`);
    });

    if (code !== 0) {
      return res.status(500).json({ success: false, error: 'Prediction script failed' });
    }

    try {
      const result = JSON.parse(dataString);
      res.json(result);
    } catch (e) {
      console.error('Parse Error:', dataString);
      res.status(500).json({ success: false, error: 'Failed to parse prediction results' });
    }
  });
});

export default router;
