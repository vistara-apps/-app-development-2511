import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { 
  Home, 
  Package, 
  Crown, 
  User, 
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const AppShell = ({ children, variant = 'default' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated } = useAuth()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Bundles', href: '/bundles', icon: Package },
    { name: 'Membership', href: '/membership', icon: Crown },
    { name: 'Profile', href: '/profile', icon: User }
  ]

  const isActive = (path) => location.pathname === path

  const shellClasses = variant === 'glass' 
    ? 'bg-surface/80 backdrop-blur-lg border border-white/20' 
    : 'bg-surface shadow-card'

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className={`sticky top-0 z-50 ${shellClasses}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-display text-primary font-bold">LuxNest</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Wallet Connection & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <ConnectButton />
              </div>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden p-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 active:bg-primary-100 transition-all duration-200 touch-manipulation"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-200 animate-slide-down">
              <nav className="flex flex-col space-y-1">
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 touch-manipulation ${
                        isActive(item.href)
                          ? 'text-primary-700 bg-primary-50 border-l-4 border-primary-500'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50 active:bg-primary-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="px-4">
                  <ConnectButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-gray-200">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Crown className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold text-primary">LuxNest Family</span>
              </div>
              <p className="text-sm text-gray-600">
                Unlock unsold luxury resort inventory and transform it into curated, 
                family-friendly vacations—affordable, seamless, and high-value.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Luxury Bundles</li>
                <li>Concierge Planning</li>
                <li>Family Experiences</li>
                <li>Membership Tiers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Booking Support</li>
                <li>Cancellation Policy</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Partners</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2024 LuxNest Family. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AppShell
