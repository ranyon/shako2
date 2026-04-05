import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { TrendingUp, ShoppingBag, Users, DollarSign, Activity } from 'lucide-react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
  color: var(--text-primary);
  padding: 24px;
`;

const StatCard = styled(Card)`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-primary);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 107, 0, 0.1);
    color: var(--accent-primary);
    margin-bottom: 16px;
  }
`;

const AnalyticsDashboard = () => {
    // Mock Data
    const stats = [
        { title: 'Total Revenue', value: '₵24,500', trend: '+12.5%', icon: DollarSign },
        { title: 'Total Orders', value: '1,245', trend: '+8.2%', icon: ShoppingBag },
        { title: 'New Customers', value: '342', trend: '+15.3%', icon: Users },
        { title: 'Avg. Order Value', value: '₵120', trend: '-2.1%', icon: Activity },
    ];

    const topItems = [
        { name: 'Spicy Goat Jollof', sales: 450, revenue: 11250 },
        { name: 'Shako Mako Signature Burger', sales: 320, revenue: 4800 },
        { name: 'Fried Rice & Chicken', sales: 280, revenue: 4200 },
        { name: 'Plantain with Beans Stew', sales: 150, revenue: 1500 },
    ];

    const maxSales = Math.max(...topItems.map(item => item.sales));

    return (
        <DashboardContainer>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h2 className="mb-1 text-dark"><TrendingUp className="me-2 text-warning" /> Business Overview</h2>
                    <p className="text-muted mb-0">Track your restaurant's performance across all metrics.</p>
                </div>
            </div>

            <Row className="g-4 mb-5">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const isPositive = stat.trend.startsWith('+');
                    return (
                        <Col lg={3} md={6} key={index}>
                            <StatCard className="h-100">
                                <Card.Body className="p-4">
                                    <div className="icon-wrapper">
                                        <Icon size={24} />
                                    </div>
                                    <h6 className="text-muted mb-2">{stat.title}</h6>
                                    <h3 className="fw-bold mb-3 text-dark">{stat.value}</h3>
                                    <div className={`small fw-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                                        {stat.trend} <span className="text-muted fw-normal">vs last month</span>
                                    </div>
                                </Card.Body>
                            </StatCard>
                        </Col>
                    );
                })}
            </Row>

            <Row className="g-4">
                <Col lg={8}>
                    <Card className="bg-white border-light h-100 shadow-sm">
                        <Card.Header className="border-light bg-light text-dark fw-bold py-3">Top Performing Items</Card.Header>
                        <Card.Body className="p-4">
                            {topItems.map((item, index) => (
                                <div key={index} className="mb-4 last-mb-0">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                        <div>
                                            <div className="fw-bold mb-1 text-dark">{item.name}</div>
                                            <div className="text-muted small">{item.sales} orders</div>
                                        </div>
                                        <div className="fw-bold text-warning">₵{item.revenue.toLocaleString()}</div>
                                    </div>
                                    <ProgressBar 
                                        now={(item.sales / maxSales) * 100} 
                                        variant="warning" 
                                        style={{ height: '6px', backgroundColor: '#f0f0f0' }} 
                                    />
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="bg-white border-light h-100 shadow-sm">
                        <Card.Header className="border-light bg-light text-dark fw-bold py-3">Recent Activity</Card.Header>
                        <Card.Body className="p-4 text-dark">
                            <div className="d-flex gap-3 mb-4">
                                <div className="mt-1"><div className="rounded-circle bg-success p-2"></div></div>
                                <div>
                                    <p className="mb-1 fw-bold">New order #892</p>
                                    <p className="small text-muted mb-0">Just now • ₵150.00</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mb-4">
                                <div className="mt-1"><div className="rounded-circle bg-primary p-2"></div></div>
                                <div>
                                    <p className="mb-1 fw-bold">Staff Onboarded</p>
                                    <p className="small text-muted mb-0">15 mins ago • Jane Doe</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mb-4">
                                <div className="mt-1"><div className="rounded-circle bg-warning p-2"></div></div>
                                <div>
                                    <p className="mb-1 fw-bold">Low Stock Alert</p>
                                    <p className="small text-muted mb-0">1 hr ago • Plantain</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3">
                                <div className="mt-1"><div className="rounded-circle bg-info p-2"></div></div>
                                <div>
                                    <p className="mb-1 fw-bold">Promo Code Used</p>
                                    <p className="small text-muted mb-0">2 hrs ago • WELCOME10</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </DashboardContainer>
    );
};

export default AnalyticsDashboard;
