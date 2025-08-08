import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Users, Shield, Star } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Loading from '../components/ui/Loading'
import { useBundle } from '../contexts/BundleContext'
import BundleCard from '../components/bundles/BundleCard'
import BundleDetails from '../components/bundles/BundleDetails'
import { useToast } from '../components/ui/Toast'

const HomePage = () => {
  const { bundles, isLoading } = useBundle()
  const { success: showSuccess } = useToast()
  const [selectedBundle, setSelectedBundle] = useState(null)

  const features = [
    {
      icon: Sparkles,
      title: 'Curated Luxury',
      description: 'Access to unsold inventory from top-tier resorts at exclusive rates'
    },
    {
      icon: Users,
      title: 'Family-Centric',
      description: 'Every experience is designed with families in mind, from activities to accommodations'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'All properties are vetted for quality standards and family-friendly amenities'
    }
  ]

  const stats = [
    { label: 'Luxury Properties', value: '500+' },
    { label: 'Happy Families', value: '10K+' },
    { label: 'Countries', value: '25+' },
    { label: 'Average Savings', value: '40%' }
  ]

  const handleBookBundle = (bundle) => {
    showSuccess(`Booking initiated for ${bundle.propertyName}! Redirecting to booking flow...`)
    // This would redirect to booking flow in a real app
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-bg to-accent/10">
        <div className="container-custom py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Luxury Family
                  <span className="text-primary"> Vacations</span>
                  <br />
                  Made Accessible
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Unlock unsold luxury resort inventory and transform it into curated, 
                  family-friendly vacations—affordable, seamless, and high-value.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/bundles">
                  <Button 
                    variant="primary" 
                    size="xl" 
                    className="group shadow-button hover:shadow-button-hover"
                    rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />}
                  >
                    Explore Bundles
                  </Button>
                </Link>
                <Link to="/membership">
                  <Button 
                    variant="secondary" 
                    size="xl"
                    className="shadow-button hover:shadow-button-hover"
                  >
                    View Membership
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&q=80"
                alt="Luxury resort with family"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-surface p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">4.8/5</span>
                  <span className="text-gray-600">from 10K+ families</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose LuxNest?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make luxury family travel accessible through curated experiences and exclusive access
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="p-8 text-center group transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2"
                hover
              >
                <div className="w-16 h-16 bg-primary-50 border border-primary-200 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary-600 group-hover:text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Experiences</h2>
            <p className="text-gray-600 mt-2">Handpicked luxury bundles for your next family adventure</p>
          </div>
          <Link to="/bundles">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Loading.BundleCard key={index} />
            ))
          ) : (
            bundles.slice(0, 3).map((bundle) => (
              <BundleCard
                key={bundle.bundleId}
                bundle={bundle}
                onSelect={setSelectedBundle}
              />
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent">
        <div className="container-custom py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Ready to Create Unforgettable Family Memories?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of families who have discovered luxury travel that's both accessible and extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership">
                <Button 
                  variant="secondary" 
                  size="xl"
                  className="shadow-button hover:shadow-button-hover"
                >
                  Start Your Membership
                </Button>
              </Link>
              <Link to="/bundles">
                <Button 
                  variant="ghost" 
                  size="xl" 
                  className="text-white border-white hover:bg-white/10 hover:shadow-button-hover transition-all duration-200"
                >
                  Browse Experiences
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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

export default HomePage
