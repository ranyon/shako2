import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Card, Modal, InputGroup } from 'react-bootstrap';
import { supabase } from '../../supabaseClient';
import { Edit3, ToggleLeft, ToggleRight, Plus, Trash2 } from 'lucide-react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
  color: var(--text-primary);
`;

const MenuManager = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        is_available: true
    });

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('id', { ascending: true });

        if (error) console.error('Error fetching menu items:', error);
        else setItems(data);
        setLoading(false);
    };

    const handleToggleAvailability = async (id, currentStatus) => {
        const { error } = await supabase
            .from('menu_items')
            .update({ is_available: !currentStatus })
            .eq('id', id);

        if (error) console.error('Error toggling availability:', error);
        else fetchMenuItems();
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            image_url: item.image_url,
            is_available: item.is_available
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (editingItem) {
            const { error } = await supabase
                .from('menu_items')
                .update(formData)
                .eq('id', editingItem.id);
            if (error) console.error('Error updating item:', error);
        } else {
            const { error } = await supabase
                .from('menu_items')
                .insert([formData]);
            if (error) console.error('Error adding item:', error);
        }

        setShowModal(false);
        fetchMenuItems();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const { error } = await supabase
                .from('menu_items')
                .delete()
                .eq('id', id);
            if (error) console.error('Error deleting item:', error);
            else fetchMenuItems();
        }
    };

    if (loading) return <div className="text-center py-5">Loading menu...</div>;

    return (
        <div className="menu-manager p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Menu Inventory</h2>
                <Button
                    variant="warning"
                    onClick={() => { setEditingItem(null); setFormData({ name: '', description: '', price: '', image_url: '', is_available: true }); setShowModal(true); }}
                >
                    <Plus size={18} className="me-2" /> Add Item
                </Button>
            </div>

            <StyledCard className="p-0 overflow-hidden">
                <Table responsive hover variant="light" className="mb-0">
                    <thead>
                        <tr>
                            <th className="px-4">Dish</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th className="text-end px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td className="px-4 py-3 align-middle">
                                    <div className="d-flex align-items-center gap-3">
                                        <img src={item.image_url} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                        <span className="fw-bold">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 align-middle text-muted small">{item.description}</td>
                                <td className="py-3 align-middle fw-bold text-warning">₵{parseFloat(item.price).toFixed(2)}</td>
                                <td className="py-3 align-middle">
                                    <Button
                                        variant="link"
                                        className="p-0 text-decoration-none"
                                        onClick={() => handleToggleAvailability(item.id, item.is_available)}
                                    >
                                        {item.is_available ?
                                            <Badge bg="success"><ToggleRight size={14} className="me-1" /> Available</Badge> :
                                            <Badge bg="secondary"><ToggleLeft size={14} className="me-1" /> Unavailable</Badge>
                                        }
                                    </Button>
                                </td>
                                <td className="py-3 text-end px-4 align-middle">
                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="outline-light" size="sm" onClick={() => handleEdit(item)}><Edit3 size={14} /></Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </StyledCard>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="glass-modal">
                <Modal.Header closeButton closeVariant="white" className="border-light bg-white text-dark">
                    <Modal.Title>{editingItem ? 'Edit Dish' : 'Add New Dish'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-white text-dark p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Dish Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Spicy Goat Jollof"
                                className="bg-transparent text-dark border-light"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea" rows={2}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="bg-transparent text-dark border-light"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price (GHS)</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-transparent text-dark border-light">₵</InputGroup.Text>
                                <Form.Control
                                    type="number" step="0.01"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    className="bg-transparent text-dark border-light"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="/src/Components/order/foodImg/..."
                                className="bg-transparent text-dark border-light"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-light bg-white">
                    <Button variant="outline-light" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="warning" onClick={handleSave}>Save Signature Item</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MenuManager;
