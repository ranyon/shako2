import React, { useState } from 'react';
import { Card, Table, Button, Form, Modal, Badge } from 'react-bootstrap';
import { Gift, Plus, Trash2, Copy, CheckCircle } from 'lucide-react';
import styled from 'styled-components';

const LoyaltyContainer = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
  color: var(--text-primary);
  padding: 24px;
`;

const LoyaltyManager = () => {
    const [vouchers, setVouchers] = useState([
        { id: 1, code: 'WELCOME10', discount: '10%', type: 'percentage', expires: '2026-12-31', active: true },
        { id: 2, code: 'FREEDRINK', discount: 'Free Drink', type: 'item', expires: '2026-06-30', active: true },
        { id: 3, code: 'SHAKO50', discount: '₵50 Off', type: 'fixed', expires: '2026-08-15', active: false },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [formData, setFormData] = useState({ code: '', discount: '', type: 'percentage', expires: '' });

    const handleCopy = (id, code) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this voucher?')) {
            setVouchers(vouchers.filter(v => v.id !== id));
        }
    };

    const handleSave = () => {
        const newVoucher = {
            id: Date.now(),
            ...formData,
            active: true
        };
        setVouchers([...vouchers, newVoucher]);
        setShowModal(false);
        setFormData({ code: '', discount: '', type: 'percentage', expires: '' });
    };

    return (
        <LoyaltyContainer>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><Gift className="me-2 text-warning" /> Loyalty & Vouchers</h2>
                <Button variant="warning" onClick={() => setShowModal(true)}>
                    <Plus size={18} className="me-2" /> Create Voucher
                </Button>
            </div>

            <Card className="bg-white border-secondary overflow-hidden text-dark shadow-sm">
                <Table responsive hover variant="light" className="mb-0">
                    <thead className="bg-light text-dark">
                        <tr>
                            <th className="px-4 py-3">Promo Code</th>
                            <th className="py-3">Discount Value</th>
                            <th className="py-3">Type</th>
                            <th className="py-3">Expires On</th>
                            <th className="py-3">Status</th>
                            <th className="py-3 text-end px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map(voucher => (
                            <tr key={voucher.id}>
                                <td className="px-4 py-3 align-middle">
                                    <div className="d-flex align-items-center gap-2">
                                        <Badge bg="dark" className="fs-6 py-2 px-3 text-monospace" style={{ letterSpacing: '2px' }}>
                                            {voucher.code}
                                        </Badge>
                                        <Button variant="link" size="sm" className="text-secondary p-0 ms-2" onClick={() => handleCopy(voucher.id, voucher.code)}>
                                            {copiedId === voucher.id ? <CheckCircle size={16} className="text-success" /> : <Copy size={16} />}
                                        </Button>
                                    </div>
                                </td>
                                <td className="py-3 align-middle fw-bold">{voucher.discount}</td>
                                <td className="py-3 align-middle text-capitalize">{voucher.type}</td>
                                <td className="py-3 align-middle text-muted">{new Date(voucher.expires).toLocaleDateString()}</td>
                                <td className="py-3 align-middle">
                                    {voucher.active ? <Badge bg="success">Active</Badge> : <Badge bg="danger">Expired</Badge>}
                                </td>
                                <td className="py-3 text-end px-4 align-middle">
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(voucher.id)}>
                                        <Trash2 size={14} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {vouchers.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-5 text-muted">
                                    No active vouchers found. Create one to reward your customers!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="glass-modal">
                <Modal.Header closeButton closeVariant="dark" className="border-bottom bg-white text-dark">
                    <Modal.Title>Create New Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-white text-dark p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Promo Code</Form.Label>
                            <Form.Control
                                type="text"
                                style={{textTransform: 'uppercase'}}
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="e.g., SUMMER20"
                                className="bg-transparent text-dark border-secondary fw-bold"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Discount Type</Form.Label>
                                    <Form.Select
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        className="bg-white text-dark border-secondary"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (₵)</option>
                                        <option value="item">Free Item</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.discount}
                                        onChange={e => setFormData({ ...formData, discount: e.target.value })}
                                        placeholder="e.g., 20% or ₵50"
                                        className="bg-transparent text-dark border-secondary"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.expires}
                                onChange={e => setFormData({ ...formData, expires: e.target.value })}
                                className="bg-transparent text-dark border-secondary"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-top bg-white">
                    <Button variant="outline-dark" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="warning" onClick={handleSave} disabled={!formData.code || !formData.discount || !formData.expires}>
                        Generate Voucher
                    </Button>
                </Modal.Footer>
            </Modal>
        </LoyaltyContainer>
    );
};

export default LoyaltyManager;
