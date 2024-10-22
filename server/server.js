import express from 'express';
import records from './routes/record.js'; // Adjust the path as needed
import orders from './routes/orders.js'; // Adjust the path as needed
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Enable CORS for your frontend origin
app.use(express.json());

// Routes
app.use('/record', records);
app.use('/orders', orders);

// Serve static files (if needed)
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
