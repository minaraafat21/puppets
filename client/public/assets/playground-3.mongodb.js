/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Products');

// Create a new document in the collection.
db.getCollection('products').insertOne({
  _id: ObjectId('670fdf848c5a9819f1b60b16'),
  id: 16,
  name: 'spiderman',
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality...',
  price: '200',
  imageSrc: 'spider1.jpg',
  images: [
    'spider1.jpg',
    'spider2.jpg',
    'spider3.jpg',
  ],
  bestseller: true,
  category: 'superhero',
  href: 'product/:16',
  
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees...',
  breadcrumbs: [
    {
      id: 1,
      name: 'Men',
      href: '#',
    },
    {
      id: 2,
      name: 'Clothing',
      href: '#',
    },
  ],
});
