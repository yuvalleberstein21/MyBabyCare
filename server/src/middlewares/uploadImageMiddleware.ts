import multer from 'multer';
import path from 'path';

// הגדרת תיקיית יעד ושם קובץ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'baby-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export default upload;
