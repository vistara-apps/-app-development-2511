import React, { useState } from 'react'
import { MapPin, Calendar, Users, Star, Lock } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'
import { usePaymentContext } from '../../hooks/usePaymentContext'

const BundleCard = ({ bundle, onSelect }) => {
  const { subscriptionTier } = useAuth()
  const { createSession } = usePaymentContext()
  const [paid, setPaid] = useState(false)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)

  const isPremium = bundle.price > 2500
  const hasAccess = subscriptionTier !== 'free' || !isPremium || paid

  const handlePayment = async () => {
    if (hasAccess) {
      onSelect(bundle)
      return
    }

    setIsPaymentLoading(true)
    try {
      await createSession(`$${bundle.price}`)
      setPaid(true)
      onSelect(bundle)
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsPaymentLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-250 animate-fade-in">
      <div className="relative">
        <img
          src={bundle.image}
          alt={bundle.propertyName}
          className="w-full h-48 object-cover"
        />
        {isPremium && !hasAccess && (
          <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <Lock className="w-3 h-3 mr-1" />
            Premium
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium">
          ${bundle.price.toLocaleString()}
        </div>
      </div>
      
      <Card.Content className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{bundle.propertyName}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{bundle.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">{bundle.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{bundle.duration}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
            <span>4.8</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {bundle.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
            >
              {feature}
            </span>
          ))}
          {bundle.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{bundle.features.length - 3} more
            </span>
          )}
        </div>
      </Card.Content>
      
      <Card.Footer>
        <Button
          variant={hasAccess ? "primary" : "accent"}
          size="lg"
          className="w-full"
          onClick={handlePayment}
          disabled={isPaymentLoading}
        >
          {isPaymentLoading ? (
            'Processing...'
          ) : hasAccess ? (
            'View Details'
          ) : (
            `Unlock for $${bundle.price}`
          )}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default BundleCard