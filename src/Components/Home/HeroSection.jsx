import React from 'react';
import styled from 'styled-components';
import SyncedSlider from './SyncedSlider';

// Import generated assets (using full paths for now to ensure visibility)
import platter1 from './hero_waakye.png';
import platter2 from './hero_jollof.png';
import platter3 from './hero_banku.png';

const HeroWrapper = styled.section`
  padding: 95px 0 5px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const HeroSection = () => {
  const slides = [
    {
      badge: 'Local Favorite',
      title: 'Waakye',
      description: 'Authentic Ghanaian Waakye with rich tomato stew, shito, boiled egg, and plantains.',
      price: '₵85.00',
      image: platter1,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => console.log('Book Table'),
    },
    {
      badge: 'Chef\'s Special',
      title: 'Jollof Rice & Chicken',
      description: 'Classic West African Jollof rice perfectly seasoned, served with juicy grilled chicken.',
      price: '₵85.00',
      image: platter2,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => console.log('Book Table'),
    },
    {
      badge: 'Weekend Special',
      title: 'Banku & Tilapia',
      description: 'Traditional fermented corn dough served with perfectly grilled tilapia and fresh pepper.',
      price: '₵150.00',
      image: platter3,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => console.log('Book Table'),
    },
  ];

  return (
    <HeroWrapper id="home">
      <SyncedSlider slides={slides} />
    </HeroWrapper>
  );
};

export default HeroSection;