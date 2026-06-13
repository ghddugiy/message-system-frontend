'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TrendDirection = 'up' | 'down' | 'neutral';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
  className?: string;
  delay?: number;
}

const trendStyles = {
  up: 'text-green-400 bg-green-500/10',
  down: 'text-red-400 bg-red-500/10',
  neutral: 'text-slate-400 bg-slate-500/10',
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-slate-900/90 to-slate-800/90',
        'backdrop-blur-xl',
        'border border-white/10',
        'p-6',
        'transition-all duration-300',
        'hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]',
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Icon */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center space-x-1 px-2 py-1 rounded-lg text-sm font-medium',
              trendStyles[trend.direction]
            )}
          >
            {trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-1">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
};