import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom'
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import BookingSummary from './components/BookingSummary';
import DeleteSelector from './components/DeleteSelector';
import GuestSelector from './components/GuestSelector';
import Payment from './components/Payment';
import ErrorBoundary from './components/ErrorBoundary';

// Import booking pages
import Booking from './pages/booking/Booking';
import BookingList from './pages/booking/BookingList';
import BookingCard from './pages/booking/BookingCard';
import EventList from './pages/booking/EventList';
import EventDetails from './pages/booking/EventDetails';
import Confirmation from './pages/booking/Confirmation';
import CheckOut from './pages/booking/CheckOut';
import ProtectedBookingRoute from './components/ProtectedBookingRoute';
import SignUp from './pages/booking/SignUp';
import Login from './pages/booking/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound';

// DEBUG: Validating router configuration
console.log('Router configuration starting...');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      {/* DEBUG: Added catch-all route for 404 */}
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      
      {/* Main booking page */}
      <Route path='booking' element={<Booking />} />
      <Route path='booking/services' element={<Booking />} />
      
      {/* Public booking routes */}
      <Route path='booking'>
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login />} />
        <Route path='bookingsummary' element={<BookingSummary />} />
        <Route path='deleteselector' element={<DeleteSelector />} />
        <Route path='guestselector' element={<GuestSelector />} />
        <Route path='payment' element={<Payment />} />
        <Route path='eventlist' element={<EventList />} />
        <Route path='eventdetails' element={<EventDetails />} />
        <Route path='confirmation' element={<Confirmation />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>

      {/* Protected booking routes */}
      <Route element={
        <ProtectedBookingRoute>
          <Outlet />
        </ProtectedBookingRoute>
      }>
        <Route path='booking/bookinglist' element={<BookingList />} />
        <Route path='booking/bookingcard' element={<BookingCard />} />
        <Route path='booking/dashboard' element={<Dashboard />} />
        <Route path='booking/dashboard/checkout' element={<CheckOut />} />
      </Route>

      {/* Catch-all route for 404 - must be last */}
      <Route path='*' element={<PageNotFound />} />
    </Route>
  )
)

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App
