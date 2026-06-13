import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const intensityStyles = {
  low: 'opacity-30',
  medium: 'opacity-50',
  high: 'opacity-70',
};

export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  className,
  intensity = 'medium',
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 overflow-hidden',
        'bg-slate-950',
        className
      )}
    >
      <motion.div
        className={cn(
          'absolute top-0 left-1/4 w-96 h-96 rounded-full',
          'bg-blue-600 blur-3xl',
          intensityStyles[intensity]
        )}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={cn(
          'absolute top-1/3 right-1/4 w-96 h-96 rounded-full',
          'bg-purple-600 blur-3xl',
          intensityStyles[intensity]
        )}
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className={cn(
          'absolute bottom-0 left-1/3 w-96 h-96 rounded-full',
          'bg-cyan-600 blur-3xl',
          intensityStyles[intensity]
        )}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      <motion.div
        className={cn(
          'absolute top-1/2 left-1/2 w-80 h-80 rounded-full',
          'bg-pink-600 blur-3xl',
          intensityStyles[intensity]
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [intensity === 'low' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7, 0.8, intensity === 'low' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};