import foodModel from '../models/foodModel.js';
import { v2 as cloudinary } from 'cloudinary';

// Add food
const addFood = async (req, res) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.path, // Cloudinary URL
      imageId: req.file.filename, // Cloudinary public_id
    });

    await food.save();
    res.json({ success: true, message: 'Food Added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove food
const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };
