import React from 'react';
import './SplashScreen.css';
import splashImage from '../../assets/logo.png';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={splashImage} alt="Splash Screen" className="splash-image" />
    </div>
  );
};

export default SplashScreen;
