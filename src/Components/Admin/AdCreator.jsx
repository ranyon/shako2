import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Download, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

const AdContainer = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
  color: var(--text-primary);
  padding: 24px;
`;

// Represents a 1080x1080 instagram post scale
const AdPreviewCard = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #111;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    filter: blur(8px) brightness(0.5);
    z-index: 1;
  }

  .content-wrapper {
    position: relative;
    z-index: 2;
    padding: 30px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .product-image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    
    img.main-product {
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
        border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        border: 2px solid rgba(255, 107, 0, 0.3);
    }
  }

  .text-content {
      text-align: center;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      padding: 20px;
      border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-soft);
      border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .product-name {
    font-size: 2rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 8px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .product-desc {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }

  .product-price {
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--accent-primary);
    text-shadow: 0 0 20px rgba(255, 107, 0, 0.4);
  }

  .branding {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 10px;

      img {
          width: 40px;
          height: 40px;
      }
      
      span {
          font-weight: bold;
          font-size: 1.2rem;
          color: var(--text-primary);
          letter-spacing: 2px;
      }
  }
  
  .badge-new {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--accent-primary);
      color: var(--text-primary);
      padding: 8px 16px;
      border-radius: 30px;
      font-weight: bold;
      z-index: 3;
      text-transform: uppercase;
      font-size: 0.9rem;
      box-shadow: 0 4px 15px rgba(255,107,0,0.4);
  }
`;

const AdCreator = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const adRef = useRef(null);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching menu items:', error);
        } else {
            setItems(data);
            if (data.length > 0) setSelectedItem(data[0]);
        }
        setLoading(false);
    };

    const handleItemChange = (e) => {
        const itemId = e.target.value;
        const item = items.find(i => i.id.toString() === itemId);
        setSelectedItem(item);
    };

    const downloadAd = async () => {
        if (!adRef.current) return;
        
        try {
            setIsGenerating(true);
            
            // Temporary styles to ensure high quality render
            const element = adRef.current;
            element.style.width = '1080px';
            element.style.height = '1080px';
            element.style.position = 'fixed';
            element.style.top = '-9999px';
            element.style.left = '-9999px';
            
            // Append temporarily to body to bypass any container scale/overflow issues during canvas draw
            document.body.appendChild(element);

            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                useCORS: true, // Crucial for external images from supabase or absolute paths
                allowTaint: true,
                backgroundColor: '#111111',
                logging: false, // Set to true for debugging html2canvas issues
            });

            // Restore element back to its parent container
            document.getElementById('ad-preview-container').appendChild(element);
            element.style.width = '100%';
            element.style.height = 'auto';
            element.style.position = 'relative';
            element.style.top = 'auto';
            element.style.left = 'auto';

            // Create download link
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `shakomako-ad-${selectedItem?.name?.replace(/\\s+/g, '-').toLowerCase() || 'post'}.png`;
            link.href = imgData;
            link.click();
            
        } catch (error) {
            console.error("Error generating ad image:", error);
            alert("Failed to generate ad. Check console for details.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (loading) return <div className="text-center py-5">Loading available items...</div>;

    return (
        <AdContainer>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2><ImageIcon className="me-2" /> Promotions Center</h2>
                <Button 
                    variant="warning" 
                    onClick={downloadAd} 
                    disabled={isGenerating || !selectedItem}
                    className="d-flex align-items-center"
                >
                    {isGenerating ? (
                        <Spinner size="sm" className="me-2" />
                    ) : (
                        <Download size={18} className="me-2" />
                    )}
                    {isGenerating ? 'Generating...' : 'Download High-Res Ad'}
                </Button>
            </div>

            <Row>
                <Col lg={5} className="mb-4">
                    <Card className="bg-white border-secondary text-dark shadow-sm">
                        <Card.Header className="border-secondary bg-light fw-bold text-dark">1. Select Product</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label className="text-dark">Choose a dish to feature</Form.Label>
                                <Form.Select 
                                    className="bg-white text-dark border-secondary mb-4"
                                    onChange={handleItemChange}
                                    value={selectedItem?.id || ''}
                                >
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name} - ₵{parseFloat(item.price).toFixed(2)}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            
                            {selectedItem && (
                                <div className="p-3 bg-light rounded border border-secondary mt-3">
                                    <h6 className="text-muted mb-2">Selected Details:</h6>
                                    <div className="d-flex gap-3 align-items-center">
                                        <img 
                                            src={selectedItem.image_url} 
                                            alt={selectedItem.name}
                                            style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px'}}
                                            onError={(e) => { e.target.src = '/src/assets/logo.svg' }}
                                        />
                                        <div>
                                            <div className="fw-bold text-dark">{selectedItem.name}</div>
                                            <div className="text-warning">₵{parseFloat(selectedItem.price).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="alert alert-info bg-white border-info text-dark mt-4 small">
                                <i className="lucide-info"></i> This tool generates a 1080x1080 PNG image perfectly sized for Instagram, Facebook, or WhatsApp Status.
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={7}>
                    <Card className="bg-white border-secondary text-dark shadow-sm">
                        <Card.Header className="border-secondary bg-light fw-bold d-flex justify-content-between align-items-center text-dark">
                            <span>2. Preview</span>
                            <span className="badge bg-secondary">Instagram Post (1:1)</span>
                        </Card.Header>
                        <Card.Body className="d-flex justify-content-center bg-light" id="ad-preview-container">
                            {/* AD CANVAS */}
                            {selectedItem ? (
                                <AdPreviewCard ref={adRef}>
                                    <img src={selectedItem.image_url} alt="bg" className="background" crossOrigin="anonymous" onError={(e) => { e.target.style.display = 'none'; }} />
                                    
                                    <div className="branding">
                                        <img src="/src/assets/logo.svg" alt="logo" />
                                        <span>SHAKO MAKO</span>
                                    </div>
                                    
                                    <div className="badge-new">Taste The Magic</div>
                                    
                                    <div className="content-wrapper">
                                        <div className="product-image-container">
                                            <img src={selectedItem.image_url} alt={selectedItem.name} className="main-product" crossOrigin="anonymous" onError={(e) => { e.target.src = '/src/assets/logo.svg' }} />
                                        </div>
                                        <div className="text-content">
                                            <div className="product-name">{selectedItem.name}</div>
                                            <div className="product-desc">{selectedItem.description}</div>
                                            <div className="product-price">₵{parseFloat(selectedItem.price).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </AdPreviewCard>
                            ) : (
                                <div className="text-center py-5 text-muted">No product selected</div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdContainer>
    );
};

export default AdCreator;
