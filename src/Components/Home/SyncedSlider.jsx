import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/controller';
import 'swiper/css/effect-fade';

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 8%;
  color: var(--text-primary);
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  min-height: 500px;

  @media (max-width: 991px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  
  h1 {
    font-size: 5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 2rem;
    
    @media (max-width: 991px) {
      font-size: 3.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
    max-width: 500px;
  }
`;

const Badge = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--accent-primary);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2.5rem;
  background: var(--accent-primary);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(255, 107, 0, 0.2);
  
  &:hover {
    background: var(--accent-secondary);
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  
  &:hover {
    background: var(--glass-bg);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5));
  }
`;

const FloatingPrice = styled(motion.div)`
  position: absolute;
  top: 15%;
  left: 4%;
  background: linear-gradient(135deg, var(--accent-primary), #ff4500);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.6rem 1.75rem;
  border-radius: 50px;
  color: #ffffff;
  font-weight: 800;
  font-size: 1.35rem;
  box-shadow: 0 10px 30px rgba(255, 107, 0, 0.4);
  z-index: 20;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  @media (max-width: 991px) {
    top: 5%;
    left: 50%;
    transform: translateX(-50%) !important;
  }
`;

const ThumbSliderContainer = styled.div`
  margin-top: 1rem;
  
  .swiper-slide {
    width: auto;
    opacity: 0.5;
    transition: var(--transition-smooth);
    cursor: pointer;

    &.swiper-slide-thumb-active {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

const ThumbCard = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-width: 280px;
  transition: var(--transition-smooth);
  
  @media (max-width: 768px) {
    min-width: 220px;
    padding: 0.75rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    min-width: 160px;
    padding: 0.5rem;
    gap: 0.5rem;
    
    img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
    
    .info h4 {
      font-size: 0.9rem;
    }
  }

  &.active {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--accent-primary);
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 15px;
    object-fit: cover;
  }

  .info {
    h4 {
      margin: 0;
      font-size: 1.1rem;
    }
    p {
      margin: 0.25rem 0 0;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 991px) {
    display: flex;
    flex-direction: column-reverse;
    text-align: center;
    gap: 2rem;
    min-height: auto;
  }
`;

const LeftCol = styled.div`
  flex: 1.2;
  z-index: 10;
`;

const RightCol = styled.div`
  flex: 0.8;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SyncedSlider = ({ slides }) => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentSlide = slides[activeIndex];

  return (
    <SliderContainer>
      <HeroGrid>
        {/* Left Column - Animated Content */}
        <LeftCol>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <Badge>{currentSlide.badge}</Badge>
              <h1 style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }} className="hero-main-title">
                It's not just<br />Food, It's an<br /><span style={{ color: 'var(--accent-primary)' }}>Experience.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px' }}>
                {currentSlide.description}
              </p>
              <ButtonGroup>
                <PrimaryButton onClick={currentSlide.onPrimaryClick}>View Menu</PrimaryButton>
                <SecondaryButton onClick={currentSlide.onSecondaryClick}>Book A Table</SecondaryButton>
              </ButtonGroup>
            </motion.div>
          </AnimatePresence>
        </LeftCol>

        {/* Right Column - Image Swiper */}
        <RightCol>
          <Swiper
            modules={[Controller, EffectFade, Autoplay]}
            onSwiper={setFirstSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            controller={{ control: secondSwiper }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{ delay: 5000 }}
            className="main-slider"
            style={{ width: '100%', maxWidth: '500px' }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <ImageContainer>
                  <motion.img
                    src={slide.image}
                    alt={slide.title}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: 'spring' }}
                  />
                  <FloatingPrice
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {slide.price}
                  </FloatingPrice>
                </ImageContainer>
              </SwiperSlide>
            ))}
          </Swiper>
        </RightCol>
      </HeroGrid>

      {/* Thumbnail Slider */}
      <ThumbSliderContainer>
        <Swiper
          modules={[Controller]}
          onSwiper={setSecondSwiper}
          controller={{ control: firstSwiper }}
          spaceBetween={30}
          slidesPerView="auto"
          slideToClickedSlide={true}
          className="thumb-slider"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <ThumbCard className={activeIndex === index ? 'active' : ''}>
                <img src={slide.image} alt={slide.title} />
                <div className="info">
                  <h4>{slide.title}</h4>
                  <p>{slide.price}</p>
                </div>
              </ThumbCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </ThumbSliderContainer>
    </SliderContainer>
  );
};

export default SyncedSlider;
