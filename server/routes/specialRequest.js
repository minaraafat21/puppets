import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../client/public/assets/')); // Save to assets folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Save file with unique name
  },
});

const upload = multer({ storage });

// Get all special requests
router.get('/', async (req, res) => {
  try {
    const collection = await db.collection('specialRequests');
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving special requests');
  }
});

// Get a single special request by ID
router.get('/:id', async (req, res) => {
  try {
    const collection = await db.collection('specialRequests');
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      res.status(404).send('Special request not found');
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving special request');
  }
});

// Create a new special request with image upload
router.post('/', upload.single('imageSrc'), async (req, res) => {
  try {
    const { name, message, phoneNumber } = req.body; // Include phoneNumber from the request body

    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const imageName = req.file.filename; // Get the saved file name

    const newRequest = {
      name,
      message,
      phoneNumber, // Save the phone number
      imageSrc: imageName, // Save the image path or name
      date: new Date(), // Automatically set the date of the request
    };

    const collection = await db.collection('specialRequests');
    const result = await collection.insertOne(newRequest);

    if (result.acknowledged) {
      res.status(201).json(newRequest);
    } else {
      res.status(500).send('Error inserting special request');
    }
  } catch (err) {
    console.error('Error creating special request:', err);
    res.status(500).send('Server error');
  }
});

// Update a special request with image upload
router.patch('/:id', upload.single('imageSrc'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message, phoneNumber } = req.body; // Include phoneNumber

    const updateData = {
      name,
      message,
      phoneNumber, // Update phone number
    };

    if (req.file) {
      updateData.imageSrc = req.file.filename; // Update image if a new file is uploaded
    }

    const result = await db
      .collection('specialRequests')
      .updateOne({ _id: ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).send('Special request not found');
    }

    const updatedRequest = { ...updateData, _id: id };
    res.json(updatedRequest);
  } catch (err) {
    console.error('Error updating special request:', err);
    res.status(500).send('Server error');
  }
});

// Delete a special request
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection('specialRequests');
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send('Special request not found');
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting special request');
  }
});

export default router;
