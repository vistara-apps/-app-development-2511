import React, { useState } from 'react'
import { Check, Crown, Star, Sparkles, Users } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'
import { usePaymentContext } from '../hooks/usePaymentContext'

const MembershipPage = () => {
  const { subscriptionTier, updateSubscription } = useAuth()
  const { createSession } = usePaymentContext()
  const [isUpgrading, setIsUpgrading] = useState(false)

  const membershipTiers = [
    {
      id: 'free',
      name: 'Explorer',
      icon: Users,
      price: 0,
      period: 'Forever',
      description: 'Perfect for trying out our curated experiences',
      features: [
        'Access to basic bundle listings',
        'Standard customer support',
        'Basic property information',
        'Limited to 3 inquiries per month'
      ],
      limitations: [
        'No access to premium properties ($2500+)',
        'No concierge planning',
        'No early access to inventory'
      ],
      color: 'gray'
    },
    {
      id: 'premium',
      name: 'Family VIP',
      icon: Star,
      price: 99,
      period: 'per month',
      description: 'For families who travel frequently and want premium access',
      features: [
        'Access to ALL luxury properties',
        'Concierge planning assistance',
        'Early access to new inventory',
        'Priority customer support',
        'Unlimited inquiries',
        'Exclusive member rates',
        'Custom itinerary generation'
      ],
      limitations: [],
      color: 'primary',
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite Concierge',
      icon: Crown,
      price: 199,
      period: 'per month',
      description: 'Ultimate luxury with dedicated concierge and exclusive perks',
      features: [
        'Everything in Family VIP',
        'Dedicated personal concierge',
        'Exclusive elite-only properties',
        'Complimentary upgrades',
        'Priority booking guarantees',
        'Custom family travel planning',
        'White-glove service',
        '24/7 travel support'
      ],
      limitations: [],
      color: 'accent'
    }
  ]

  const handleUpgrade = async (tier) => {
    if (tier.id === 'free') {
      updateSubscription('free')
      return
    }

    setIsUpgrading(true)
    try {
      await createSession(`$${tier.price}`)
      updateSubscription(tier.id)
      alert(`Successfully upgraded to ${tier.name}!`)
    } catch (error) {
      console.error('Upgrade failed:', error)
      alert('Upgrade failed. Please try again.')
    } finally {
      setIsUpgrading(false)
    }
  }

  const benefits = [
    {
      icon: Sparkles,
      title: 'Exclusive Access',
      description: 'Get first access to unsold luxury inventory before it goes public'
    },
    {
      icon: Users,
      title: 'Family-First Design',
      description: 'Every property and experience is vetted for family-friendly amenities'
    },
    {
      icon: Crown,
      title: 'Concierge Planning',
      description: 'Personal travel experts help plan every detail of your perfect family vacation'
    }
  ]

  return (
    <div className="container-custom py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Choose Your Membership</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Unlock exclusive access to luxury family experiences with membership tiers 
          designed to match your travel style and frequency.
        </p>
      </div>

      {/* Current Membership Status */}
      {subscriptionTier !== 'free' && (
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Membership</h3>
              <p className="text-gray-600">
                You're currently on the{' '}
                <span className="font-medium text-primary">
                  {membershipTiers.find(t => t.id === subscriptionTier)?.name}
                </span>{' '}
                plan
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary">Active Member</span>
            </div>
          </div>
        </Card>
      )}

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {membershipTiers.map((tier) => {
          const Icon = tier.icon
          const isCurrentTier = subscriptionTier === tier.id
          const colorClasses = {
            gray: 'border-gray-200',
            primary: 'border-primary ring-2 ring-primary/20',
            accent: 'border-accent ring-2 ring-accent/20'
          }

          return (
            <Card 
              key={tier.id} 
              className={`relative overflow-hidden ${colorClasses[tier.color]} ${
                tier.popular ? 'transform scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <Card.Content className={`space-y-6 ${tier.popular ? 'pt-12' : 'pt-6'}`}>
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    tier.color === 'gray' ? 'bg-gray-100' :
                    tier.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      tier.color === 'gray' ? 'text-gray-600' :
                      tier.color === 'primary' ? 'text-primary' : 'text-accent'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl font-bold text-gray-900">
                      ${tier.price}
                    </span>
                    <span className="text-gray-600">/{tier.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  {isCurrentTier ? (
                    <Button variant="ghost" size="lg" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant={tier.color === 'gray' ? 'secondary' : 'primary'}
                      size="lg"
                      className="w-full"
                      onClick={() => handleUpgrade(tier)}
                      disabled={isUpgrading}
                    >
                      {isUpgrading ? 'Processing...' : 
                       tier.id === 'free' ? 'Downgrade' : 'Upgrade Now'}
                    </Button>
                  )}
                </div>
              </Card.Content>
            </Card>
          )
        })}
      </div>

      {/* Benefits Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Become a Member?</h2>
          <p className="text-gray-600 mt-2">Exclusive benefits designed for luxury family travel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Can I change my membership tier?</h4>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your membership at any time. Changes take effect immediately.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">What happens to my bookings if I downgrade?</h4>
            <p className="text-gray-600">All existing bookings remain valid. However, you'll lose access to premium features for future bookings.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Is there a long-term commitment?</h4>
            <p className="text-gray-600">No, all memberships are month-to-month with no long-term commitment required.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default MembershipPage