import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, Users, DollarSign, TrendingUp, Clock, 
  CheckCircle, XCircle, AlertCircle, PartyPopper,
  Heart, Briefcase, Sun, ArrowUpRight, ArrowDownRight
} from 'lucide-react'

// Sample dashboard data
const statsData = [
  { 
    id: 1, 
    title: 'Total Bookings', 
    value: '156', 
    change: '+12%', 
    trend: 'up',
    icon: <Calendar className="text-pink-500" size={24} />,
    color: 'from-pink-500 to-rose-500'
  },
  { 
    id: 2, 
    title: 'Total Guests', 
    value: '4,320', 
    change: '+8%', 
    trend: 'up',
    icon: <Users className="text-blue-500" size={24} />,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 3, 
    title: 'Revenue', 
    value: '$45,200', 
    change: '+23%', 
    trend: 'up',
    icon: <DollarSign className="text-green-500" size={24} />,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 4, 
    title: 'Pending Events', 
    value: '12', 
    change: '-3%', 
    trend: 'down',
    icon: <Clock className="text-yellow-500" size={24} />,
    color: 'from-yellow-500 to-orange-500'
  }
]

const upcomingEvents = [
  {
    id: 1,
    name: 'Sarah & Ahmed Wedding',
    type: 'Wedding',
    date: '2026-05-15',
    venue: 'Five Palm Jumeirah',
    guests: 150,
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200'
  },
  {
    id: 2,
    name: "Emma's 30th Birthday",
    type: 'Birthday',
    date: '2026-04-20',
    venue: 'Garden Pavilion',
    guests: 50,
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200'
  },
  {
    id: 3,
    name: 'Annual Company Gala',
    type: 'Corporate',
    date: '2026-12-20',
    venue: 'Grand Ballroom',
    guests: 200,
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=200'
  },
  {
    id: 4,
    name: 'Michael & Lisa Wedding',
    type: 'Wedding',
    date: '2026-06-10',
    venue: 'Beach Club',
    guests: 120,
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=200'
  }
]

const recentActivity = [
  { id: 1, action: 'New booking confirmed', event: 'Sarah & Ahmed Wedding', time: '2 hours ago', type: 'success' },
  { id: 2, action: 'Payment received', event: "Emma's 30th Birthday", time: '5 hours ago', type: 'payment' },
  { id: 3, action: 'Event details updated', event: 'Annual Company Gala', time: '1 day ago', type: 'update' },
  { id: 4, action: 'Booking cancelled', event: 'Product Launch', time: '2 days ago', type: 'cancelled' },
]

const statusConfig = {
  confirmed: { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle size={14} /> },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <AlertCircle size={14} /> },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle size={14} /> }
}

const typeIcons = {
  Wedding: <Heart className="text-pink-500" size={18} />,
  Birthday: <PartyPopper className="text-yellow-500" size={18} />,
  Corporate: <Briefcase className="text-blue-500" size={18} />,
  Beach: <Sun className="text-orange-500" size={18} />
}

const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              <p className="text-slate-400 mt-1">Here's what's happening with your events</p>
            </div>
            <Link
              to="/booking/eventlist"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-500/25"
            >
              <Calendar size={18} /> New Booking
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat) => (
            <div 
              key={stat.id}
              className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Upcoming Events</h2>
              <Link 
                to="/booking/bookinglist" 
                className="text-pink-500 hover:text-pink-600 text-sm font-medium flex items-center gap-1"
              >
                View All <TrendingUp size={16} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {typeIcons[event.type]}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusConfig[event.status].bg
                        } ${statusConfig[event.status].text} flex items-center gap-1`}>
                          {statusConfig[event.status].icon}
                          {event.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-800 truncate">{event.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {event.guests} guests
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-slate-500">{event.venue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'success' ? 'bg-green-100 text-green-600' :
                      activity.type === 'payment' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'cancelled' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.type === 'success' ? <CheckCircle size={14} /> :
                       activity.type === 'payment' ? <DollarSign size={14} /> :
                       activity.type === 'cancelled' ? <XCircle size={14} /> :
                       <TrendingUp size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                      <p className="text-xs text-slate-500 truncate">{activity.event}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/booking/eventlist"
            className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-pink-100 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Browse Events</h3>
                <p className="text-sm text-slate-500">Find the perfect event</p>
              </div>
            </div>
          </Link>
          <Link
            to="/booking/bookinglist"
            className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">View Bookings</h3>
                <p className="text-sm text-slate-500">Manage your reservations</p>
              </div>
            </div>
          </Link>
          <Link
            to="/booking/bookingsummary"
            className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Booking Summary</h3>
                <p className="text-sm text-slate-500">View payment details</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
