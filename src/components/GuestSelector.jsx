import React from 'react'
import { useState } from 'react'
import DeleteSelector from './DeleteSelector'

const GuestSelector = ({ onGuestsChange }) => {
  const [guests, setGuests] = useState([
    { id: 1, name: 'Guest 1' }
  ])
  const [invitationType, setInvitationType] = useState('digital')
  const [selectedPackage, setSelectedPackage] = useState('')

  const handleAddGuest = () => {
    const newId = Math.max(...guests.map(g => g.id), 0) + 1
    const newGuest = { id: newId, name: `Guest ${newId}` }
    const updatedGuests = [...guests, newGuest]
    setGuests(updatedGuests)
    if (onGuestsChange) {
      onGuestsChange(updatedGuests)
    }
  }

  const handleRemoveGuests = (idsToRemove) => {
    const updatedGuests = guests.filter(g => !idsToRemove.includes(g.id))
    if (updatedGuests.length === 0) {
      updatedGuests.push({ id: 1, name: 'Guest 1' })
    }
    setGuests(updatedGuests)
    if (onGuestsChange) {
      onGuestsChange(updatedGuests)
    }
  }

  const guestCount = guests.length

  const packages = [
    { id: 'basic', name: 'Basic', price: 50, description: 'Digital invitation card' },
    { id: 'standard', name: 'Standard', price: 100, description: 'Physical invitation card with basic design' },
    { id: 'premium', name: 'Premium', price: 200, description: 'Premium invitation with custom design' }
  ]

  const invitationTypes = [
    { id: 'digital', label: 'Digital Invitation', description: 'Send via email' },
    { id: 'physical', label: 'Physical Invitation', description: 'Printed and mailed' }
  ]

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Guest & Invitation Selector</h2>
      
      {/* Guest Count Section */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>Manage Guests</h3>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          Select guests to remove them, or add new guests below.
        </p>
        <DeleteSelector 
          items={guests} 
          onDelete={handleRemoveGuests} 
        />
        <button 
          onClick={handleAddGuest}
          style={{
            marginTop: '15px',
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          + Add Guest
        </button>
        <p style={{ textAlign: 'center', color: '#666', marginTop: '10px' }}>
          {guestCount} guest{guestCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Invitation Type Section */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>Invitation Type</h3>
        <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
          {invitationTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setInvitationType(type.id)}
              style={{
                flex: 1,
                padding: '15px',
                border: `2px solid ${invitationType === type.id ? '#007bff' : '#ddd'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: invitationType === type.id ? '#e6f2ff' : 'white',
                transition: 'all 0.3s ease'
              }}
            >
              <h4 style={{ margin: '0 0 5px 0' }}>{type.label}</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Package Selection Section */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>Select Package</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              style={{
                padding: '15px',
                border: `2px solid ${selectedPackage === pkg.id ? '#007bff' : '#ddd'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedPackage === pkg.id ? '#e6f2ff' : 'white',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{pkg.name}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{pkg.description}</p>
              </div>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                ${pkg.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        padding: '20px'
      }}>
        <h3 style={{ marginTop: 0 }}>Selection Summary</h3>
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>Guest Count:</strong> {guestCount}</p>
          <p><strong>Invitation Type:</strong> {invitationTypes.find(t => t.id === invitationType)?.label}</p>
          <p><strong>Selected Package:</strong> {packages.find(p => p.id === selectedPackage)?.name || 'None'}</p>
          <p><strong>Total Price:</strong> ${packages.find(p => p.id === selectedPackage)?.price || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default GuestSelector
