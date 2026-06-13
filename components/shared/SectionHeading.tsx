import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  gradient?: boolean;
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className,
  align = 'left',
  gradient = true,
}) => {
  return (
    <div className={cn('space-y-2', alignStyles[align], className)}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
          gradient
            ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'
            : 'text-white'
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};