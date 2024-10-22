import express from 'express';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const collection = await db.collection('orders');
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving orders');
  }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const collection = await db.collection('orders');
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      res.status(404).send('Order not found');
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving order');
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const newOrder = {
      products: req.body.products, // Array of products (each with name, price, quantity, etc.)
      totalAmount: req.body.totalAmount, // Total price for the order
      customerDetails: req.body.customerDetails, // New field for customer details
      date: new Date(), // Automatically set the date of the order
    };

    const collection = await db.collection('orders');
    const result = await collection.insertOne(newOrder);
    res.status(201).send(result); // 201 for successful creation
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

// Update an order
router.patch('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        products: req.body.products, // Update products array
        totalAmount: req.body.totalAmount, // Update total price
        customerDetails: req.body.customerDetails, // Update customer details
      },
    };

    const collection = await db.collection('orders');
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      res.status(404).send('Order not found');
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating order');
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = await db.collection('orders');
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send('Order not found');
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting order');
  }
});

export default router;
