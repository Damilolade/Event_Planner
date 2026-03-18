import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, Search, Filter, Heart, PartyPopper, Briefcase, Sun, ChevronRight } from 'lucide-react'

// Sample event data
const eventData = [
  {
    id: 1,
    title: 'Summer Wedding Expo 2026',
    type: 'Wedding',
    date: '2026-04-15',
    time: '10:00 AM - 6:00 PM',
    venue: 'Five Palm Jumeirah',
    address: 'Dubai Marina, Dubai',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    price: 0,
    capacity: 500,
    description: 'Join us for the biggest wedding expo of the year featuring top vendors, fashion shows, and exclusive discounts.',
    featured: true
  },
  {
    id: 2,
    title: 'Kids Birthday Bonanza',
    type: 'Birthday',
    date: '2026-04-20',
    time: '2:00 PM - 6:00 PM',
    venue: 'Garden Pavilion',
    address: 'Jumeirah Beach Road',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    price: 1500,
    capacity: 50,
    description: 'A fun-filled birthday party package with entertainment, decorations, and catering included.',
    featured: false
  },
  {
    id: 3,
    title: 'Corporate Year-End Gala',
    type: 'Corporate',
    date: '2026-12-20',
    time: '7:00 PM - 11:00 PM',
    venue: 'Grand Ballroom',
    address: 'Downtown Dubai',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
    price: 3000,
    capacity: 300,
    description: 'Elegant corporate event package with dinner, entertainment, and networking opportunities.',
    featured: true
  },
  {
    id: 4,
    title: 'Beach Club Summer Bash',
    type: 'Beach',
    date: '2026-05-10',
    time: '12:00 PM - 8:00 PM',
    venue: 'Beach Club',
    address: 'Palm Jumeirah',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
    price: 2000,
    capacity: 150,
    description: 'Beat the heat with our beach party package featuring BBQ, water sports, and live music.',
    featured: false
  },
  {
    id: 5,
    title: 'Anniversary Special Package',
    type: 'Wedding',
    date: '2026-06-15',
    time: '6:00 PM - 11:00 PM',
    venue: 'Rooftop Terrace',
    address: 'Business Bay',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400',
    price: 2500,
    capacity: 100,
    description: 'Romantic anniversary celebration with stunning city views, premium catering, and live entertainment.',
    featured: false
  },
  {
    id: 6,
    title: 'Product Launch Party',
    type: 'Corporate',
    date: '2026-05-25',
    time: '5:00 PM - 10:00 PM',
    venue: 'Grand Ballroom',
    address: 'Downtown Dubai',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    price: 4500,
    capacity: 400,
    description: 'Professional product launch event with AV equipment, branding, and catering services.',
    featured: true
  }
]

const typeIcons = {
  Wedding: <Heart className="text-pink-500" />,
  Birthday: <PartyPopper className="text-yellow-500" />,
  Corporate: <Briefcase className="text-blue-500" />,
  Beach: <Sun className="text-orange-500" />
}

const EventList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedEvents, setSelectedEvents] = useState([])

  const filteredEvents = eventData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || event.type === filterType
    return matchesSearch && matchesType
  })

  const toggleEventSelection = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const handleViewDetails = (event) => {
    navigate('/booking/eventdetails', { state: { event } })
  }

  const handleBookNow = (event) => {
    navigate('/booking/bookingsummary', { state: { event } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-slate-600">
            Browse and book from our curated list of special events
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search events or venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors"
              />
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none transition-colors bg-white"
              >
                <option value="all">All Events</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate</option>
                <option value="Beach">Beach</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Events */}
        {filterType === 'all' && searchTerm === '' && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventData.filter(e => e.featured).map((event) => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      {typeIcons[event.type]}
                      <span className="text-sm font-medium">{event.type}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={16} />
                        <span className="text-sm">{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={16} />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users size={16} />
                        <span className="text-sm">Up to {event.capacity} guests</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                      <span className="text-2xl font-bold text-pink-600">
                        {event.price === 0 ? 'Free' : `$${event.price.toLocaleString()}`}
                      </span>
                      <button
                        onClick={() => handleBookNow(event)}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Events */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            {filterType !== 'all' ? `${filterType} Events` : 'All Events'}
            <span className="text-lg font-normal text-slate-500 ml-2">
              ({filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''})
            </span>
          </h2>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-slate-500">No events found matching your criteria.</p>
              <button 
                onClick={() => {setSearchTerm(''); setFilterType('all')}}
                className="mt-4 text-pink-500 hover:text-pink-600 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${selectedEvents.includes(event.id) ? 'border-pink-500' : 'border-transparent'}`}
                >
                  <div className="relative h-40">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      {typeIcons[event.type]}
                      <span className="text-xs font-medium">{event.type}</span>
                    </div>
                    <button
                      onClick={() => toggleEventSelection(event.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        selectedEvents.includes(event.id) 
                          ? 'bg-pink-500 text-white' 
                          : 'bg-white/90 text-slate-400 hover:text-pink-500'
                      }`}
                    >
                      {selectedEvents.includes(event.id) ? '✓' : '+'}
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">{event.title}</h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Calendar size={14} />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <MapPin size={14} />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                      <span className="text-xl font-bold text-slate-800">
                        {event.price === 0 ? 'Free' : `$${event.price.toLocaleString()}`}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(event)}
                          className="text-slate-600 hover:text-pink-500 px-3 py-1 text-sm font-medium transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleBookNow(event)}
                          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          Book <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bulk Booking Section */}
        {selectedEvents.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-slate-200 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">
                  {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <button
                onClick={() => navigate('/booking/bookingsummary', { state: { events: selectedEvents } })}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2"
              >
                Proceed to Booking <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventList
