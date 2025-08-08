import React, { useState, useEffect } from 'react'
import { X, MapPin, Calendar, Users, Star, CheckCircle } from 'lucide-react'
import Button from '../ui/Button'
import { generateItinerary } from '../../services/aiService'

const BundleDetails = ({ bundle, onClose, onBook }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [customItinerary, setCustomItinerary] = useState('')
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'amenities', label: 'Amenities' }
  ]

  const generateCustomItinerary = async () => {
    setIsGeneratingItinerary(true)
    try {
      const itinerary = await generateItinerary(bundle, 4, ['beach', 'culture', 'adventure'])
      setCustomItinerary(itinerary)
    } catch (error) {
      console.error('Failed to generate itinerary:', error)
    } finally {
      setIsGeneratingItinerary(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'itinerary' && !customItinerary) {
      generateCustomItinerary()
    }
  }, [activeTab])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="relative">
            <img
              src={bundle.image}
              alt={bundle.propertyName}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-md">
              <h2 className="text-xl font-bold">{bundle.propertyName}</h2>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{bundle.location}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About This Experience</h3>
                  <p className="text-gray-600">{bundle.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-gray-600">{bundle.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Family Friendly</div>
                      <div className="text-sm text-gray-600">All ages welcome</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <div>
                      <div className="font-medium">Rating</div>
                      <div className="text-sm text-gray-600">4.8/5 (124 reviews)</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {bundle.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Itinerary</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={generateCustomItinerary}
                    disabled={isGeneratingItinerary}
                  >
                    {isGeneratingItinerary ? 'Generating...' : 'Regenerate'}
                  </Button>
                </div>
                
                {isGeneratingItinerary ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : customItinerary ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-gray-700">{customItinerary}</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bundle.itinerary.map((day, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="text-sm text-gray-700">{day}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Resort Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Family Features</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>Kids Club (ages 4-12)</li>
                      <li>Family Pool with Waterslides</li>
                      <li>Playground & Game Room</li>
                      <li>Baby Equipment Rental</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Resort Facilities</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>Spa & Wellness Center</li>
                      <li>Multiple Restaurants</li>
                      <li>Fitness Center</li>
                      <li>Water Sports Equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${bundle.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total for {bundle.duration}</div>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => onBook(bundle)}
              >
                Book This Experience
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BundleDetails