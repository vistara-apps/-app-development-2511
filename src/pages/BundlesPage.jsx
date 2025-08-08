import React, { useState } from 'react'
import { Search, Filter, MapPin, Calendar, DollarSign } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import BundleCard from '../components/bundles/BundleCard'
import BundleDetails from '../components/bundles/BundleDetails'
import { useBundle } from '../contexts/BundleContext'

const BundlesPage = () => {
  const { bundles } = useBundle()
  const [selectedBundle, setSelectedBundle] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const locations = ['all', 'Hawaii', 'Mexico', 'Caribbean', 'Florida']
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under-2500', label: 'Under $2,500' },
    { value: '2500-3000', label: '$2,500 - $3,000' },
    { value: 'over-3000', label: 'Over $3,000' }
  ]

  const filteredBundles = bundles.filter((bundle) => {
    const matchesSearch = bundle.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bundle.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = locationFilter === 'all' || 
                           bundle.location.toLowerCase().includes(locationFilter.toLowerCase())
    
    let matchesPrice = true
    if (priceFilter === 'under-2500') matchesPrice = bundle.price < 2500
    else if (priceFilter === '2500-3000') matchesPrice = bundle.price >= 2500 && bundle.price <= 3000
    else if (priceFilter === 'over-3000') matchesPrice = bundle.price > 3000

    return matchesSearch && matchesLocation && matchesPrice
  })

  const handleBookBundle = (bundle) => {
    alert(`Booking ${bundle.propertyName} - This would redirect to booking flow`)
  }

  return (
    <div className="container-custom py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Luxury Family Experiences</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover curated vacation bundles from the world's finest resorts, 
          designed specifically for families seeking unforgettable experiences.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search destinations or properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <div className="text-sm text-gray-600">
              {filteredBundles.length} of {bundles.length} experiences
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Price Range
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Duration
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Any Duration</option>
                  <option>3-4 Days</option>
                  <option>5-6 Days</option>
                  <option>7+ Days</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      {filteredBundles.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No experiences found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchTerm('')
                setPriceFilter('all')
                setLocationFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBundles.map((bundle) => (
            <BundleCard
              key={bundle.bundleId}
              bundle={bundle}
              onSelect={setSelectedBundle}
            />
          ))}
        </div>
      )}

      {/* Bundle Details Modal */}
      {selectedBundle && (
        <BundleDetails
          bundle={selectedBundle}
          onClose={() => setSelectedBundle(null)}
          onBook={handleBookBundle}
        />
      )}
    </div>
  )
}

export default BundlesPage