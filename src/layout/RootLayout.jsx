import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="lg:ml-64 pt-16 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout

