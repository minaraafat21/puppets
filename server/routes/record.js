import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up storage for multer to save files in the assets folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../client/public/assets/')); // Save to the assets folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Save file with unique name
  },
});

const upload = multer({ storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const collection = await db.collection('products');
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const collection = await db.collection('products');
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) return res.status(404).send('Not found');
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching product');
  }
});

// Add new record with image upload
router.post('/', upload.single('imageSrc'), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const imageName = req.file.filename; // Get the saved file name

    const newRecord = {
      name,
      price,
      description,
      category,
      imageSrc: imageName, // Store only the image name
    };

    const result = await db.collection('products').insertOne(newRecord);
    console.log('Insert result:', result); // Log the result

    if (result.acknowledged) {
      res.json(result.ops[0]); // Only access ops[0] if result is acknowledged
    } else {
      res.status(500).send('Error inserting record');
    }
  } catch (err) {
    console.error('Error creating record:', err);
    res.status(500).send('Server error');
  }
});

// Update record with image upload
router.patch('/:id', upload.single('imageSrc'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const updateData = {
      name,
      price,
      description,
      category,
    };

    if (req.file) {
      updateData.imageSrc = req.file.filename; // Update with new image name if a new file is uploaded
    }

    const result = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res.status(404).send('Record not found');
    }

    res.json({ message: 'Record updated successfully' });
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).send('Server error');
  }
});

export default router;
