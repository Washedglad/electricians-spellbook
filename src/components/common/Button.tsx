import { ReactNode, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { soundManager } from '../../utils/sounds'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-display font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-gold to-amber-500 text-primary-dark shadow-lg shadow-accent-gold/30 hover:shadow-candlelight hover:scale-105 active:scale-95 border-2 border-amber-600/50',
    secondary: 'bg-gradient-to-r from-secondary-green to-emerald-700 text-parchment shadow-lg hover:shadow-magical hover:scale-105 active:scale-95 border-2 border-emerald-800/50',
    danger: 'bg-gradient-to-r from-danger to-red-900 text-parchment shadow-lg hover:shadow-red-900/50 hover:scale-105 active:scale-95 border-2 border-red-950/50',
    ghost: 'bg-transparent text-parchment hover:bg-primary-dark/30 border border-accent-gold/30 hover:border-accent-gold/50',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playClick()
    if (props.onClick) {
      props.onClick(e)
    }
  }

  const { 
    onClick, 
    onAnimationStart, 
    onAnimationEnd, 
    onAnimationIteration,
    ...restProps 
  } = props

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      type={restProps.type || 'button'}
      onClick={handleClick}
      {...restProps}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Casting...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  )
}

