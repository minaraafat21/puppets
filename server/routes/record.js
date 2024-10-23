import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const {
      name,
      price,
      description,
      category,
      bestseller,
      colors,
      highlights,
      details,
      images,
      breadcrumbs,
    } = req.body;

    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const imageName = req.file.filename; // Get the saved file name

    // Generate a new numeric ID
    const existingRecords = await db.collection('products').find({}).toArray();
    const newId = existingRecords.length + 1;

    const newRecord = {
      id: newId,
      name,
      price,
      href: `product/:${newId}`,
      description,
      category,
      bestseller: bestseller === 'true',
      colors: colors ? JSON.parse(colors) : [],
      highlights: highlights ? JSON.parse(highlights) : [],
      details,
      images: images ? JSON.parse(images) : [],
      breadcrumbs: breadcrumbs ? JSON.parse(breadcrumbs) : [],
      imageSrc: imageName,
    };

    const result = await db.collection('products').insertOne(newRecord);
    console.log('Insert result:', result);

    if (result.acknowledged) {
      const insertedRecord = {
        ...newRecord,
        href: `product/:${newRecord.id}`,
      };
      res.json(insertedRecord);
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
    const {
      name,
      price,
      description,
      category,
      bestseller,
      colors,
      highlights,
      details,
      images,
      breadcrumbs,
    } = req.body;
    const href = `product/:${id}`; // Correct href usage
    const updateData = {
      name,
      price,
      description,
      href,
      category,
      bestseller: bestseller === 'true',
      colors: colors ? JSON.parse(colors) : [],
      highlights: highlights ? JSON.parse(highlights) : [],
      details,
      images: images ? JSON.parse(images) : [],
      breadcrumbs: breadcrumbs ? JSON.parse(breadcrumbs) : [],
    };

    if (req.file) {
      updateData.imageSrc = req.file.filename;
    }

    const result = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res.status(404).send('Record not found');
    }

    const updatedRecord = { ...updateData, id: Number(id), href }; // Combine updateData with id and href
    res.json(updatedRecord);
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).send('Server error');
  }
});

export default router;
