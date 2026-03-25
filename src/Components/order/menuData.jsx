// Import signature food images
import PepperNoodlesImg from './foodImg/pepper_noodles.png';
import SpicyGoatJollofImg from './foodImg/spicy_goat_jollof.png';
import LoadedFriesImg from './foodImg/loaded_fries.png';




export const categories = [
  { id: 1, name: 'House Specials' },
];

export const menuItems = [
  {
    id: 1,
    name: 'Pepper Noodles',
    description: 'Perfectly seasoned spicy noodles with assorted proteins and vegetables.',
    price: 200,
    category: 1,
    image: PepperNoodlesImg
  },
  {
    id: 2,
    name: 'Spicy Goat Jollof',
    description: 'Authentic Jollof rice served with tender, spicy grilled goat meat.',
    price: 250,
    category: 1,
    image: SpicyGoatJollofImg
  },
  {
    id: 3,
    name: 'Loaded Fries',
    description: 'Crispy golden fries topped with savory proteins, signature sauces, and melted cheese.',
    price: 200,
    category: 1,
    image: LoadedFriesImg
  }
];