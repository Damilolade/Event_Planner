import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, PartyPopper, Heart, Briefcase, Sun, ChevronRight } from 'lucide-react'

const services = [
  { id: 1, label: 'Wedding Ceremony', descr: 'Book for Wedding, Location Choice, Event Hall', icon: <Heart className="text-pink-500" size={32} />, price: 5000 },
  { id: 2, label: 'Birthday Party', descr: 'Book for Birthday, Location Choice, Event Hall', icon: <PartyPopper className="text-yellow-500" size={32} />, price: 1500 },
  { id: 3, label: 'Corporate Event', descr: 'Book for End of Year Party, Location Choice, Event Hall', icon: <Briefcase className="text-blue-500" size={32} />, price: 3000 },
  { id: 4, label: 'Beach Outing', descr: 'Book for Special Guest, Location Choice, Event Hall', icon: <Sun className="text-orange-500" size={32} />, price: 2000 }
]

const locations = [
  { id: 1, name: 'Five Palm Jumeirah', address: 'Dubai Marina, Dubai', capacity: 500, price: 5000 },
  { id: 2, name: 'Grand Ballroom', address: 'Downtown Dubai', capacity: 300, price: 3500 },
  { id: 3, name: 'Garden Pavilion', address: 'Jumeirah Beach Road', capacity: 150, price: 2500 },
  { id: 4, name: 'Rooftop Terrace', address: 'Business Bay', capacity: 100, price: 2000 },
  { id: 5, name: 'Beach Club', address: 'Palm Jumeirah', capacity: 200, price: 4000 }
]

const Booking = () => {
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [guestCount, setGuestCount] = useState(50)

  const handleServiceSelect = (service) => {
    setSelectedService(service)
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
  }

  const handleProceed = () => {
    if (!selectedService || !selectedLocation || !eventDate || !eventTime) {
      alert('Please fill in all required fields')
      return
    }
    navigate('/booking/bookingsummary', {
      state: {
        service: selectedService,
        location: selectedLocation,
        date: eventDate,
        time: eventTime,
        guestCount: guestCount
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Plan Your Perfect Event
          </h1>
          <p className="text-lg text-slate-600">
            Choose your event type and venue to get started
          </p>
        </div>

        {/* Service Selection */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar className="text-pink-500" /> Select Event Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={`
                  bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300
                  border-2 hover:shadow-xl hover:-translate-y-1
                  ${selectedService?.id === service.id 
                    ? 'border-pink-500 shadow-lg bg-pink-50' 
                    : 'border-slate-200'}
                `}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 text-center mb-2">
                  {service.label}
                </h3>
                <p className="text-sm text-slate-600 text-center mb-3">
                  {service.descr}
                </p>
                <p className="text-lg font-bold text-pink-600 text-center">
                  From ${service.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Location Selection */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <MapPin className="text-blue-500" /> Select Venue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className={`
                  bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300
                  border-2 hover:shadow-xl hover:-translate-y-1
                  ${selectedLocation?.id === location.id 
                    ? 'border-blue-500 shadow-lg bg-blue-50' 
                    : 'border-slate-200'}
                `}
              >
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {location.name}
                </h3>
                <p className="text-sm text-slate-600 mb-3">{location.address}</p>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Users size={18} /> Up to {location.capacity} guests
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ${location.price.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Date, Time & Guest Selection */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Event Details
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Event Time
                </label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setGuestCount(Math.max(10, guestCount - 10))}
                    className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-slate-800 w-16 text-center">
                    {guestCount}
                  </span>
                  <button
                    onClick={() => setGuestCount(guestCount + 10)}
                    className="w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center font-bold text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary & Proceed Button */}
        {selectedService && selectedLocation && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-6">Booking Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-pink-200">Event Type</p>
                  <p className="text-xl font-semibold">{selectedService.label}</p>
                </div>
                <div>
                  <p className="text-pink-200">Venue</p>
                  <p className="text-xl font-semibold">{selectedLocation.name}</p>
                </div>
                <div>
                  <p className="text-pink-200">Date & Time</p>
                  <p className="text-xl font-semibold">
                    {eventDate ? new Date(eventDate).toLocaleDateString() : 'Not selected'} 
                    at {eventTime || 'Not selected'}
                  </p>
                </div>
                <div>
                  <p className="text-pink-200">Guests</p>
                  <p className="text-xl font-semibold">{guestCount} guests</p>
                </div>
              </div>
              <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-pink-200">Estimated Total</p>
                  <p className="text-3xl font-bold">
                    ${(selectedLocation.price + (guestCount > 50 ? (guestCount - 50) * 10 : 0)).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleProceed}
                  className="flex items-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-50 transition-colors shadow-lg"
                >
                  Continue to Booking
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Booking