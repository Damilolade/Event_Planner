import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

// Check if Firebase auth is available at module load time
const isAuthConfigured = auth !== null && auth !== undefined

const ProtectedBookingRoute = ({ children }) => {
  const [loading, setLoading] = useState(isAuthConfigured)
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthConfigured)

  useEffect(() => {
    // Skip auth check if Firebase is not configured
    if (!isAuthConfigured) {
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
      setLoading(false)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  // If auth not configured, render children immediately
  if (!isAuthConfigured) {
    return children
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-yellow-400">Loading...</div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedBookingRoute
