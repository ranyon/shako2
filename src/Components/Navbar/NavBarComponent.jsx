import React, { useState } from 'react';
import { Navbar, Container, Nav, Badge, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import './Navbar.css';
import { useOrderState } from '../order/useOrderState';

const NavbarComponent = () => {
  const { cart } = useOrderState();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="dark" variant="dark" expand={false} fixed="top" className="py-3 px-4" expanded={expanded} onToggle={setExpanded}>
      <Container fluid className="position-relative d-flex justify-content-between align-items-center">

        {/* Left: Cart */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Nav.Link as={Link} to="/order" className="position-relative d-inline-flex p-2" onClick={() => setExpanded(false)}>
            <ShoppingCart size={28} color="#ffffff" strokeWidth={1.5} />
            {cart && cart.length > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute"
                style={{ top: '0', right: '-5px', fontSize: '0.65rem', border: '2px solid #1a1a1a' }}
              >
                {cart.length}
              </Badge>
            )}
          </Nav.Link>
        </div>

        {/* Center: Brand Text Logo */}
        <Navbar.Brand as={Link} to="/" className="m-0 position-absolute start-50 translate-middle-x d-flex align-items-center" onClick={() => setExpanded(false)}>
          <span style={{
            fontSize: '2.2rem',
            fontWeight: 500,
            letterSpacing: '0px',
            color: '#FFFFFF',
            textTransform: 'none',
            fontFamily: "'Outfit', sans-serif",
            paddingTop: '5px'
          }}>
            Shako Mako
          </span>
        </Navbar.Brand>

        {/* Right: Hamburger Toggle */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-0 shadow-none p-0">
            <Menu size={32} color="#ffffff" />
          </Navbar.Toggle>
        </div>

        {/* Offcanvas Menu */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="bg-dark text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id="offcanvasNavbarLabel" className="d-none">
              Navigation Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-center pb-5">
            <Nav className="justify-content-center flex-grow-1 pe-3 text-center gap-4" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              <Nav.Link as={Link} to="/menu" className="py-3" onClick={() => setExpanded(false)}>Menu</Nav.Link>
              <Nav.Link as={Link} to="/order" className="py-3" onClick={() => setExpanded(false)}>Order</Nav.Link>
              <Nav.Link as={Link} to="/#contact" className="py-3" onClick={() => setExpanded(false)}>Contact</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
