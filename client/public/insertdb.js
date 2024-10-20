import { MongoClient } from 'mongodb'; // Use 'import' instead of 'require'
import { assets } from './assets/assets.js';  // Include the '.js' extension for ES modules

const uri = 'mongodb+srv://minaraafatemil14:0aBPhzJklE7ko2RQ@cluster0.ow0xw.mongodb.net/';
const client = new MongoClient(uri);

const commonFields = {
  bestseller: true,
  category: "Superhero",
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details: "The 6-Pack includes two black, two white, and two heather gray Basic Tees...",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
};

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const database = client.db('Products'); // Your database name
    const productsCollection = database.collection('products');

    // Generate product data
    const products = Object.keys(assets).map((key, index) => {
      return {
        id: index + 1,
        name: key, 
        imageSrc: assets[key], 
        images: [assets[key]], 
        href: `product/:${index + 1}`, 
        ...commonFields, 
      };
    });

    // Insert data into the MongoDB collection
    const result = await productsCollection.insertMany(products);
    console.log(`${result.insertedCount} products were inserted`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
