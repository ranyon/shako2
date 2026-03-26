import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Nav, Button, Modal, Form } from 'react-bootstrap';
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Utensils, Menu as MenuIcon, Megaphone, Gift, Users, BarChart2 } from 'lucide-react';
import OrderManager from './OrderManager';
import MenuManager from './MenuManager';
import StoreSettings from './StoreSettings';
import AdCreator from './AdCreator';
import LoyaltyManager from './LoyaltyManager';
import TeamManager from './TeamManager';
import AnalyticsDashboard from './AnalyticsDashboard';
import styled from 'styled-components';

const AdminWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-white);
  color: var(--text-primary);
  padding-top: 80px;
`;

const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
  padding: 20px;

  .nav-link {
    color: rgba(255, 255, 255, 0.7);
    padding: 12px 20px;
    border-radius: 12px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-primary);
    }

    &.active {
      background: var(--accent-primary);
      color: var(--text-primary);
      box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
    }
  }
`;

const AdminDashboard = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'analytics';
    const setActiveTab = (tab) => setSearchParams({ tab });
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'shakomako2024') { // Simple shared secret for demo, can be Supabase Auth
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid admin password');
        }
    };

    if (!isAuthenticated) {
        return (
            <AdminWrapper className="d-flex align-items-center justify-content-center">
                <Modal show={true} centered contentClassName="glass-modal" backdrop="static">
                    <Modal.Body className="bg-white text-dark p-5 text-center">
                        <div className="mb-4">
                            <div className="d-inline-block p-3 rounded-circle bg-warning bg-opacity-10 mb-3">
                                <Utensils size={48} className="text-warning" />
                            </div>
                            <h2 className="fw-bold">Admin Portal</h2>
                            <p className="text-muted">Please enter the administrative password.</p>
                        </div>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="password"
                                    placeholder="Admin Password"
                                    autoFocus
                                    className="bg-transparent text-dark border-light text-center py-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error && <div className="text-danger small mt-2">{error}</div>}
                            </Form.Group>
                            <Button variant="warning" type="submit" className="w-100 py-2 fw-bold rounded-pill">
                                Enter Dashboard
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </AdminWrapper>
        );
    }

    return (
        <AdminWrapper>
            <Container fluid className="px-0">
                <Row className="g-0">
                    <Col lg={2} md={3} className="d-none d-md-block">
                        <Sidebar>
                            <h5 className="text-muted small fw-bold px-3 mb-4 uppercase tracking-wider">MANAGEMENT</h5>
                            <Nav className="flex-column">
                                <div
                                    className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('analytics')}
                                >
                                    <BarChart2 size={20} /> Overview
                                </div>
                                <div
                                    className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    <ShoppingBag size={20} /> Orders
                                </div>
                                <div
                                    className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('menu')}
                                >
                                    <MenuIcon size={20} /> Menu
                                </div>
                                <div
                                    className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('settings')}
                                >
                                    <Settings size={20} /> Settings
                                </div>
                                <div
                                    className={`nav-link ${activeTab === 'ad-creator' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('ad-creator')}
                                >
                                    <Megaphone size={20} /> Promotions
                                </div>
                                <div
                                    className={`nav-link ${activeTab === 'loyalty' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('loyalty')}
                                >
                                    <Gift size={20} /> Loyalty
                                </div>
                                <div
                                    className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('team')}
                                >
                                    <Users size={20} /> Team
                                </div>
                            </Nav>

                            <div className="mt-auto pt-5">
                                <Button variant="outline-danger" className="w-100 rounded-pill d-flex align-items-center justify-content-center gap-2" onClick={() => setIsAuthenticated(false)}>
                                    <LogOut size={16} /> Logout
                                </Button>
                            </div>
                        </Sidebar>
                    </Col>

                    <Col lg={10} md={9} xs={12}>
                        <div className="admin-content min-vh-100 p-2 p-md-4">
                            {activeTab === 'analytics' && <AnalyticsDashboard />}
                            {activeTab === 'orders' && <OrderManager />}
                            {activeTab === 'menu' && <MenuManager />}
                            {activeTab === 'settings' && <StoreSettings />}
                            {activeTab === 'ad-creator' && <AdCreator />}
                            {activeTab === 'loyalty' && <LoyaltyManager />}
                            {activeTab === 'team' && <TeamManager />}
                        </div>
                    </Col>
                </Row>
            </Container>
        </AdminWrapper>
    );
};

export default AdminDashboard;
