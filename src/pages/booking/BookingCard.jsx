import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, MapPin, Users, Clock, Heart, PartyPopper, Briefcase, Sun,
  Check, X, Edit, Trash2, Eye, Share2, Download, ArrowRight
} from 'lucide-react'

const statusColors = {
  confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmed', icon: <Check size={16} /> },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending', icon: <Clock size={16} /> },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled', icon: <X size={16} /> },
  completed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Completed', icon: <Check size={16} /> }
}

const typeIcons = {
  Wedding: <Heart className="text-pink-500" size={28} />,
  Birthday: <PartyPopper className="text-yellow-500" size={28} />,
  Corporate: <Briefcase className="text-blue-500" size={28} />,
  Beach: <Sun className="text-orange-500" size={28} />
}

// Sample booking data
const sampleBooking = {
  id: 1,
  confirmationNumber: 'EVT-WEDD123',
  eventType: 'Wedding',
  eventName: 'Sarah & Ahmed Wedding',
  venue: 'Five Palm Jumeirah',
  address: 'Dubai Marina, Dubai',
  date: '2026-05-15',
  time: '6:00 PM',
  endTime: '11:00 PM',
  guestCount: 150,
  status: 'confirmed',
  total: 5500,
  paid: 5500,
  package: {
    name: 'Premium Package',
    price: 3500,
    features: [
      'Full day venue access',
      'Premium catering menu',
      'Unlimited parking',
      'Dedicated event team',
      'Photography package',
      'Live entertainment setup'
    ]
  },
  contact: {
    name: 'Ahmed Mohammed',
    email: 'ahmed@example.com',
    phone: '+971 50 123 4567'
  },
  specialRequests: 'Vegetarian options required for 30% of guests. Classical music during ceremony.',
  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
  createdAt: '2026-01-15'
}

const BookingCard = () => {
  const booking = sampleBooking
  const status = statusColors[booking.status]
  const eventTypeIcon = typeIcons[booking.eventType]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/booking/bookinglist"
            className="flex items-center gap-2 text-slate-600 hover:text-pink-500 transition-colors"
          >
            ← Back to Bookings
          </Link>
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-lg shadow text-slate-600 hover:text-pink-500 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 bg-white rounded-lg shadow text-slate-600 hover:text-pink-500 transition-colors">
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`${status.bg} ${status.text} rounded-t-2xl p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            {status.icon}
            <span className="font-semibold">{status.label}</span>
          </div>
          <span className="text-sm">Confirmation: {booking.confirmationNumber}</span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64">
            <img 
              src={booking.image} 
              alt={booking.eventName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-center gap-3 text-white">
                {eventTypeIcon}
                <div>
                  <h1 className="text-2xl font-bold">{booking.eventName}</h1>
                  <p className="text-white/80">{booking.package.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Event Details */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Calendar className="text-pink-500" size={20} /> Event Details
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date</span>
                      <span className="font-semibold text-slate-800">
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Time</span>
                      <span className="font-semibold text-slate-800">{booking.time} - {booking.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Guests</span>
                      <span className="font-semibold text-slate-800">{booking.guestCount} guests</span>
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <MapPin className="text-pink-500" size={20} /> Venue
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="font-semibold text-slate-800">{booking.venue}</p>
                    <p className="text-slate-600">{booking.address}</p>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Users className="text-pink-500" size={20} /> Contact Person
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <p className="font-semibold text-slate-800">{booking.contact.name}</p>
                    <p className="text-slate-600 text-sm">{booking.contact.email}</p>
                    <p className="text-slate-600 text-sm">{booking.contact.phone}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Package */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Package Inclusions</h3>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4">
                    <p className="font-bold text-slate-800 mb-3">{booking.package.name}</p>
                    <ul className="space-y-2">
                      {booking.package.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <Check className="text-green-500 flex-shrink-0" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Special Requests</h3>
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <p className="text-slate-600 text-sm">{booking.specialRequests}</p>
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Summary</h3>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Package Total</span>
                      <span className="font-semibold text-slate-800">${booking.package.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Additional Services</span>
                      <span className="font-semibold text-slate-800">${(booking.total - booking.package.price).toLocaleString()}</span>
                    </div>
                    <hr className="border-slate-200" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-800">Total</span>
                      <span className="text-xl font-bold text-pink-600">${booking.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Paid</span>
                      <span className="font-semibold text-green-600">${booking.paid.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-50 p-6 flex flex-col sm:flex-row gap-3 justify-end">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
              <Edit size={18} /> Edit Booking
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
              <Eye size={18} /> View Invoice
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">
              <Trash2 size={18} /> Cancel Booking
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 mb-2">Need to make changes to your booking?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
          >
            Contact Support <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
