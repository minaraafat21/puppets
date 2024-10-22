import logo from './logo.png';
import hero from './hero.png';
import stitchHero from './stitchHero.png';
import batman from './batman.jpg';
import batman1 from './batman1.jpg';
import batman2 from './batman2.jpg';
import batman3 from './batman3.jpg';
import bear from './bear.jpg';
import blueGirl from './blueGirl.webp';
import blueGirl1 from './blueGirl1.webp';
import blueGirl2 from './blueGirl2.webp';
import blueGirl3 from './blueGirl3.webp';
import blueGirl4 from './blueGirl4.webp';
import blueGirl5 from './blueGirl5.webp';
import blueGirl6 from './blueGirl6.webp';
import blueGirl7 from './blueGirl7.webp';
import blueGirlGlasses from './blueGirlGlasses.webp';
import cowboy from './cowboy.jpg';
import cuala from './cuala.jpg';
import cuala1 from './cuala1.jpg';
import cuala2 from './cuala2.jpg';
import cuala3 from './cuala3.jpg';

import dog from './dog.jpg';
import dog1 from './dog1.jpg';
import dog2 from './dog2.jpg';
import dog3 from './dog3.jpg';
import dog4 from './dog4.jpg';
import dog5 from './dog5.jpg';
import dog6 from './dog6.jpg';

import flower from './flower.jpg';
import flowers from './flowers.jpg';

import gangstar from './gangstar.jpg';
import gangstar1 from './gangstar1.jpg';
import gangstar2 from './gangstar2.jpg';
import gangstar3 from './gangstar3.jpg';

import greenGirl from './greenGirl.webp';
import greenGirl1 from './greenGirl1.webp';
import greenGirl2 from './greenGirl2.webp';

import mario from './mario.jpg';

import mouse from './mouse.jpg';

import owl from './owl.jpg';

import panaFemale from './panaFemale.jpg';
import panaFemale1 from './panaFemale1.jpg';

import pandaCoupe from './pandaCouple.jpg';
import pandaCoupe1 from './pandaCouple1.jpg';
import pandaCoupe2 from './pandaCouple2.jpg';

import pandaMale from './pandaMale.jpg';

import princess from './princess.jpg';
import princess2 from './princess2.jpg';
import princess3 from './princess3.jpg';
import princess4 from './princess4.jpg';

import spider1 from './spider1.jpg';
import spider2 from './spider2.jpg';
import spider3 from './spider3.jpg';

import stitch from './stitch.jpg';
import stitch2 from './stitch2.jpg';
import stichMale from './stitchMale.jpg';
import stichFemale from './stitchFemale.jpg';

export const assets = {
  logo,
  hero,
  stitchHero,
  batman,
  batman1,
  batman2,
  batman3,
  bear,
  blueGirl,
  blueGirl1,
  blueGirl2,
  blueGirl3,
  blueGirl4,
  blueGirl5,
  blueGirl6,
  blueGirl7,
  blueGirlGlasses,
  cowboy,
  cuala,
  cuala1,
  cuala2,
  cuala3,
  dog,
  dog1,
  dog2,
  dog3,
  dog4,
  dog5,
  dog6,
  flower,
  flowers,
  gangstar,
  gangstar1,
  gangstar2,
  gangstar3,
  greenGirl,
  greenGirl1,
  greenGirl2,
  mario,
  mouse,
  owl,
  panaFemale,
  panaFemale1,
  pandaCoupe,
  pandaCoupe1,
  pandaCoupe2,
  pandaMale,
  princess,
  princess2,
  princess3,
  princess4,
  spider1,
  spider2,
  spider3,
  stitch,
  stitch2,
  stichMale,
  stichFemale,
};

export const products = [
  {
    id: 1,
    name: 'Batman',
    description:
      'Batman is a superhero who appears in American comic books published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939.',
    price: '100 EGP',
    imageSrc: assets.batman,
    images: [assets.batman, assets.batman1, assets.batman2, assets.batman3],
    bestseller: true,
    category: 'Superhero',
    href: 'product/:1',
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
      { name: 'XXS', inStock: false },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: true },
      { name: '3XL', inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    breadcrumbs: [
      { id: 1, name: 'Men', href: '#' },
      { id: 2, name: 'Clothing', href: '#' },
    ],
  },
  {
    id: 2,
    name: 'Bear',
    price: 200,
    imageSrc: assets.bear,
  },
];
