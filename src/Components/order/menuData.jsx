// import Tilapia from './foodImg/tilapia.jpg';
// import Pineapple from './foodImg/pineapple.jpg';
// import LFries from './foodImg/loadedFries.jfif';
// import Banku from './foodImg/banku.jfif';


// MAIN
import MaxiPlainRice from './foodImg/maxiPlainRice.png';
import MaxiWaakye from './foodImg/maxiWaakye.png';
import FullyLoadedWaakye from './foodImg/fullyLoadedWaakye.png';
import MaxiJollof from './foodImg/maxiJollof.png';
import FullyLoadedJollof from './foodImg/fullyLoadedJollof.png';
import MiniJollof from './foodImg/maxiJollof.png';
import Couscous from './foodImg/couscousAndChickenSauce.png';
import Acheke from './foodImg/bankuAndTilapia.png';
import AssortedFriedRice from './foodImg/assortedFriedRice.png';
import MaxiFriedRice from './foodImg/friedRice.jfif';
import MiniFriedRice from './foodImg/friedRice.jfif';
import FriedRiceWithBeefSauce from './foodImg/friedRiceWithBeefSauce.png';
import AssortedJollof from './foodImg/maxiJollof.png';
import AssortedNoodles from './foodImg/assortedNoodles.png';
import PlantainAndWings from './foodImg/plantainAndChickenWings.png';
import FrenchFriesAndWings from './foodImg/frenchFriesAndChickenWIngs.png';
import BankuAndTilapia from './foodImg/bankuAndTilapia.png';
import LoadedFries from './foodImg/loadedFries.png';
import FullyLoadedFries from './foodImg/loadedFries.png';
import YamChipsAndChicken from './foodImg/yamChipsAndChickenWings.png';
import YamChipsAndTurkey from './foodImg/yamChipsAndTurkey.png';
import YamChipsAndGoat from './foodImg/yamChipsAndGoat.png';
import LoadedYam from './foodImg/loadedYam.jfif';
import ZongoRice from './foodImg/zongoRice.jfif';
import FullyLoadedZongoRice from './foodImg/fullyLoadedZongoRice.jfif';
// MAIN

// SIDES
import Jollof from './foodImg/jollof.png';
import PlainRice from './foodImg/plainRice.png';
import YamChips from './foodImg/yamChips.png';
import FriedPlantain from './foodImg/plantain.png';
import FrenchFries from './foodImg/frenchFries.png';
import Kelewele from './foodImg/kelewele.png';
import Banku from './foodImg/banku.png';
import AchekeSide from './foodImg/acheke.jfif';
// SIDES

// SALADS & WRAPS
import AvocadoSalad from './foodImg/avocadoSalad.png';
import GhanaianSalad from './foodImg/ghanainSalad.png';
import ChickenSalad from './foodImg/chickenSalad.png';
import BeefShawarma from './foodImg/beefShawarma.png';
import ChickenShawarma from './foodImg/chickenShawarma.png';
import MixedShawarma from './foodImg/shawarmaMeal.png';
import ShawarmaMeal from './foodImg/shawarmaMeal.png';
// SALADS & WRAPS

// DRINKS
import FreshPineapple from './foodImg/freshPineapple.png';
import FreshWaterMelon from './foodImg/freshWaterMelon.png';
import FreshOrange from './foodImg/freshOrange.png';
import PineAndGinger from './foodImg/pineAndGinger.png';
import FreshGinger from './foodImg/freshGinger.png';
import FreshSobolo from './foodImg/freshSobolo.png';
import Burkina from './foodImg/burkina.png';
// DRINKS




export const categories = [
  { id: 1, name: 'Main Courses' },
  { id: 2, name: 'Side Courses' },
  { id: 3, name: 'Salads & Wraps' },
  { id: 4, name: 'Drinks' },
];

export const menuItems = [
  // Main Courses
  { id: 1, name: 'Traditional Masgouf', description: 'Grilled carp, the national dish of Iraq, seasoned with tamarind and turmeric.', price: 150.00, category: 1, image: BankuAndTilapia },
  { id: 2, name: 'Lamb Quzi', description: 'Slow-cooked stuffed lamb served on a bed of aromatic rice with nuts and raisins.', price: 180.00, category: 1, image: MaxiPlainRice },
  { id: 3, name: 'Baghdad Dolma', description: 'Grape leaves, onions, and peppers stuffed with spiced meat and rice.', price: 120.00, category: 1, image: FullyLoadedWaakye },
  { id: 4, name: 'Iraqi Biryani', description: 'Fluffy rice with meat, potatoes, peas, and traditional Iraqi spices.', price: 95.00, category: 1, image: MaxiJollof },
  { id: 5, name: 'Tashreeb', description: 'Tender meat stew served over pieces of traditional flatbread (khubz).', price: 110.00, category: 1, image: FriedRiceWithBeefSauce },
  { id: 6, name: 'Kebab Irawi', description: 'Skewers of minced meat grilled to perfection over charcoal.', price: 130.00, category: 1, image: AssortedFriedRice },
  { id: 7, name: 'Bamya Stew', description: 'Traditional okra and lamb stew in a rich tomato base.', price: 90.00, category: 1, image: Couscous },
  { id: 8, name: 'Falafel Plate', description: 'Crispy Iraqi-style falafel served with amba (mango pickle) and salad.', price: 75.00, category: 1, image: FullyLoadedFries },

  // Side Courses
  { id: 26, name: 'Basmati Rice', description: 'Fragrant steamed basmati rice.', price: 40.00, category: 2, image: PlainRice },
  { id: 27, name: 'Khubz (Iraqi Bread)', description: 'Freshly baked traditional flatbread.', price: 15.00, category: 2, image: Jollof },
  { id: 28, name: 'Amba Pickle', description: 'Tangy Iraqi mango pickle sauce.', price: 10.00, category: 2, image: YamChips },
  { id: 29, name: 'Tabbouleh', description: 'Fresh parsley, tomato, and bulgur salad.', price: 40.00, category: 2, image: FriedPlantain },
  { id: 30, name: 'Hummus', description: 'Creamy chickpea dip with tahini and olive oil.', price: 40.00, category: 2, image: FrenchFries },

  // Salads & Wraps
  { id: 34, name: 'Fattoush Salad', description: 'Fresh garden salad with toasted pita pieces.', price: 60.00, category: 3, image: AvocadoSalad },
  { id: 35, name: 'Kebab Wrap', description: 'Grilled kebab wrapped in fresh khubz with salad.', price: 80.00, category: 3, image: BeefShawarma },
  { id: 36, name: 'Falafel Wrap', description: 'Crispy falafel wrapped in khubz with amba sauce.', price: 60.00, category: 3, image: ChickenShawarma },

  // Desserts & Drinks
  { id: 41, name: 'Kleicha', description: 'Traditional Iraqi date-filled cookies.', price: 35.00, category: 4, image: FreshPineapple },
  { id: 42, name: 'Iraqi Cardamom Tea', description: 'Strong black tea infused with cardamom.', price: 15.00, category: 4, image: FreshSobolo },
  { id: 43, name: 'Ayran', description: 'Chilled yogurt drink with a hint of salt.', price: 20.00, category: 4, image: Burkina }
];