import React from 'react'
import { clsx } from 'clsx'

// Basic loading spinner
const Spinner = ({ size = 'md', className = '', ...props }) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <svg
      className={clsx(
        'animate-spin text-primary-500',
        sizes[size],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

// Skeleton loader for text
const SkeletonText = ({ lines = 1, className = '', ...props }) => {
  return (
    <div className={clsx('animate-pulse space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            'h-4 bg-gray-200 rounded',
            index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

// Skeleton loader for images
const SkeletonImage = ({ className = '', aspectRatio = 'square', ...props }) => {
  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '16/9': 'aspect-[16/9]',
  }

  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 rounded-lg',
        aspectRatios[aspectRatio],
        className
      )}
      {...props}
    />
  )
}

// Skeleton loader for cards
const SkeletonCard = ({ className = '', showImage = true, textLines = 3, ...props }) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-white rounded-lg border border-gray-200 shadow-card p-6',
        className
      )}
      {...props}
    >
      {showImage && (
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
      )}
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="space-y-2">
          {Array.from({ length: textLines }).map((_, index) => (
            <div
              key={index}
              className={clsx(
                'h-4 bg-gray-200 rounded',
                index === textLines - 1 ? 'w-1/2' : 'w-full'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Loading overlay
const LoadingOverlay = ({ 
  isLoading, 
  children, 
  message = 'Loading...', 
  className = '',
  spinnerSize = 'lg',
  ...props 
}) => {
  return (
    <div className={clsx('relative', className)} {...props}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center space-y-3">
            <Spinner size={spinnerSize} />
            {message && (
              <p className="text-sm text-gray-600 font-medium">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Full page loading
const LoadingPage = ({ 
  message = 'Loading...', 
  className = '',
  spinnerSize = 'xl',
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'min-h-screen flex items-center justify-center bg-bg',
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center space-y-4">
        <Spinner size={spinnerSize} />
        {message && (
          <p className="text-lg text-gray-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  )
}

// Shimmer effect for skeleton loaders
const Shimmer = ({ className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'relative overflow-hidden bg-gray-200 rounded',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer',
        'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className
      )}
      {...props}
    />
  )
}

// Bundle card skeleton specifically for the app
const BundleCardSkeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-10 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

const Loading = {
  Spinner,
  Text: SkeletonText,
  Image: SkeletonImage,
  Card: SkeletonCard,
  Overlay: LoadingOverlay,
  Page: LoadingPage,
  Shimmer,
  BundleCard: BundleCardSkeleton,
}

export default Loading
