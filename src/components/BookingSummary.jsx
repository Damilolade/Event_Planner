import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSummary = () => {
  const navigate = useNavigate();
  
  // State for booking data (in a real app, this would come from props or context)
  const [bookingData, setBookingData] = useState({
    eventType: 'Wedding',
    eventDate: '',
    eventTime: '',
    venue: '',
    guestCount: 1,
    invitationType: 'digital',
    package: 'basic',
    packagePrice: 50,
    additionalServices: []
  });

  // Package options matching GuestSelector
  const packages = [
    { id: 'basic', name: 'Basic', price: 50, description: 'Digital invitation card' },
    { id: 'standard', name: 'Standard', price: 100, description: 'Physical invitation card with basic design' },
    { id: 'premium', name: 'Premium', price: 200, description: 'Premium invitation with custom design' }
  ];

  const invitationTypes = [
    { id: 'digital', label: 'Digital Invitation', description: 'Send via email' },
    { id: 'physical', label: 'Physical Invitation', description: 'Printed and mailed' }
  ];

  const eventTypes = [
    { id: 'wedding', label: 'Wedding' },
    { id: 'birthday', label: 'Birthday Party' },
    { id: 'corporate', label: 'Corporate Event' },
    { id: 'baby_shower', label: 'Baby Shower' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePackageChange = (packageId) => {
    const selectedPackage = packages.find(p => p.id === packageId);
    setBookingData(prev => ({
      ...prev,
      package: packageId,
      packagePrice: selectedPackage?.price || 0
    }));
  };

  const handleProceedToCheckout = () => {
    // Navigate to checkout with booking data
    navigate('/checkout', { state: { bookingData } });
  };

  const selectedPackage = packages.find(p => p.id === bookingData.package);
  const selectedInvitationType = invitationTypes.find(t => t.id === bookingData.invitationType);

  // Calculate totals
  const guestFee = bookingData.guestCount > 10 ? (bookingData.guestCount - 10) * 5 : 0;
  const subtotal = bookingData.packagePrice + guestFee;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333',
        marginBottom: '30px',
        borderBottom: '2px solid #007bff',
        paddingBottom: '15px'
      }}>
        📋 Booking Summary
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Event Details Section */}
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '20px',
          backgroundColor: '#fafafa'
        }}>
          <h3 style={{ 
            marginTop: 0, 
            color: '#007bff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🎉 Event Details
          </h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Event Type
            </label>
            <select
              name="eventType"
              value={bookingData.eventType}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            >
              {eventTypes.map(type => (
                <option key={type.id} value={type.label}>{type.label}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              value={bookingData.eventDate}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Event Time
            </label>
            <input
              type="time"
              name="eventTime"
              value={bookingData.eventTime}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={bookingData.venue}
              onChange={handleInputChange}
              placeholder="Enter venue name or address"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Guest & Invitation Section */}
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '20px',
          backgroundColor: '#fafafa'
        }}>
          <h3 style={{ 
            marginTop: 0, 
            color: '#007bff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            👥 Guest & Invitation
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Number of Guests
            </label>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px' 
            }}>
              <button
                onClick={() => setBookingData(prev => ({ ...prev, guestCount: Math.max(1, prev.guestCount - 1) }))}
                style={{
                  width: '35px',
                  height: '35px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                -
              </button>
              <span style={{ 
                fontSize: '20px', 
                fontWeight: 'bold',
                minWidth: '40px',
                textAlign: 'center'
              }}>
                {bookingData.guestCount}
              </span>
              <button
                onClick={() => setBookingData(prev => ({ ...prev, guestCount: prev.guestCount + 1 }))}
                style={{
                  width: '35px',
                  height: '35px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                +
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Invitation Type
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {invitationTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setBookingData(prev => ({ ...prev, invitationType: type.id }))}
                  style={{
                    padding: '12px',
                    border: `2px solid ${bookingData.invitationType === type.id ? '#007bff' : '#ddd'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: bookingData.invitationType === type.id ? '#e6f2ff' : 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>{type.label}</span>
                  <span style={{ display: 'block', fontSize: '12px', color: '#666' }}>
                    {type.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Select Package
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handlePackageChange(pkg.id)}
                  style={{
                    padding: '12px',
                    border: `2px solid ${bookingData.package === pkg.id ? '#007bff' : '#ddd'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: bookingData.package === pkg.id ? '#e6f2ff' : 'white',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold' }}>{pkg.name}</span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#666' }}>
                      {pkg.description}
                    </span>
                  </div>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: '#007bff'
                  }}>
                    ${pkg.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary Section */}
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        marginBottom: '30px'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          color: '#007bff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          💰 Price Summary
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '15px'
        }}>
          <div>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Event Type:</strong> {bookingData.eventType}
            </p>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Event Date:</strong> {bookingData.eventDate || 'Not selected'}
            </p>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Event Time:</strong> {bookingData.eventTime || 'Not selected'}
            </p>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Venue:</strong> {bookingData.venue || 'Not specified'}
            </p>
          </div>
          
          <div>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Guest Count:</strong> {bookingData.guestCount}
            </p>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Invitation Type:</strong> {selectedInvitationType?.label}
            </p>
            <p style={{ margin: '8px 0', color: '#555' }}>
              <strong>Package:</strong> {selectedPackage?.name}
            </p>
          </div>
        </div>

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Package ({selectedPackage?.name}):</span>
            <span>${bookingData.packagePrice.toFixed(2)}</span>
          </div>
          {guestFee > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Additional Guests Fee ({(bookingData.guestCount - 10)} × $5):</span>
              <span>${guestFee.toFixed(2)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#007bff',
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '2px solid #007bff'
          }}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '15px',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          ← Back
        </button>
        <button
          onClick={handleProceedToCheckout}
          style={{
            padding: '15px 40px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            fontWeight: 'bold'
          }}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
