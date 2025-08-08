import React, { forwardRef } from 'react'
import { clsx } from 'clsx'

const Input = forwardRef(({ 
  className = '', 
  type = 'text',
  size = 'md',
  variant = 'default',
  error = false,
  disabled = false,
  leftIcon,
  rightIcon,
  placeholder,
  ...props 
}, ref) => {
  const baseClasses = 'block w-full rounded-md border transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: clsx(
      'border-gray-300 bg-white text-gray-900 placeholder-gray-500',
      'focus:border-primary-500 focus:ring-primary-500',
      error && 'border-error-500 focus:border-error-500 focus:ring-error-500'
    ),
    filled: clsx(
      'border-transparent bg-gray-100 text-gray-900 placeholder-gray-500',
      'focus:bg-white focus:border-primary-500 focus:ring-primary-500',
      error && 'bg-error-50 border-error-500 focus:border-error-500 focus:ring-error-500'
    ),
    ghost: clsx(
      'border-transparent bg-transparent text-gray-900 placeholder-gray-500',
      'focus:border-primary-500 focus:ring-primary-500 focus:bg-white',
      error && 'border-error-500 focus:border-error-500 focus:ring-error-500'
    ),
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  }

  const paddingWithIcons = clsx({
    [sizes[size]]: !leftIcon && !rightIcon,
    [`pl-10 pr-4 py-2.5 text-sm`]: size === 'md' && leftIcon && !rightIcon,
    [`pl-4 pr-10 py-2.5 text-sm`]: size === 'md' && !leftIcon && rightIcon,
    [`pl-10 pr-10 py-2.5 text-sm`]: size === 'md' && leftIcon && rightIcon,
    [`pl-9 pr-3 py-2 text-sm`]: size === 'sm' && leftIcon && !rightIcon,
    [`pl-3 pr-9 py-2 text-sm`]: size === 'sm' && !leftIcon && rightIcon,
    [`pl-9 pr-9 py-2 text-sm`]: size === 'sm' && leftIcon && rightIcon,
    [`pl-10 pr-4 py-3 text-base`]: size === 'lg' && leftIcon && !rightIcon,
    [`pl-4 pr-10 py-3 text-base`]: size === 'lg' && !leftIcon && rightIcon,
    [`pl-10 pr-10 py-3 text-base`]: size === 'lg' && leftIcon && rightIcon,
  })

  if (leftIcon || rightIcon) {
    return (
      <div className="relative">
        {leftIcon && (
          <div className={clsx(
            'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400',
            iconSizes[size]
          )}>
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={clsx(
            baseClasses,
            variants[variant],
            paddingWithIcons,
            className
          )}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />
        {rightIcon && (
          <div className={clsx(
            'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400',
            iconSizes[size]
          )}>
            {rightIcon}
          </div>
        )}
      </div>
    )
  }

  return (
    <input
      type={type}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input
