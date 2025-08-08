import React, { useState } from 'react'
import { MapPin, Calendar, Users, Star, Lock, Heart } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import { useAuth } from '../../contexts/AuthContext'
import { usePaymentContext } from '../../hooks/usePaymentContext'
import { useToast } from '../ui/Toast'

const BundleCard = ({ bundle, onSelect, className = '' }) => {
  const { subscriptionTier } = useAuth()
  const { createSession } = usePaymentContext()
  const { error: showError, success: showSuccess } = useToast()
  const [paid, setPaid] = useState(false)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

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
      showSuccess('Payment successful! Bundle unlocked.')
      onSelect(bundle)
    } catch (error) {
      console.error('Payment failed:', error)
      showError('Payment failed. Please try again.')
    } finally {
      setIsPaymentLoading(false)
    }
  }

  const handleFavoriteToggle = (e) => {
    e.stopPropagation()
    setIsFavorited(!isFavorited)
    showSuccess(isFavorited ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleCardClick = () => {
    if (hasAccess) {
      onSelect(bundle)
    }
  }

  return (
    <Card 
      className={`overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-in ${className}`}
      onClick={handleCardClick}
      clickable={hasAccess}
    >
      <div className="relative">
        {/* Image with loading state */}
        <div className="relative w-full h-48 bg-gray-200">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading.Spinner size="md" />
            </div>
          )}
          <img
            src={bundle.image}
            alt={bundle.propertyName}
            className={`w-full h-48 object-cover transition-all duration-300 group-hover:scale-105 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Premium badge */}
        {isPremium && !hasAccess && (
          <div className="absolute top-4 right-4 bg-accent-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center shadow-sm animate-bounce-subtle">
            <Lock className="w-3 h-3 mr-1" />
            Premium
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorited 
              ? 'bg-error-500 text-white shadow-lg' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-error-500'
          }`}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Price badge */}
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg">
          ${bundle.price.toLocaleString()}
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-lg text-xs font-medium flex items-center shadow-sm">
          <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
          4.8
        </div>
      </div>
      
      <Card.Content className="space-y-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {bundle.propertyName}
          </h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span className="text-sm">{bundle.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {bundle.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
            <span>{bundle.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-gray-400" />
            <span>2-4 guests</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {bundle.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium border border-primary-200 transition-colors duration-200 hover:bg-primary-100"
            >
              {feature}
            </span>
          ))}
          {bundle.features.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium border border-gray-200">
              +{bundle.features.length - 3} more
            </span>
          )}
        </div>
      </Card.Content>
      
      <Card.Footer className="p-6 pt-0">
        <Button
          variant={hasAccess ? "primary" : "accent"}
          size="lg"
          fullWidth
          onClick={(e) => {
            e.stopPropagation()
            handlePayment()
          }}
          loading={isPaymentLoading}
          disabled={!hasAccess && isPremium}
          className="group-hover:shadow-button-hover transition-all duration-200"
        >
          {hasAccess ? (
            'View Details'
          ) : (
            `Unlock for $${bundle.price.toLocaleString()}`
          )}
        </Button>
        
        {!hasAccess && isPremium && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Premium membership required
          </p>
        )}
      </Card.Footer>
    </Card>
  )
}

export default BundleCard
