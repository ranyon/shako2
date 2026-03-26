import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { Users, UserPlus, DollarSign, UserMinus, Shield } from 'lucide-react';
import styled from 'styled-components';

const TeamContainer = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
  color: var(--text-primary);
  padding: 24px;
`;

const TeamManager = () => {
    const [team, setTeam] = useState([
        { id: 1, name: 'Kwame Mensah', role: 'Head Chef', rate: 45, status: 'Active', unpaidHours: 80 },
        { id: 2, name: 'Ama Serwaa', role: 'Manager', rate: 35, status: 'Active', unpaidHours: 40 },
        { id: 3, name: 'John Doe', role: 'Waiter', rate: 15, status: 'On Leave', unpaidHours: 0 },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', role: 'Waiter', rate: '' });
    const [payingId, setPayingId] = useState(null);

    const handleAddMember = () => {
        const newMember = {
            id: Date.now(),
            ...formData,
            rate: parseFloat(formData.rate) || 0,
            status: 'Active',
            unpaidHours: 0
        };
        setTeam([...team, newMember]);
        setShowModal(false);
        setFormData({ name: '', role: 'Waiter', rate: '' });
    };

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to remove this team member?')) {
            setTeam(team.filter(t => t.id !== id));
        }
    };

    const handlePay = (id, amount) => {
        setPayingId(id);
        // Simulate payment processing
        setTimeout(() => {
            setTeam(team.map(t => {
                if (t.id === id) {
                    return { ...t, unpaidHours: 0 };
                }
                return t;
            }));
            setPayingId(null);
            alert(`Payment of ₵${amount.toFixed(2)} successful!`);
        }, 1500);
    };

    return (
        <TeamContainer>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><Users className="me-2 text-info" /> Team & Payroll Management</h2>
                <Button variant="info" className="text-dark fw-bold" onClick={() => setShowModal(true)}>
                    <UserPlus size={18} className="me-2" /> Add Staff
                </Button>
            </div>

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="bg-white border-light text-center py-3">
                        <Card.Body>
                            <h6 className="text-muted text-uppercase tracking-wider">Total Staff</h6>
                            <h3 className="mb-0 fw-bold">{team.length}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-white border-light text-center py-3">
                        <Card.Body>
                            <h6 className="text-muted text-uppercase tracking-wider">Active Staff</h6>
                            <h3 className="mb-0 fw-bold text-success">{team.filter(t => t.status === 'Active').length}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-white border-light text-center py-3">
                        <Card.Body>
                            <h6 className="text-muted text-uppercase tracking-wider">Pending Payroll</h6>
                            <h3 className="mb-0 fw-bold text-warning">
                                ₵{team.reduce((sum, t) => sum + (t.rate * t.unpaidHours), 0).toFixed(2)}
                            </h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="bg-transparent border-light overflow-hidden">
                <Table responsive hover variant="light" className="mb-0">
                    <thead>
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="py-3">Role</th>
                            <th className="py-3">Hourly Rate</th>
                            <th className="py-3">Unpaid Hrs</th>
                            <th className="py-3">Due Payment</th>
                            <th className="py-3">Status</th>
                            <th className="py-3 text-end px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map(member => {
                            const duePayment = member.rate * member.unpaidHours;
                            return (
                                <tr key={member.id}>
                                    <td className="px-4 py-3 align-middle fw-bold">{member.name}</td>
                                    <td className="py-3 align-middle">
                                        <div className="d-flex align-items-center gap-2">
                                            {member.role === 'Manager' || member.role === 'Head Chef' ? <Shield size={14} className="text-warning" /> : null}
                                            {member.role}
                                        </div>
                                    </td>
                                    <td className="py-3 align-middle">₵{member.rate.toFixed(2)}/hr</td>
                                    <td className="py-3 align-middle">{member.unpaidHours}h</td>
                                    <td className="py-3 align-middle fw-bold text-warning">₵{duePayment.toFixed(2)}</td>
                                    <td className="py-3 align-middle">
                                        <Badge bg={member.status === 'Active' ? 'success' : 'secondary'}>{member.status}</Badge>
                                    </td>
                                    <td className="py-3 text-end px-4 align-middle">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Button 
                                                variant="success" 
                                                size="sm" 
                                                disabled={duePayment === 0 || payingId === member.id}
                                                onClick={() => handlePay(member.id, duePayment)}
                                            >
                                                {payingId === member.id ? <Spinner size="sm" /> : <DollarSign size={14} />} Pay
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleRemove(member.id)}>
                                                <UserMinus size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {team.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-5 text-muted">
                                    No staff members found. Add your team to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="glass-modal">
                <Modal.Header closeButton closeVariant="white" className="border-light bg-white text-dark">
                    <Modal.Title>Add Team Member</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-white text-dark p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Jane Doe"
                                className="bg-transparent text-dark border-light"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="bg-white text-dark border-light"
                                    >
                                        <option value="Manager">Manager</option>
                                        <option value="Head Chef">Head Chef</option>
                                        <option value="Chef">Chef</option>
                                        <option value="Waiter">Waiter</option>
                                        <option value="Delivery Rider">Delivery Rider</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hourly Rate (₵)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.rate}
                                        onChange={e => setFormData({ ...formData, rate: e.target.value })}
                                        placeholder="e.g., 15"
                                        className="bg-transparent text-dark border-light"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-light bg-white">
                    <Button variant="outline-light" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="info" className="text-dark fw-bold" onClick={handleAddMember} disabled={!formData.name || !formData.rate}>
                        Onboard Staff
                    </Button>
                </Modal.Footer>
            </Modal>
        </TeamContainer>
    );
};

export default TeamManager;
