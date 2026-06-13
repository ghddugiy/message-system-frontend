import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantStyles = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500',
  secondary: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500',
  outline: 'border-2 border-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10',
  ghost: 'text-white hover:bg-white/10',
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900',
        sizeStyles[size],
        variantStyles[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};