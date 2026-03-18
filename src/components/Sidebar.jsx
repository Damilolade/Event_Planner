import React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, User, CalendarCheck, Phone, Menu, X, 
  ChevronDown, ChevronRight, BookOpen, 
  Users, CreditCard, List, Trash2, CheckCircle, LayoutDashboard, Info, Mail
} from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const location = useLocation();

  const dashboardLink = [
    { to: '/booking/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/booking/dashboard/checkout', label: 'Check Out', icon: <CreditCard size={18} /> },
  ];

  const mainNavLinks = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/about', label: 'About', icon: <Info size={18} /> },
    { to: '/contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  const bookingLinks = [
    { to: '/booking/signup', label: 'Sign Up', icon: <BookOpen size={18} /> },
    { to: '/booking/login', label: 'Login', icon: <User size={18} /> },
    { to: '/booking/bookingsummary', label: 'Booking Summary', icon: <List size={18} /> },
    { to: '/booking/deleteselector', label: 'Delete Selector', icon: <Trash2 size={18} /> },
    { to: '/booking/guestselector', label: 'Guest Selector', icon: <Users size={18} /> },
    { to: '/booking/payment', label: 'Payment', icon: <CreditCard size={18} /> },
    { to: '/booking/booking', label: 'Booking', icon: <CreditCard size={18} /> },
    { to: '/booking/eventlist', label: 'Event List', icon: <List size={18} /> },
    { to: '/booking/eventdetails', label: 'Event Details', icon: <CalendarCheck size={18} />},
    { to: '/booking/confirmation', label: 'Confirmation', icon: <CheckCircle size={18} /> },
    { to: '/booking/bookinglist', label: 'Booking List', icon: <List size={18} /> },
    { to: '/booking/bookingcard', label: 'Booking Card', icon: <CreditCard size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setIsOpen(false);
    setBookingDropdownOpen(false);
  };

  return (
    <>
      {/* Toggle Button - Visible on all screen sizes */}
      <button
        className="fixed top-19 left-4 z-50 
          bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 rounded-xl shadow-lg 
          hover:shadow-pink-500/30 hover:scale-105
          transition-all duration-300
          flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay for all screen sizes */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Modern Glassmorphism Style */}
      <aside className={`
        fixed top-18 left-0 h-full w-64
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        text-slate-100
        z-40
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
        shadow-2xl backdrop-blur-sm
        border-r border-white/5
      `}>
        {/* Logo Section */}
        <div className="pt-6 pb-5 px-6 border-b border-white/10 bg-white/5 shrink-0">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
            2706 Events
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-medium tracking-wide">Event Planning Made Easy</p>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {/* Main Navigation Links */}
          <nav className="space-y-1 mb-4">
            {mainNavLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={handleLinkClick}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive(to) 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white hover:scale-[1.01]'}
                `}
              >
                <span className={isActive(to) ? 'text-white' : 'text-pink-400'}>
                  {icon}
                </span>
                <span className="font-semibold">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Dashboard Dropdown */}
          <div className="mb-2">
            <button
              onClick={() => {
                setDashboardDropdownOpen(!dashboardDropdownOpen);
                setActiveSection('dashboard');
              }}
              className={`
                w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300
                ${location.pathname.includes('/dashboard') || activeSection === 'dashboard'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 scale-[1.02]' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-white hover:scale-[1.01]'}
              `}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={20} className={location.pathname.includes('/dashboard') || activeSection === 'dashboard' ? 'text-white' : 'text-pink-400'} />
                <span className="font-semibold">Dashboard</span>
              </div>
              {dashboardDropdownOpen ? <ChevronDown size={18} className="transition-transform duration-200" /> : <ChevronRight size={18} className="transition-transform duration-200" />}
            </button>

            {/* Dashboard Dropdown Items */}
            {dashboardDropdownOpen && (
              <ul className="mt-3 ml-1 space-y-1.5 overflow-hidden">
                {dashboardLink.map(({ to, label, icon }, index) => (
                  <li key={to} 
                    className="transform transition-all duration-200"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <Link
                      to={to}
                      onClick={handleLinkClick}
                      className={`
                        flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm group
                        ${isActive(to) 
                          ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-white font-medium border-l-2 border-pink-500 ml-[-2px] pl-[18px]' 
                          : 'text-slate-400 hover:bg-white/10 hover:text-white hover:translate-x-1'}
                      `}
                    >
                      <span className={`${isActive(to) ? 'text-pink-400' : 'text-slate-500 group-hover:text-pink-400 transition-colors'}`}>
                        {icon}
                      </span>
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Booking Dropdown */}
          <div className="mb-2">
            <button
              onClick={() => {
                setBookingDropdownOpen(!bookingDropdownOpen);
                setActiveSection('booking');
              }}
              className={`
                w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300
                ${location.pathname.includes('/booking') || activeSection === 'booking'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25 scale-[1.02]' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-white hover:scale-[1.01]'}
              `}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck size={20} className={location.pathname.includes('/booking') || activeSection === 'booking' ? 'text-white' : 'text-pink-400'} />
                <span className="font-semibold">Booking</span>
              </div>
              {bookingDropdownOpen ? <ChevronDown size={18} className="transition-transform duration-200" /> : <ChevronRight size={18} className="transition-transform duration-200" />}
            </button>

            {/* Dropdown Items */}
            {bookingDropdownOpen && (
              <ul className="mt-3 ml-1 space-y-1.5 overflow-hidden">
                {bookingLinks.map(({ to, label, icon }, index) => (
                  <li key={to} 
                    className="transform transition-all duration-200"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <Link
                      to={to}
                      onClick={handleLinkClick}
                      className={`
                        flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm group
                        ${isActive(to) 
                          ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-white font-medium border-l-2 border-pink-500 ml-[-2px] pl-[18px]' 
                          : 'text-slate-400 hover:bg-white/10 hover:text-white hover:translate-x-1'}
                      `}
                    >
                      <span className={`${isActive(to) ? 'text-pink-400' : 'text-slate-500 group-hover:text-pink-400 transition-colors'}`}>
                        {icon}
                      </span>
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      

        {/* Footer Section */}
        <div className="mt-auto p-4 border-t border-white/10 bg-white/5 shrink-0">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-xl p-4 border border-white/5">
            <p className="text-xs text-slate-500 text-center font-medium">
              © 2026 2706 Events
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 z-30 flex items-center justify-center shadow-lg">
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
          2706 Events
        </h2>
      </div>
    </>
  )
}

export default Sidebar
