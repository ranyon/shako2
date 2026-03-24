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
      title: 'Pepper Noodles',
      description: 'Perfectly seasoned spicy noodles with assorted proteins and fresh vegetables.',
      price: '₵90.00',
      image: platter1,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => console.log('Book Table'),
    },
    {
      badge: 'Chef\'s Special',
      title: 'Spicy Goat Jollof',
      description: 'Authentic Jollof rice served with tender, spicy grilled goat meat for a true heritage taste.',
      price: '₵110.00',
      image: platter2,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => console.log('Book Table'),
    },
    {
      badge: 'Weekend Special',
      title: 'Loaded Fries',
      description: 'Crispy golden fries topped with savory proteins, signature sauces, and melted cheese.',
      price: '₵100.00',
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