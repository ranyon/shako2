import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { menuItems } from '../order/menuData';

const SectionWrapper = styled.section`
  padding: 80px 0;
  background: transparent;
  position: relative;
  z-index: 1;
`;

const ProductCard = styled(Card)`
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  transition: var(--transition-smooth);

  &:hover {
    transform: translateY(-10px);
    border-color: var(--accent-primary);
  }

  .card-img-top {
    height: 250px;
    object-fit: cover;
  }
`;

const FeaturedProducts = () => {
    // Select a few top items to feature (e.g., Seafood Platter, Pappardelle, Exotic Fruit equivalents)
    // We'll just grab the first 3 main courses for the preview
    const featured = menuItems.filter(item => item.category === 1).slice(0, 3);

    return (
        <SectionWrapper>
            <Container>
                <div className="text-center mb-5">
                    <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
                        Featured <span style={{ color: 'var(--accent-primary)' }}>Signatures</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        A taste of our most beloved culinary creations.
                    </p>
                </div>

                <Row className="g-4">
                    {featured.map((item, index) => (
                        <Col key={item.id} lg={4} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{ height: '100%' }}
                            >
                                <ProductCard>
                                    <Card.Img variant="top" src={item.image} alt={item.name} />
                                    <Card.Body className="d-flex flex-column p-4">
                                        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                            {item.name}
                                        </Card.Title>
                                        <Card.Text style={{ color: 'var(--text-muted)', flexGrow: 1 }}>
                                            {item.description}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                                                ₵{item.price.toFixed(2)}
                                            </span>
                                            <Button
                                                as={Link}
                                                to="/order"
                                                variant="outline-light"
                                                style={{ borderRadius: '100px', padding: '0.5rem 1.5rem', borderColor: 'var(--glass-border)' }}
                                            >
                                                Order Now
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </ProductCard>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                <div className="text-center mt-5">
                    <Button
                        as={Link}
                        to="/order"
                        style={{
                            background: 'var(--accent-primary)',
                            border: 'none',
                            padding: '1rem 3rem',
                            borderRadius: '100px',
                            fontSize: '1.2rem',
                            fontWeight: 600
                        }}
                    >
                        View Full Menu to Order
                    </Button>
                </div>
            </Container>
        </SectionWrapper>
    );
};

export default FeaturedProducts;
