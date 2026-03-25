import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { supabase } from '../../supabaseClient';
import { Settings, Save, Smartphone, Clock, Power, Palette, CheckCircle } from 'lucide-react';
import { themes } from '../../themes';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  color: white;
  margin-bottom: 24px;
`;

const StoreSettings = () => {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const { data, error } = await supabase
            .from('store_settings')
            .select('*');

        if (error) console.error('Error fetching settings:', error);
        else {
            const settingsMap = {};
            data.forEach(s => settingsMap[s.key] = s.value);
            setSettings(settingsMap);
        }
        setLoading(false);
    };

    const updateSetting = async (key, value) => {
        setSaving(true);
        setMessage(null);

        const { error } = await supabase
            .from('store_settings')
            .upsert({
                key: key,
                value: String(value),
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error(`Error updating ${key}:`, error);
            setMessage({
                type: 'danger',
                text: `Database Error: ${error.message}. Make sure you've run the SQL script in Supabase.`
            });
        } else {
            setSettings(prev => ({ ...prev, [key]: value }));
            setMessage({ type: 'success', text: `Successfully updated ${key.replace(/_/g, ' ')}!` });
            setTimeout(() => setMessage(null), 3000);
        }
        setSaving(false);
    };

    if (loading) return <div className="text-center py-5">Loading settings...</div>;

    return (
        <div className="store-settings p-4" style={{ maxWidth: '800px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><Settings className="me-2" /> Store Settings</h2>
            </div>

            {message && <Alert variant={message.type} className="mb-4">{message.text}</Alert>}

            <StyledCard className="p-4">
                <h5 className="mb-4 d-flex align-items-center gap-2">
                    <Palette size={20} className="text-warning" /> Visual Identity (Theme)
                </h5>
                <Row className="g-3">
                    {Object.entries(themes).map(([key, theme]) => (
                        <Col key={key} sm={4}>
                            <div
                                className={`p-3 rounded-3 border-2 cursor-pointer transition-all ${settings.current_theme === key ? 'border-warning bg-warning bg-opacity-10' : 'border-secondary'}`}
                                style={{
                                    border: '2px solid',
                                    cursor: 'pointer',
                                    background: settings.current_theme === key ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.02)'
                                }}
                                onClick={() => updateSetting('current_theme', key)}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fw-bold small">{theme.name}</span>
                                    {settings.current_theme === key && <CheckCircle size={16} className="text-warning" />}
                                </div>
                                <div className="d-flex gap-1 h-10px">
                                    <div style={{ flex: 1, height: '10px', background: theme.colors['--bg-primary'], borderRadius: '2px' }} />
                                    <div style={{ flex: 1, height: '10px', background: theme.colors['--accent-primary'], borderRadius: '2px' }} />
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </StyledCard>

            <StyledCard className="p-4">
                <h5 className="mb-4 d-flex align-items-center gap-2">
                    <Smartphone size={20} className="text-warning" /> Payment Information
                </h5>
                <Form.Group className="mb-3">
                    <Form.Label>Business MoMo Number</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={settings.business_momo || ''}
                            onChange={e => setSettings({ ...settings, business_momo: e.target.value })}
                            className="bg-transparent text-white border-secondary"
                        />
                        <Button
                            variant="warning"
                            onClick={() => updateSetting('business_momo', settings.business_momo)}
                            disabled={saving}
                        >
                            <Save size={18} />
                        </Button>
                    </InputGroup>
                    <Form.Text className="text-secondary">This number will be displayed to customers during checkout.</Form.Text>
                </Form.Group>
            </StyledCard>

            <Row>
                <Col md={6}>
                    <StyledCard className="p-4 h-100">
                        <h5 className="mb-4 d-flex align-items-center gap-2">
                            <Clock size={20} className="text-warning" /> Operating Hours
                        </h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={settings.opening_time || ''}
                                onChange={e => setSettings({ ...settings, opening_time: e.target.value })}
                                className="bg-transparent text-white border-secondary mb-3"
                            />
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={settings.closing_time || ''}
                                onChange={e => setSettings({ ...settings, closing_time: e.target.value })}
                                className="bg-transparent text-white border-secondary"
                            />
                            <Button
                                variant="outline-warning"
                                className="w-100 mt-4"
                                onClick={() => {
                                    updateSetting('opening_time', settings.opening_time);
                                    updateSetting('closing_time', settings.closing_time);
                                }}
                                disabled={saving}
                            >
                                Save Hours
                            </Button>
                        </Form.Group>
                    </StyledCard>
                </Col>
                <Col md={6}>
                    <StyledCard className="p-4 h-100">
                        <h5 className="mb-4 d-flex align-items-center gap-2">
                            <Power size={20} className="text-warning" /> Store Status
                        </h5>
                        <div className="d-flex flex-column align-items-center justify-content-center py-3">
                            <div className={`mb-3 p-3 rounded-circle ${settings.is_restaurant_open === 'true' ? 'bg-success' : 'bg-danger'} bg-opacity-10`}>
                                <Power size={48} className={settings.is_restaurant_open === 'true' ? 'text-success' : 'text-danger'} />
                            </div>
                            <h4 className="mb-3">{settings.is_restaurant_open === 'true' ? 'Open for Business' : 'Store Closed'}</h4>
                            <Button
                                variant={settings.is_restaurant_open === 'true' ? 'danger' : 'success'}
                                className="w-100 rounded-pill"
                                onClick={() => updateSetting('is_restaurant_open', settings.is_restaurant_open === 'true' ? 'false' : 'true')}
                                disabled={saving}
                            >
                                {settings.is_restaurant_open === 'true' ? 'Close Restaurant Now' : 'Open Restaurant Now'}
                            </Button>
                        </div>
                    </StyledCard>
                </Col>
            </Row>
        </div>
    );
};

export default StoreSettings;
