import multer from 'multer';
import path from 'path';
import fs from 'fs';

// הגדרת תיקיית יעד ושם קובץ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, '../public/uploads');

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `baby-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
