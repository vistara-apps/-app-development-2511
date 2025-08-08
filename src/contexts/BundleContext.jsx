import React, { createContext, useContext, useState } from 'react'

const BundleContext = createContext()

export const useBundle = () => {
  const context = useContext(BundleContext)
  if (!context) {
    throw new Error('useBundle must be used within a BundleProvider')
  }
  return context
}

export const BundleProvider = ({ children }) => {
  const [selectedBundle, setSelectedBundle] = useState(null)
  const [bundles] = useState([
    {
      bundleId: 'b1',
      inventoryId: 'inv1',
      propertyName: 'Four Seasons Maui',
      location: 'Maui, Hawaii',
      price: 2800,
      currency: 'USD',
      duration: '5 days, 4 nights',
      description: 'Oceanfront luxury with family-friendly amenities and curated activities',
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c926?w=800&h=500&fit=crop',
      features: ['Ocean View', 'Kids Club', 'Family Pool', 'Snorkeling'],
      validUntil: '2024-06-30',
      itinerary: [
        'Day 1: Arrival & Welcome Reception',
        'Day 2: Ocean Adventures & Beach Time',
        'Day 3: Cultural Tour & Family Activities',
        'Day 4: Spa Day & Private Beach Dinner',
        'Day 5: Departure'
      ]
    },
    {
      bundleId: 'b2',
      inventoryId: 'inv2',
      propertyName: 'The Ritz-Carlton, Cancun',
      location: 'Cancun, Mexico',
      price: 2200,
      currency: 'USD',
      duration: '4 days, 3 nights',
      description: 'All-inclusive luxury with Mayan cultural experiences',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop',
      features: ['All-Inclusive', 'Kids Program', 'Water Sports', 'Cultural Tours'],
      validUntil: '2024-07-15',
      itinerary: [
        'Day 1: Arrival & Resort Orientation',
        'Day 2: Mayan Ruins Adventure',
        'Day 3: Water Park & Beach Activities',
        'Day 4: Departure'
      ]
    },
    {
      bundleId: 'b3',
      inventoryId: 'inv3',
      propertyName: 'Atlantis Paradise Island',
      location: 'Bahamas',
      price: 3200,
      currency: 'USD',
      duration: '6 days, 5 nights',
      description: 'Aquatic wonderland with marine life encounters',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop',
      features: ['Aquarium Access', 'Water Slides', 'Dolphin Encounter', 'Kids Zone'],
      validUntil: '2024-08-01',
      itinerary: [
        'Day 1: Arrival & Aquarium Tour',
        'Day 2: Water Park Adventures',
        'Day 3: Dolphin Encounter',
        'Day 4: Island Exploration',
        'Day 5: Beach & Relaxation',
        'Day 6: Departure'
      ]
    }
  ])

  const selectBundle = (bundle) => {
    setSelectedBundle(bundle)
  }

  const value = {
    bundles,
    selectedBundle,
    selectBundle
  }

  return (
    <BundleContext.Provider value={value}>
      {children}
    </BundleContext.Provider>
  )
}