import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [subscriptionTier, setSubscriptionTier] = useState('free')

  const login = (userData) => {
    setUser(userData)
    setSubscriptionTier(userData.subscriptionTier || 'free')
  }

  const logout = () => {
    setUser(null)
    setSubscriptionTier('free')
  }

  const updateSubscription = (tier) => {
    setSubscriptionTier(tier)
    if (user) {
      setUser({ ...user, subscriptionTier: tier })
    }
  }

  const value = {
    user,
    subscriptionTier,
    isAuthenticated: !!user,
    login,
    logout,
    updateSubscription
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}