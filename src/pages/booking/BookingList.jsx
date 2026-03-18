import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, MapPin, Users, Clock, Search, Filter, Plus, 
  ChevronLeft, ChevronRight, Heart, PartyPopper, Briefcase, Sun
} from 'lucide-react'

// Sample all bookings data
const allBookings = [
  {
    id: 1,
    confirmationNumber: 'EVT-WEDD123',
    eventType: 'Wedding',
    eventName: 'Sarah & Ahmed Wedding',
    venue: 'Five Palm Jumeirah',
    address: 'Dubai Marina, Dubai',
    date: '2026-05-15',
    time: '6:00 PM',
    guestCount: 150,
    status: 'confirmed',
    total: 5500,
    package: 'Premium Package',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200'
  },
  {
    id: 2,
    confirmationNumber: 'EVT-BDAY456',
    eventType: 'Birthday',
    eventName: 'Emma\'s 30th Birthday',
    venue: 'Garden Pavilion',
    address: 'Jumeirah Beach Road',
    date: '2026-04-20',
    time: '7:00 PM',
    guestCount: 50,
    status: 'pending',
    total: 1800,
    package: 'Standard Package',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200'
  },
  {
    id: 3,
    confirmationNumber: 'EVT-CORP789',
    eventType: 'Corporate',
    eventName: 'Annual Company Gala',
    venue: 'Grand Ballroom',
    address: 'Downtown Dubai',
    date: '2026-12-20',
    time: '7:00 PM',
    guestCount: 200,
    status: 'confirmed',
    total: 8500,
    package: 'Premium Package',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=200'
  },
  {
    id: 4,
    confirmationNumber: 'EVT-WEDD101',
    eventType: 'Wedding',
    eventName: 'Lisa & John Wedding',
    venue: 'Beach Club',
    address: 'Palm Jumeirah',
    date: '2025-11-10',
    time: '5:00 PM',
    guestCount: 100,
    status: 'completed',
    total: 4200,
    package: 'Standard Package',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=200'
  },
  {
    id: 5,
    confirmationNumber: 'EVT-BDAY202',
    eventType: 'Birthday',
    eventName: 'Oliver\'s 5th Birthday',
    venue: 'Rooftop Terrace',
    address: 'Business Bay',
    date: '2025-08-15',
    time: '3:00 PM',
    guestCount: 30,
    status: 'completed',
    total: 1200,
    package: 'Basic Package',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200'
  },
  {
    id: 6,
    confirmationNumber: 'EVT-CORP303',
    eventType: 'Corporate',
    eventName: 'Product Launch',
    venue: 'Grand Ballroom',
    address: 'Downtown Dubai',
    date: '2025-10-05',
    time: '6:00 PM',
    guestCount: 300,
    status: 'cancelled',
    total: 6000,
    package: 'Premium Package',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200'
  }
]

const statusColors = {
  confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmed' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
  completed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Completed' }
}

const typeIcons = {
  Wedding: <Heart className="text-pink-500" size={24} />,
  Birthday: <PartyPopper className="text-yellow-500" size={24} />,
  Corporate: <Briefcase className="text-blue-500" size={24} />,
  Beach: <Sun className="text-orange-500" size={24} />
}

const ITEMS_PER_PAGE = 4

const BookingList = () => {
  const [bookings] = useState(allBookings)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    const matchesType = filterType === 'all' || booking.eventType === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE)
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">All Bookings</h1>
            <p className="text-slate-600">View and manage all your event bookings</p>
          </div>
          <Link
            to="/booking/eventlist"
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors"
          >
            <Plus size={20} /> New Booking
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, number, or venue..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                className="px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-pink-500 focus:outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-slate-500 mb-4">
          Showing {paginatedBookings.length} of {filteredBookings.length} bookings
        </p>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {paginatedBookings.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="flex">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img 
                    src={booking.image} 
                    alt={booking.eventName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {typeIcons[booking.eventType]}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}>
                        {statusColors[booking.status].label}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{booking.confirmationNumber}</span>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 mb-1">{booking.eventName}</h3>
                  <p className="text-sm text-slate-500 mb-2">{booking.package}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {new Date(booking.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {booking.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {booking.guestCount}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="bg-slate-50 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-1 text-slate-600">
                  <MapPin size={14} />
                  <span className="text-sm">{booking.venue}</span>
                </div>
                <span className="text-lg font-bold text-pink-600">${booking.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <Calendar className="mx-auto text-slate-300 mb-4" size={64} />
            <p className="text-xl text-slate-500 mb-4">No bookings found</p>
            <Link
              to="/booking/eventlist"
              className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
            >
              Browse Events <ChevronRight size={20} />
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white shadow border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-pink-500 text-white'
                    : 'bg-white shadow border border-slate-200 text-slate-600 hover:bg-pink-50 hover:text-pink-500'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white shadow border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingList
