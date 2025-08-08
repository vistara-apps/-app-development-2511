import React from 'react'
import { clsx } from 'clsx'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-sm',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-primary shadow-sm',
    accent: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent shadow-sm',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button