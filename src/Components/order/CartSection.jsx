import React from 'react';
import { ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSection = ({
  cart,
  addToCart,
  removeFromCart,
  getTotalPrice,
  setShowModal
}) => {
  return (
    <motion.div
      className="premium-cart-sidebar"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="cart-header">
        <ShoppingBag size={24} color="var(--accent-primary)" />
        <span>Your Order</span>
      </div>

      <div className="cart-items-container">
        {cart.length === 0 ? (
          <div className="empty-cart-msg">
            <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '15px' }} />
            <p>Your bag is hungry.</p>
          </div>
        ) : (
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
                    ₵{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                <div className="cart-controls">
                  <button className="qty-btn minus" onClick={() => removeFromCart(item)}>
                    <Minus size={14} />
                  </button>
                  <span className="qty-text">{item.quantity}</span>
                  <button className="qty-btn plus" onClick={() => addToCart(item)}>
                    <Plus size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="cart-total-section">
        <div className="total-row">
          <span style={{ fontWeight: 500 }}>Total</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>
            ₵{getTotalPrice()}
          </span>
        </div>

        <button
          className="checkout-btn"
          onClick={() => setShowModal(true)}
          disabled={cart.length === 0}
        >
          Checkout <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'text-bottom' }} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartSection;