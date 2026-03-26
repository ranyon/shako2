import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import Logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="text-dark py-5 mt-5" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <Container>
        <Row className="gy-5">
          {/* Brand Info */}
          <Col lg={4} md={6}>
            <div className="mb-4">
              <Link to="/">
                <img src={Logo} alt="Shako Mako Logo" height="60" style={{ width: 'auto' }} />
              </Link>
            </div>
            <p className="text-dark mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '300px' }}>
              Experience the authentic taste of tradition carefully crafted with premium ingredients and passion at Shako Mako.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark hover-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-dark hover-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-dark hover-white transition"><Facebook size={20} /></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h5 className="text-dark mb-4" style={{ fontWeight: 600, letterSpacing: '1px' }}>Explore</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li><Link to="/menu" className="text-dark text-decoration-none hover-white transition">Full Menu</Link></li>
              <li><Link to="/#contact" className="text-dark text-decoration-none hover-white transition">Contact Us</Link></li>
              <li className="mt-2">
                <Link to="/order" className="btn btn-primary d-inline-flex align-items-center justify-content-center text-dark" style={{ backgroundColor: 'var(--accent-primary)', border: 'none', padding: '0.6rem 1.5rem', fontWeight: 600, borderRadius: '8px' }}>
                  Order Now
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <h5 className="text-dark mb-4" style={{ fontWeight: 600, letterSpacing: '1px' }}>Contact</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 text-dark">
              <li className="d-flex align-items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" color="var(--accent-primary)" />
                <span>123 Osu Oxford St, Accra, Ghana</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={18} color="var(--accent-primary)" />
                <span>+233 24 123 4567</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Mail size={18} color="var(--accent-primary)" />
                <span>hello@shakomako.com</span>
              </li>
            </ul>
          </Col>

          {/* Newsletter / CTA */}
          <Col lg={3} md={6}>
            <h5 className="text-dark mb-4" style={{ fontWeight: 600, letterSpacing: '1px' }}>Stay Updated</h5>
            <p className="text-dark mb-3" style={{ fontSize: '0.9rem' }}>Subscribe for exclusive tasting events and secret menu drops.</p>
            <Form className="d-flex gap-2">
              <Form.Control
                type="email"
                placeholder="Email address"
                className="bg-transparent text-dark shadow-none"
                style={{ border: '1px solid rgba(0,0,0,0.1)' }}
              />
              <Button style={{ backgroundColor: 'var(--accent-primary)', border: 'none' }}>
                Join
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <span className="text-dark" style={{ fontSize: '0.85rem' }}>
              &copy; {new Date().getFullYear()} Shako Mako. All rights reserved.
            </span>
          </Col>
          <Col md={6} className="text-center text-md-end text-dark d-flex gap-3 justify-content-center justify-content-md-end" style={{ fontSize: '0.85rem' }}>
            <a href="#" className="text-dark text-decoration-none hover-white transition">Privacy Policy</a>
            <a href="#" className="text-dark text-decoration-none hover-white transition">Terms of Service</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;