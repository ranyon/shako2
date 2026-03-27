import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarComponent from './Components/Navbar/NavBarComponent';
import HeroSection from './Components/Home/HeroSection';
import FeaturedProducts from './Components/Home/FeaturedProducts';
import Menu from './Components/Menu/Menu';
import OrderPage from './Components/order/OrderPage';
import OrderStatusPage from './Components/order/OrderStatusPage';
import UpdateOrderStatusPage from './Components/order/UpdateOrderStatusPage';
import CartPage from './Components/order/CartPage';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Footer from './Components/Footer/Footer';
import { supabase } from './supabaseClient';
import { themes } from './themes';
import './App.css';

// Import images for blurred background elements
import platter1 from './assets/platter1.png';
import platter2 from './assets/platter2.png';
import platter3 from './assets/platter3.png';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Theme Initialisation & Real-time Update
    const applyTheme = (themeKey) => {
      const theme = themes[themeKey] || themes.lush;
      Object.entries(theme.colors).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });
    };

    const fetchAndApplyTheme = async () => {
      const { data } = await supabase
        .from('store_settings')
        .select('value')
        .eq('key', 'current_theme')
        .single();

      if (data) applyTheme(data.value);
    };

    fetchAndApplyTheme();

    // Listen for theme changes
    const themeSubscription = supabase
      .channel('public:store_settings_theme')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'store_settings',
        filter: 'key=eq.current_theme'
      }, payload => {
        applyTheme(payload.new.value);
      })
      .subscribe();

    setLoading(false);

    return () => {
      supabase.removeChannel(themeSubscription);
    };
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        {/* Background elements */}
        <div className="bg-blur-element bg-blur-1"><img src={platter1} alt="" /></div>
        <div className="bg-blur-element bg-blur-2"><img src={platter2} alt="" /></div>
        <div className="bg-blur-element bg-blur-3"><img src={platter3} alt="" /></div>

        <div className="content">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={
              <>
                <div id="home">
                  <HeroSection />
                </div>
                <div id="menu">
                  <FeaturedProducts />
                </div>
              </>
            } />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/:categoryId" element={<OrderPage />} />
            <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
            <Route path="/updateorderstatus" element={<UpdateOrderStatusPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <div id="contact">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
