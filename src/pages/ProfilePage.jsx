import React, { useState } from 'react'
import { User, Calendar, CreditCard, Settings, Heart, MapPin } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'

const ProfilePage = () => {
  const { user, subscriptionTier, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const mockBookings = [
    {
      id: 'b1',
      propertyName: 'Four Seasons Maui',
      location: 'Maui, Hawaii',
      dates: 'June 15-20, 2024',
      status: 'Confirmed',
      price: 2800,
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c926?w=300&h=200&fit=crop'
    },
    {
      id: 'b2',
      propertyName: 'The Ritz-Carlton, Cancun',
      location: 'Cancun, Mexico',
      dates: 'August 10-14, 2024',
      status: 'Pending',
      price: 2200,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'
    }
  ]

  const preferences = {
    destinations: ['Beach', 'Tropical', 'Cultural'],
    activities: ['Water Sports', 'Spa', 'Kids Club', 'Fine Dining'],
    accommodation: ['Ocean View', 'Suite', 'Balcony'],
    familySize: 4,
    budget: '$2000-3000',
    travelStyle: 'Luxury'
  }

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-16">
        <Card className="p-12 text-center max-w-md mx-auto">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to access your profile.</p>
          <Button variant="primary">Connect Wallet</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 space-y-6">
            {/* Profile Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.name || 'Family Traveler'}
                </h2>
                <p className="text-sm text-gray-600">{user?.email || 'member@luxnest.com'}</p>
              </div>
              <div className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full inline-block">
                {subscriptionTier === 'free' ? 'Explorer' : 
                 subscriptionTier === 'premium' ? 'Family VIP' : 'Elite Concierge'}
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </div>
                  <div className="text-center p-4 bg-accent/5 rounded-lg">
                    <div className="text-2xl font-bold text-accent">$8,200</div>
                    <div className="text-sm text-gray-600">Total Saved</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">Countries Visited</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Booking Confirmed</p>
                      <p className="text-xs text-gray-600">Four Seasons Maui - June 15-20, 2024</p>
                    </div>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                    <Heart className="w-5 h-5 text-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Added to Wishlist</p>
                      <p className="text-xs text-gray-600">Atlantis Paradise Island</p>
                    </div>
                    <span className="text-xs text-gray-500">5 days ago</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
                <Button variant="primary">New Booking</Button>
              </div>

              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <Card key={booking.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.image}
                        alt={booking.propertyName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{booking.propertyName}</h4>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{booking.dates}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          ${booking.price.toLocaleString()}
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Travel Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Destinations
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {preferences.destinations.map((dest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favorite Activities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {preferences.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Family Size
                    </label>
                    <input
                      type="number"
                      value={preferences.familySize}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <input
                      type="text"
                      value={preferences.budget}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      readOnly
                    />
                  </div>
                </div>

                <Button variant="primary">Update Preferences</Button>
              </div>
            </Card>
          )}

          {activeTab === 'billing' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing Information</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Current Subscription</h4>
                  <p className="text-gray-600">
                    {subscriptionTier === 'free' ? 'Explorer (Free)' : 
                     subscriptionTier === 'premium' ? 'Family VIP - $99/month' : 
                     'Elite Concierge - $199/month'}
                  </p>
                  {subscriptionTier !== 'free' && (
                    <p className="text-sm text-gray-500 mt-1">Next billing date: March 15, 2024</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Payment History</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-900">February 2024 - Family VIP</span>
                      <span className="text-sm font-medium">$99.00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-900">January 2024 - Family VIP</span>
                      <span className="text-sm font-medium">$99.00</span>
                    </div>
                  </div>
                </div>

                <Button variant="secondary">Manage Billing</Button>
              </div>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700">Email notifications for new bundles</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700">Booking confirmations</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm text-gray-700">Marketing emails</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Privacy</h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm text-gray-700">Allow concierge to access my preferences</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm text-gray-700">Share my experience for testimonials</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button variant="danger">Delete Account</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage