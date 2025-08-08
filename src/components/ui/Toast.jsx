import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  className = '',
  showIcon = true,
  closable = true,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const variants = {
    success: 'bg-success-50 border-success-200 text-success-800',
    error: 'bg-error-50 border-error-200 text-error-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    info: 'bg-primary-50 border-primary-200 text-primary-800',
  }

  const iconColors = {
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-primary-500',
  }

  const Icon = icons[type]

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300) // Wait for fade out animation
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  return (
    <div
      className={clsx(
        'flex items-start p-4 rounded-lg border shadow-sm transition-all duration-300',
        variants[type],
        isVisible ? 'animate-slide-down opacity-100' : 'animate-fade-out opacity-0',
        className
      )}
      {...props}
    >
      {showIcon && Icon && (
        <Icon className={clsx('w-5 h-5 mr-3 mt-0.5 flex-shrink-0', iconColors[type])} />
      )}
      
      <div className="flex-1 text-sm font-medium">
        {message}
      </div>
      
      {closable && (
        <button
          onClick={handleClose}
          className="ml-3 flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors duration-200"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// Toast Container for managing multiple toasts
const ToastContainer = ({ toasts = [], position = 'top-right', className = '' }) => {
  const positions = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  }

  return (
    <div
      className={clsx(
        'fixed z-50 pointer-events-none',
        positions[position],
        className
      )}
    >
      <div className="space-y-3 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  )
}

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Date.now() + Math.random()
    const newToast = { id, ...toast }
    
    setToasts((prev) => [...prev, newToast])
    
    return id
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const success = (message, options = {}) => {
    return addToast({ type: 'success', message, ...options })
  }

  const error = (message, options = {}) => {
    return addToast({ type: 'error', message, ...options })
  }

  const warning = (message, options = {}) => {
    return addToast({ type: 'warning', message, ...options })
  }

  const info = (message, options = {}) => {
    return addToast({ type: 'info', message, ...options })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}

Toast.Container = ToastContainer

export default Toast
