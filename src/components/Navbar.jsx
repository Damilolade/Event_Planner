import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, User, CalendarCheck, Phone } from "lucide-react";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/about", label: "About", icon: <User size={18} /> },
    { to: "/booking", label: "Booking", icon: <CalendarCheck size={18} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-green-600 text-white px-4 md:px-6 py-3 md:py-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src={logo}
            alt="Event Planner Logo"
            className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover border-2 border-white"
          />
          <h1 className="text-lg md:text-xl font-bold tracking-wide">
            <span className="text-yellow-300">2706</span>
            Events
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-2 transition-all duration-200 hover:text-yellow-300 ${
                    isActive(to) ? "text-yellow-300 font-semibold" : ""
                  }`}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-2 pb-4">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-green-700 hover:text-yellow-300 ${
                  isActive(to)
                    ? "bg-green-700 text-yellow-300 font-semibold"
                    : ""
                }`}
              >
                {icon}
                <span className="text-base">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
