'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlowBackground } from '@/components/shared/GlowBackground';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  showGlow?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-7xl',
};

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className,
  showGlow = false,
  glowIntensity = 'medium',
  maxWidth = 'full',
}) => {
  return (
    <>
      {showGlow && <GlowBackground intensity={glowIntensity} />}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'min-h-screen',
          'px-4 sm:px-6 lg:px-8',
          'py-8 sm:py-12 lg:py-16',
          className
        )}
      >
        <div className={cn('mx-auto', maxWidthStyles[maxWidth])}>
          {children}
        </div>
      </motion.main>
    </>
  );
};