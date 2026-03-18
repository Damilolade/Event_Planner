import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Calendar, MapPin, Users, Clock, Heart, PartyPopper, Briefcase, Sun,
  Check, X, ChevronLeft, Share2, Heart as HeartIcon, Star, ArrowRight
} from 'lucide-react'

const typeIcons = {
  Wedding: <Heart className="text-pink-500" size={24} />,
  Birthday: <PartyPopper className="text-yellow-500" size={24} />,
  Corporate: <Briefcase className="text-blue-500" size={24} />,
  Beach: <Sun className="text-orange-500" size={24} />
}

const packageDetails = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 0,
    description: 'Essential event space rental',
    features: [
      'Event space for up to 2 hours',
      'Basic seating arrangements',
      'Standard lighting',
      'Parking for 20 vehicles'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Package',
    price: 1500,
    description: 'Everything in Basic plus enhanced services',
    features: [
      'Event space for up to 4 hours',
      'Premium seating arrangements',
      'Custom lighting options',
      'Catering service included',
      'Parking for 50 vehicles',
      'Event coordinator'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 3500,
    description: 'The ultimate event experience',
    features: [
      'Full day venue access',
      'Luxury seating & décor',
      'Full AV equipment',
      'Premium catering menu',
      'Unlimited parking',
      'Dedicated event team',
      'Photography package',
      'Live entertainment setup'
    ]
  }
]

const EventDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const event = location.state?.event || {
    id: 1,
    title: 'Summer Wedding Expo 2026',
    type: 'Wedding',
    date: '2026-04-15',
    time: '10:00 AM - 6:00 PM',
    venue: 'Five Palm Jumeirah',
    address: 'Dubai Marina, Dubai',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    price: 0,
    capacity: 500,
    description: 'Join us for the biggest wedding expo of the year featuring top vendors, fashion shows, and exclusive discounts. Meet over 100 wedding vendors, enjoy live fashion shows, and get exclusive discounts on your big day.',
    featured: true,
    rating: 4.8,
    reviews: 256,
    organizer: '2706 Events',
    category: 'Wedding Expo'
  }

  const [selectedPackage, setSelectedPackage] = useState('standard')
  const [guestCount, setGuestCount] = useState(50)
  const [selectedDate, setSelectedDate] = useState(event.date)
  const [isFavorite, setIsFavorite] = useState(false)

  const currentPackage = packageDetails.find(p => p.id === selectedPackage)
  
  const handleBookNow = () => {
    navigate('/booking/bookingsummary', {
      state: {
        event,
        package: currentPackage,
        guestCount,
        date: selectedDate
      }
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} at ${event.venue}`,
        url: window.location.href
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-pink-500 mb-6 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.type}
                </span>
                {event.featured && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isFavorite 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white/90 text-slate-600 hover:text-pink-500'
                  }`}
                >
                  <HeartIcon size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 text-slate-600 hover:text-pink-500 flex items-center justify-center transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">{event.title}</h1>
                  <div className="flex items-center gap-2 text-slate-600">
                    {typeIcons[event.type]}
                    <span>Organized by {event.organizer}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                  <Star className="text-yellow-500 fill-current" size={18} />
                  <span className="font-bold text-slate-800">{event.rating}</span>
                  <span className="text-slate-500 text-sm">({event.reviews} reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <Calendar className="text-pink-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="font-semibold text-slate-800">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Time</p>
                    <p className="font-semibold text-slate-800">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <MapPin className="text-purple-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Venue</p>
                    <p className="font-semibold text-slate-800">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="text-green-500" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Capacity</p>
                    <p className="font-semibold text-slate-800">Up to {event.capacity}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">About This Event</h3>
                <p className="text-slate-600 leading-relaxed">{event.description}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Location</h3>
                <div className="bg-slate-100 rounded-xl p-4 flex items-center gap-3">
                  <MapPin className="text-pink-500" size={24} />
                  <div>
                    <p className="font-semibold text-slate-800">{event.venue}</p>
                    <p className="text-slate-600">{event.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Select Package</h3>
              <div className="space-y-4">
                {packageDetails.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800">{pkg.name}</h4>
                        <p className="text-sm text-slate-600">{pkg.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-pink-600">
                          {pkg.price === 0 ? 'Free' : `$${pkg.price.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.slice(0, 4).map((feature, idx) => (
                        <span 
                          key={idx}
                          className="flex items-center gap-1 text-xs bg-white px-2 py-1 rounded-full text-slate-600"
                        >
                          <Check size={12} className="text-green-500" /> {feature}
                        </span>
                      ))}
                      {pkg.features.length > 4 && (
                        <span className="text-xs text-slate-500 py-1">
                          +{pkg.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Book This Event</h3>
              
              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Guest Count */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Guests</label>
                <div className="flex items-center justify-between bg-slate-100 rounded-lg p-3">
                  <button
                    onClick={() => setGuestCount(Math.max(10, guestCount - 10))}
                    className="w-8 h-8 rounded-full bg-white shadow text-slate-700 font-bold hover:bg-pink-500 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-slate-800">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(Math.min(event.capacity, guestCount + 10))}
                    className="w-8 h-8 rounded-full bg-white shadow text-slate-700 font-bold hover:bg-pink-500 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Max capacity: {event.capacity} guests</p>
              </div>

              {/* Package Summary */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">{currentPackage?.name}</span>
                  <span className="font-bold text-slate-800">
                    {currentPackage?.price === 0 ? 'Free' : `$${currentPackage?.price.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Guest Fee</span>
                  <span className="font-bold text-slate-800">
                    ${guestCount > 50 ? (guestCount - 50) * 10 : 0}
                  </span>
                </div>
                <hr className="my-3 border-slate-300" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800">Total</span>
                  <span className="text-2xl font-bold text-pink-600">
                    ${(currentPackage?.price || 0) + (guestCount > 50 ? (guestCount - 50) * 10 : 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Book Now <ArrowRight size={20} />
              </button>

              <p className="text-center text-xs text-slate-500 mt-4">
                Free cancellation up to 7 days before the event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
