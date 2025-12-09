import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'babies', // תיקייה ב-Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: `baby-${Date.now()}`,
  }),
});

const upload = multer({ storage });

export default upload;
