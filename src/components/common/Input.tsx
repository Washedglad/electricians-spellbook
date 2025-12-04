import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-display text-parchment/90 mb-2">
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={`spell-input ${error ? 'border-danger' : ''} ${className}`}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-danger">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-parchment/60">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

