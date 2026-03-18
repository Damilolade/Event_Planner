import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Home, User, CalendarCheck, Phone } from 'lucide-react'
import logo from '../assets/logo.jpg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/',  icon: <Home size={18} /> },
    { to: '/about',  icon: <User size={18} /> },
    { to: '/booking', label: 'Booking', icon: <CalendarCheck size={18} /> },
    { to: '/contact',  icon: <Phone size={18} /> },
  ];

  return (
    <div className='bg-green-600 text-white px-6 py-4 fixed top-0 left-0 w-full z-10 shadow-md'>
      <div className='flex justify-between items-center'>

        {/* Logo + Title */}
        <div className='flex items-center gap-3'>
          <img
            src={logo}
            alt='Event Planner Logo'
            className='h-10 w-10 rounded-full object-cover border-2 border-white'
          />
          <h1 className='text-xl font-bold tracking-wide'>
            <span className='text-yellow-300'>2706</span>
            Events
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className='hidden md:flex'>
          <ul className='flex space-x-8 items-center'>
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className='flex items-center gap-2 hover:text-yellow-300 transition'
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Button (Mobile) */}
        <button
          className='md:hidden focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav className='md:hidden mt-4'>
          <ul className='flex flex-col space-y-3 pb-4'>
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className='flex items-center gap-2 hover:text-yellow-300 transition'
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

export default Navbar