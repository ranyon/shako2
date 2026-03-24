import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, menuItems } from '../order/menuData';
import { ArrowRight, ListFilter } from 'lucide-react';

// Import representative images for categories
import MainCourseImg from '../order/foodImg/maxiWaakye.png';
import SideCourseImg from '../order/foodImg/frenchFries.png';
import SaladsImg from '../order/foodImg/beefShawarma.png';
import DrinksImg from '../order/foodImg/freshPineapple.png';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 120px 0 80px;
  background-color: var(--bg-overlay, transparent);
  position: relative;
  z-index: 1;
`;

/* --- Filter Strip Styling --- */
const FilterSection = styled.div`
  margin-bottom: 60px;
`;

const FilterStrip = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 5px 30px; /* Extra bottom padding for shadows */
  margin: 0 -15px; /* Pull out to edge on mobile */
  padding-left: 15px;
  padding-right: 15px;
  
  /* Modern hidden scrollbar */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;

const FilterCard = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px 15px 15px;
  background: var(--glass-bg, rgba(30, 30, 30, 0.5));
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.$isActive ? 'var(--accent-primary)' : 'var(--glass-border, rgba(255, 255, 255, 0.1))'};
  border-radius: 50px; /* Pill shape */
  color: white;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;

  box-shadow: ${props => props.$isActive ? '0 10px 25px rgba(255, 107, 0, 0.3)' : '0 4px 15px rgba(0,0,0,0.1)'};
  transform: ${props => props.$isActive ? 'translateY(-5px)' : 'none'};

  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-primary);
    background: rgba(40, 40, 40, 0.8);
  }

  .cat-img-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;

    /* If it's the "All" button icon */
    svg {
      color: ${props => props.$isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'};
    }
  }

  .cat-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.1);
  }

  .cat-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    color: ${props => props.$isActive ? 'white' : 'var(--text-secondary)'};
  }
`;

/* --- Menu Grid Styling --- */
const CategorySectionWrapper = styled.div`
  margin-bottom: 80px;
`;

const CategoryHeader = styled.div`
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h2 {
    color: var(--text-primary);
    font-weight: 800;
    font-size: 2.2rem;
    margin: 0;
  }

  .explore-link {
    font-size: 1rem;
    color: var(--accent-primary);
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    padding: 8px 16px;
    background: rgba(255, 107, 0, 0.05);
    border-radius: 30px;
    
    &:hover {
      background: rgba(255, 107, 0, 0.15);
      transform: translateX(5px);
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    
    .explore-link {
      padding: 0;
      background: none;
    }
  }
`;

const MenuItemCard = styled.div`
  background: var(--glass-bg, rgba(30, 30, 30, 0.5));
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 107, 0, 0.2);
  }

  .img-container {
    width: 100%;
    height: 220px;
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s ease;
    }
  }

  &:hover .img-container img {
    transform: scale(1.08);
  }

  .details {
    padding: 25px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    h3 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 12px;
      line-height: 1.3;
    }

    p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      flex-grow: 1;
      margin-bottom: 25px;
      line-height: 1.6;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);

      .price {
        color: var(--accent-primary);
        font-weight: 800;
        font-size: 1.25rem;
      }

      .order-btn {
        background: rgba(255, 107, 0, 0.1);
        color: var(--accent-primary);
        text-decoration: none;
        padding: 8px 20px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 107, 0, 0.2);

        &:hover {
          background: var(--accent-primary);
          color: white;
          box-shadow: 0 5px 15px rgba(255, 107, 0, 0.4);
          border-color: var(--accent-primary);
        }
      }
    }
  }
`;

const getCategoryImage = (categoryId) => {
  switch (categoryId) {
    case 1: return MainCourseImg;
    case 2: return SideCourseImg;
    case 3: return SaladsImg;
    case 4: return DrinksImg;
    default: return MainCourseImg;
  }
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter categories based on selection
  const visibleCategories = activeCategory === 'All'
    ? categories
    : categories.filter(c => c.id === activeCategory);

  return (
    <PageWrapper>
      <Container>
        <div className="text-center mb-5 pb-2">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '3.5rem', fontWeight: 800 }}
          >
            The <span style={{ color: 'var(--accent-primary)' }}>Menu</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
          >
            Filter by category or explore all our mouth-watering offerings.
          </motion.p>
        </div>

        {/* Visual Filter Strip */}
        <FilterSection>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FilterStrip>
              <FilterCard
                $isActive={activeCategory === 'All'}
                onClick={() => setActiveCategory('All')}
              >
                <div className="cat-img-wrapper">
                  <ListFilter size={24} />
                </div>
                <h3 className="cat-title">Explore All</h3>
              </FilterCard>

              {categories.map(category => (
                <FilterCard
                  key={category.id}
                  $isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div className="cat-img-wrapper">
                    <img
                      src={getCategoryImage(category.id)}
                      alt={category.name}
                      className="cat-img"
                    />
                  </div>
                  <h3 className="cat-title">{category.name}</h3>
                </FilterCard>
              ))}
            </FilterStrip>
          </motion.div>
        </FilterSection>

        {/* Menu Items Grids */}
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((category) => {
            const itemsInCategory = menuItems.filter(item => item.category === category.id);
            if (itemsInCategory.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4 }}
              >
                <CategorySectionWrapper>
                  <CategoryHeader>
                    <h2>{category.name}</h2>
                    <Link to={`/order/${category.id}`} className="explore-link">
                      Order from {category.name} <ArrowRight size={18} />
                    </Link>
                  </CategoryHeader>

                  <Row className="g-4">
                    {itemsInCategory.map((item, itemIndex) => (
                      <Col key={item.id} xl={3} lg={4} md={6} xs={12}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                          style={{ height: '100%' }}
                        >
                          <MenuItemCard>
                            <div className="img-container">
                              <img
                                src={item.image}
                                alt={item.name}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            </div>
                            <div className="details">
                              <h3>{item.name}</h3>
                              <p>{item.description}</p>
                              <div className="footer">
                                <span className="price">₵{item.price.toFixed(2)}</span>
                                <Link to={`/order/${category.id}`} className="order-btn">
                                  Order
                                </Link>
                              </div>
                            </div>
                          </MenuItemCard>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </CategorySectionWrapper>
              </motion.div>
            );
          })}
        </AnimatePresence>

      </Container>
    </PageWrapper>
  );
};

export default Menu;