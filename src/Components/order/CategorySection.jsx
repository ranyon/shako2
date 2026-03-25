import React from 'react';
import { motion } from 'framer-motion';

const CategorySection = ({ categories, selectedCategory, handleCategoryChange }) => {
  return (
    <div className="category-section-container">
      <motion.div
        className="category-strip"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default CategorySection;