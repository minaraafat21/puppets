/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('Products');

// Create a new document in the collection.
db.getCollection('products').insertOne({
  _id: ObjectId('670fdf848c5a9819f1b60bd1'),
  id: 1,
  name: 'Batman',
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality...',
  price: '200',
  imageSrc: 'batman.jpg',
  images: ['batman.jpg', 'batman1.jpg', 'batman2.jpg', 'batman3.jpg'],
  bestseller: true,
  category: 'Superhero',
  href: 'product/:1',
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
