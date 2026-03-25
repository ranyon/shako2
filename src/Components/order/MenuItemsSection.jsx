import React from 'react';
import { Form } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const MenuItemsSection = ({
  searchTerm,
  setSearchTerm,
  filteredMenuItems,
  addToCart
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Form.Control
          type="text"
          placeholder="Search for your cravings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="premium-search"
        />
      </motion.div>

      <div className="menu-items-grid">
        {filteredMenuItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="premium-product-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="product-image-container">
              {/* Fallback pattern if no image */}
              <img src={item.image} alt={item.name} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>

            <div className="product-details">
              <h3 className="product-name" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.name}</h3>
              <p className="product-desc">{item.description}</p>

              <div className="product-footer">
                <span className="product-price" style={{ fontFamily: "'Outfit', sans-serif" }}>₵{item.price.toFixed(2)}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="add-btn"
                  onClick={() => addToCart(item)}
                  title="Add to Order"
                >
                  <Plus size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMenuItems.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 0' }}>
          <h4>No items found</h4>
          <p>Try searching for something else, or select another category.</p>
        </div>
      )}
    </>
  );
};

export default MenuItemsSection;