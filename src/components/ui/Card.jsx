import React from 'react'
import { clsx } from 'clsx'

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default',
  hover = false,
  clickable = false,
  ...props 
}) => {
  const variants = {
    default: 'bg-surface border border-gray-200 shadow-card',
    elevated: 'bg-surface border border-gray-200 shadow-lg',
    outlined: 'bg-surface border-2 border-gray-300 shadow-sm',
    ghost: 'bg-transparent border border-gray-200',
    gradient: 'bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 shadow-card',
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  }

  const interactiveClasses = clsx({
    'transition-all duration-250': hover || clickable,
    'hover:shadow-card-hover hover:-translate-y-1': hover,
    'cursor-pointer': clickable,
    'hover:shadow-card-hover active:scale-[0.98]': clickable,
  })

  return (
    <div
      className={clsx(
        'rounded-lg',
        variants[variant],
        paddingClasses[padding],
        interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = '', divider = true, ...props }) => {
  return (
    <div
      className={clsx(
        'px-6 py-4',
        divider && 'border-b border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CardFooter = ({ children, className = '', divider = true, ...props }) => {
  return (
    <div
      className={clsx(
        'px-6 py-4',
        divider && 'border-t border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={clsx('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={clsx('text-sm text-gray-600 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  )
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Title = CardTitle
Card.Description = CardDescription

export default Card
