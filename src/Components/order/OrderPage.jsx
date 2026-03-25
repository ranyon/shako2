import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

// Components
import CategorySection from './CategorySection';
import MenuItemsSection from './MenuItemsSection';
import CartSection from './CartSection';
import PaymentModal from './PaymentModal';
import FloatingCartButton from './FloatingCartButton';
import BackToTopButton from './BackToTopButton';
import CountdownTimer from './CountdownTimer';

// Hooks
import { useOrderState } from './useOrderState';
import { useOrderHandlers } from './useOrderHandler';
// Data
import { categories as defaultCategories, menuItems as defaultMenuItems } from './menuData';
import { supabase } from '../../supabaseClient';

// Styles
import './OrderPage.css';

const BUSINESS_MOMO = "0598942315";

const OrderPage = () => {
  const { categoryId } = useParams();
  const orderState = useOrderState(categoryId);
  const { handlePayment, handleAddToCart, handleRemoveFromCart, calculateTotal } = useOrderHandlers(orderState);
  const [showThankYou, setShowThankYou] = useState(false);

  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [categories, setCategories] = useState(defaultCategories);
  const [storeSettings, setStoreSettings] = useState({
    business_momo: "0598942315",
    opening_time: '10:00:00',
    closing_time: '21:30:00',
    is_restaurant_open: 'true'
  });

  const [isClosed, setIsClosed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(storeSettings.closing_time));

  const {
    selectedCategory,
    searchTerm,
    orderPlaced,
    cart,
    showModal,
    customerPhone,
    network,
    transactionId,
    deliveryLocation,
    errorMessage,
    isSubmitting,
    handleCategoryChange,
    setSearchTerm,
    setOrderPlaced,
    setShowModal,
    setCustomerPhone,
    setNetwork,
    setTransactionId,
    setDeliveryLocation,
    orderId,
    setOrderId,
    clearCart
  } = orderState;

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Store Settings
      const { data: settingsData } = await supabase.from('store_settings').select('*');
      if (settingsData) {
        const settingsMap = {};
        settingsData.forEach(s => settingsMap[s.key] = s.value);
        setStoreSettings(prev => ({ ...prev, ...settingsMap }));
      }

      // Fetch Menu Items
      const { data: dbMenuItems } = await supabase.from('menu_items').select('*').eq('is_available', true);
      if (dbMenuItems && dbMenuItems.length > 0) {
        const formattedItems = dbMenuItems.map(item => ({
          ...item,
          category: item.category_id, // Map database field to component field
          price: parseFloat(item.price)
        }));
        setMenuItems(formattedItems);
      }
    };

    fetchData();

    const checkOpeningHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour * 60 + currentMinute;

      const [oHour, oMin] = (storeSettings.opening_time || '10:00:00').split(':').map(Number);
      const [cHour, cMin] = (storeSettings.closing_time || '21:30:00').split(':').map(Number);

      const openingTimeMinutes = oHour * 60 + oMin;
      const closingTimeMinutes = cHour * 60 + cMin;

      if (storeSettings.is_restaurant_open === 'false' || currentTime < openingTimeMinutes || currentTime >= closingTimeMinutes) {
        setIsClosed(true);
      } else {
        setIsClosed(false);
      }
    };

    checkOpeningHours();
    const interval = setInterval(checkOpeningHours, 60000);
    return () => clearInterval(interval);
  }, [storeSettings.opening_time, storeSettings.closing_time, storeSettings.is_restaurant_open]);

  useEffect(() => {
    if (categoryId) {
      handleCategoryChange(parseInt(categoryId));
    }
  }, [categoryId, handleCategoryChange]);

  useEffect(() => {
    if (orderPlaced) {
      setShowThankYou(true);
    }
  }, [orderPlaced]);

  const handleDismissThankYou = () => {
    setShowThankYou(false);
    setOrderPlaced(false);
  };

  const filteredMenuItems = menuItems.filter(item =>
    (item.category === selectedCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(storeSettings.closing_time);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.hours === undefined) {
        setIsClosed(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [storeSettings.closing_time]);

  function calculateTimeLeft(closingTime) {
    const now = new Date();
    const closingDate = new Date(now.toDateString() + ' ' + closingTime);
    if (now > closingDate) {
      closingDate.setDate(closingDate.getDate() + 1);
    }
    const difference = closingDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  return (
    <div className="order-page-wrapper pt-5 pb-5">
      <Container className="pt-5 mt-4">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center mb-4" style={{ color: 'var(--text-primary)', fontWeight: 800, fontFamily: "'Outfit', sans-serif", fontSize: '3rem' }}>
            Find Your Flavor.
          </h1>
        </motion.div>

        <CountdownTimer closingTime={closingTime} />

        {showThankYou && (
          <Alert variant="success" className="text-center mb-4" onClose={handleDismissThankYou} dismissible style={{ background: 'rgba(25, 135, 84, 0.1)', border: '1px solid rgba(25, 135, 84, 0.3)', color: '#a3f0c3' }}>
            <h4 className="alert-heading">Order Confirmed!</h4>
            <p>Your delicious meal is being prepared.</p>
            <p className="mb-0"><strong>Order ID:</strong> {orderId}</p>
          </Alert>
        )}

        {isClosed ? (
          <Alert variant="danger" className="text-center mb-4" style={{ background: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.3)', color: '#ffb3b8' }}>
            <h4 className="alert-heading">Restaurant Closed</h4>
            <p>{storeSettings.is_restaurant_open === 'false' ? 'We are currently not taking orders.' : `We are currently closed. Please check back at ${storeSettings.opening_time}.`}</p>
          </Alert>
        ) : (
          <div className="order-layout-grid mt-4">

            {/* Left Area: Categories & Items */}
            <div className="order-main-content">
              <CategorySection
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
              />
              <MenuItemsSection
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredMenuItems={filteredMenuItems}
                addToCart={handleAddToCart}
              />
            </div>

            {/* Right Area: Sticky Cart Sidebar */}
            <div className="order-sidebar">
              <CartSection
                cart={cart}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                getTotalPrice={calculateTotal}
                setShowModal={setShowModal}
              />
            </div>

          </div>
        )}

        {/* Modals & Prompts */}
        <PaymentModal
          showModal={showModal}
          setShowModal={setShowModal}
          errorMessage={errorMessage}
          getTotalPrice={calculateTotal}
          BUSINESS_MOMO={storeSettings.business_momo}
          network={network}
          setNetwork={setNetwork}
          customerPhone={customerPhone}
          setCustomerPhone={setCustomerPhone}
          handlePayment={handlePayment}
          isSubmitting={isSubmitting}
          cartItems={cart}
          orderId={orderId}
          setOrderId={setOrderId}
          setOrderPlaced={setOrderPlaced}
          clearCart={clearCart}
        />

        <FloatingCartButton cart={cart} totalPrice={calculateTotal()} />
        <BackToTopButton />
      </Container>
    </div>
  );
};

export default OrderPage;
