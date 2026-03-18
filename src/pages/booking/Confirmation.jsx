import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { 
  CheckCircle, Calendar, MapPin, Users, CreditCard, Mail, Phone, 
  Download, Share2, Home, ArrowRight, PartyPopper, Heart, Clock
} from 'lucide-react'

const Confirmation = () => {
  const location = useLocation()

  const booking = location.state?.booking || {
    eventType: 'Wedding',
    eventDate: new Date().toISOString(),
    eventTime: '6:00 PM',
    venue: 'Five Palm Jumeirah',
    guestCount: 50,
    package: { name: 'Standard Package', price: 1500 },
    total: 1620,
    paymentMethod: 'card',
    bookingDate: new Date().toISOString(),
    confirmationNumber: 'EVT-DEMO123'
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Booking Confirmed - ${booking.confirmationNumber}`,
        text: `My event booking at 2706 Events: ${booking.eventType} on ${new Date(booking.eventDate).toLocaleDateString()}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-slate-600">Thank you for your booking. We're excited to host your event!</p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Confirmation Number */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
            <p className="text-green-100 mb-1">Confirmation Number</p>
            <p className="text-3xl font-bold tracking-wider">{booking.confirmationNumber}</p>
            <p className="text-green-100 text-sm mt-2">
              Booked on {new Date(booking.bookingDate).toLocaleDateString()}
            </p>
          </div>

          {/* Event Details */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <PartyPopper className="text-pink-500" /> Event Details
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Heart className="text-pink-500" size={16} />
                  <span className="text-sm">Event Type</span>
                </div>
                <p className="font-semibold text-slate-800">{booking.eventType}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Calendar className="text-blue-500" size={16} />
                  <span className="text-sm">Date</span>
                </div>
                <p className="font-semibold text-slate-800">
                  {new Date(booking.eventDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Clock className="text-purple-500" size={16} />
                  <span className="text-sm">Time</span>
                </div>
                <p className="font-semibold text-slate-800">{booking.eventTime}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Users className="text-green-500" size={16} />
                  <span className="text-sm">Guests</span>
                </div>
                <p className="font-semibold text-slate-800">{booking.guestCount} guests</p>
              </div>
            </div>

            {/* Venue */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <MapPin className="text-pink-500" size={18} />
                <span className="text-sm">Venue</span>
              </div>
              <p className="font-semibold text-slate-800 text-lg">{booking.venue}</p>
            </div>

            {/* Payment Summary */}
            <div className="border-t border-slate-200 pt-4 mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <CreditCard className="text-blue-500" /> Payment Details
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>{booking.package?.name || 'Package'}</span>
                  <span>${(booking.package?.price || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (8%)</span>
                  <span>${((booking.total || 0) * 0.08).toFixed(2)}</span>
                </div>
                <hr className="border-slate-200 my-2" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Paid</span>
                  <span className="text-green-600">${(booking.total || 0).toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 bg-green-50 rounded-lg p-3 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={18} />
                <span className="text-green-700 text-sm">Payment successful via {booking.paymentMethod}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-slate-800 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Mail className="text-pink-500 mt-0.5" size={16} />
                  <span>A confirmation email has been sent to your email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="text-pink-500 mt-0.5" size={16} />
                  <span>Our team will contact you within 24 hours to confirm details</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="text-pink-500 mt-0.5" size={16} />
                  <span>You'll receive reminders 7 days and 1 day before your event</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
              >
                <Download size={20} /> Download Receipt
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
              >
                <Share2 size={20} /> Share
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
              >
                <Home size={20} /> Back to Home
              </Link>
              <Link
                to="/booking/eventlist"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors"
              >
                Book Another <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-2">Need help with your booking?</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="text-pink-500 hover:text-pink-600 font-medium">
              Contact Support
            </Link>
            <span className="text-slate-300">|</span>
            <a href="tel:+97141234567" className="text-pink-500 hover:text-pink-600 font-medium">
              Call +2348086902551
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
