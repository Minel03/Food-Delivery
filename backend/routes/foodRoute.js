import express from 'express';
import {
  addFood,
  listFood,
  removeFood,
} from '../controllers/foodController.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engineer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'food-images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;
