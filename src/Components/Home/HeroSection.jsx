import React from 'react';
import styled from 'styled-components';
import SyncedSlider from './SyncedSlider';

// Import generated assets
import heroPepperNoodles from './hero_pepper_noodles.png';
import heroSpicyGoatJollof from './hero_spicy_goat_jollof.png';
import heroLoadedFries from './hero_loaded_fries.png';

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
      price: '₵200.00',
      image: heroPepperNoodles,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => window.location.href = '/order',
    },
    {
      badge: 'Chef\'s Special',
      title: 'Spicy Goat Jollof',
      description: 'Authentic Jollof rice served with tender, spicy grilled goat meat for a true heritage taste.',
      price: '₵250.00',
      image: heroSpicyGoatJollof,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => window.location.href = '/order',
    },
    {
      badge: 'Weekend Special',
      title: 'Loaded Fries',
      description: 'Crispy golden fries topped with savory proteins, signature sauces, and melted cheese.',
      price: '₵200.00',
      image: heroLoadedFries,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => window.location.href = '/order',
    },
  ];

  return (
    <HeroWrapper id="home">
      <SyncedSlider slides={slides} />
    </HeroWrapper>
  );
};

export default HeroSection;