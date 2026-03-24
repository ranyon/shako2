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
      badge: 'National Dish',
      title: 'Traditional Masgouf',
      description: 'Authentic Iraqi grilled carp seasoned with tamarind and turmeric, served with fresh khubz.',
      price: '₵150.00',
      image: platter3,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => console.log('Book Table'),
    },
    {
      badge: 'Chef\'s Special',
      title: 'Lamb Quzi',
      description: 'Slow-cooked stuffed lamb served on a bed of aromatic rice with nuts, raisins, and Iraqi spices.',
      price: '₵180.00',
      image: platter2,
      onPrimaryClick: () => window.location.href = '/order',
      onSecondaryClick: () => console.log('Book Table'),
    },
    {
      badge: 'Baghdad Favorite',
      title: 'Traditional Dolma',
      description: 'Mix of vegetables stuffed with spiced meat and rice, slow-cooked to perfection.',
      price: '₵120.00',
      image: platter1,
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