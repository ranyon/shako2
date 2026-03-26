import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Card, Dropdown } from 'react-bootstrap';
import { supabase } from '../../supabaseClient';
import { ShoppingBag, CheckCircle, Clock, Package, XCircle } from 'lucide-react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
  color: var(--text-primary);
`;

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();

        // Set up real-time subscription
        const subscription = supabase
            .channel('public:orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
                if (payload.eventType === 'INSERT') {
                    setOrders(prev => [payload.new, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setOrders(prev => prev.map(order => order.id === payload.new.id ? payload.new : order));
                } else if (payload.eventType === 'DELETE') {
                    setOrders(prev => prev.filter(order => order.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching orders:', error);
        else setOrders(data);
        setLoading(false);
    };

    const updateStatus = async (orderId, newStatus) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) console.error('Error updating status:', error);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Order Received': return <Badge bg="info"><Clock size={14} className="me-1" /> Received</Badge>;
            case 'Preparing': return <Badge bg="warning" text="dark"><Package size={14} className="me-1" /> Preparing</Badge>;
            case 'Ready': return <Badge bg="primary"><CheckCircle size={14} className="me-1" /> Ready</Badge>;
            case 'Completed': return <Badge bg="success"><CheckCircle size={14} className="me-1" /> Completed</Badge>;
            case 'Cancelled': return <Badge bg="danger"><XCircle size={14} className="me-1" /> Cancelled</Badge>;
            default: return <Badge bg="secondary">{status}</Badge>;
        }
    };

    if (loading) return <div className="text-center py-5">Loading orders...</div>;

    return (
        <div className="order-manager p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><ShoppingBag className="me-2" /> Live Orders</h2>
                <Button variant="outline-light" onClick={fetchOrders} size="sm">Refresh List</Button>
            </div>

            <StyledCard className="p-0 overflow-hidden">
                <Table responsive hover variant="light" className="mb-0">
                    <thead style={{ background: 'rgba(0,0,0,0.03)' }}>
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="py-3">Customer</th>
                            <th className="py-3">Items</th>
                            <th className="py-3">Total</th>
                            <th className="py-3">Status</th>
                            <th className="py-3 text-end px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-5">No orders found yet.</td></tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                    <td className="px-4 py-3 font-monospace text-warning">{order.short_id}</td>
                                    <td className="py-3">
                                        <div className="fw-bold">{order.customer_name}</div>
                                        <div className="small text-muted">{order.customer_phone}</div>
                                    </td>
                                    <td className="py-3">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="small">
                                                {item.quantity}x {item.name}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="py-3 fw-bold">₵{parseFloat(order.total_amount).toFixed(2)}</td>
                                    <td className="py-3">{getStatusBadge(order.status)}</td>
                                    <td className="py-3 text-end px-4">
                                        <Dropdown drop="start">
                                            <Dropdown.Toggle id="dropdown-status" variant="outline-light" size="sm">
                                                Update Status
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu variant="light">
                                                <Dropdown.Item onClick={() => updateStatus(order.id, 'Order Received')}>Order Received</Dropdown.Item>
                                                <Dropdown.Item onClick={() => updateStatus(order.id, 'Preparing')}>Preparing</Dropdown.Item>
                                                <Dropdown.Item onClick={() => updateStatus(order.id, 'Ready')}>Ready</Dropdown.Item>
                                                <Dropdown.Item onClick={() => updateStatus(order.id, 'Completed')}>Completed</Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={() => updateStatus(order.id, 'Cancelled')} className="text-danger">Cancelled</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </StyledCard>
        </div>
    );
};

export default OrderManager;
