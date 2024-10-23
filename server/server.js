import express from 'express';
import records from './routes/record.js'; 
import orders from './routes/orders.js'; 
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.use('/record', records);
app.use('/orders', orders);


app.use('/assets', express.static(path.join(__dirname, '../assets')));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
