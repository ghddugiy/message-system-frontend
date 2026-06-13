'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type QuickTimeOption = '1hour' | '6hours' | '1day' | '1week' | '1month' | 'custom';

interface QuickTimeSelectorProps {
  selected: QuickTimeOption;
  onSelect: (option: QuickTimeOption) => void;
  className?: string;
}

const timeOptions = [
  { value: '1hour' as QuickTimeOption, label: '1 Hour', icon: Clock },
  { value: '6hours' as QuickTimeOption, label: '6 Hours', icon: Clock },
  { value: '1day' as QuickTimeOption, label: '1 Day', icon: Sun },
  { value: '1week' as QuickTimeOption, label: '1 Week', icon: Calendar },
  { value: '1month' as QuickTimeOption, label: '1 Month', icon: Calendar },
  { value: 'custom' as QuickTimeOption, label: 'Custom', icon: Moon },
];

export const QuickTimeSelector: React.FC<QuickTimeSelectorProps> = ({
  selected,
  onSelect,
  className,
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-medium text-slate-400">Quick Select</p>
      <div className="grid grid-cols-3 gap-2">
        {timeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = selected === option.value;

          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'relative overflow-hidden rounded-xl p-3 font-medium text-sm transition-all duration-300',
                'flex flex-col items-center justify-center space-y-1',
                isActive
                  ? 'text-white bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500/30'
                  : 'text-slate-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="quicktime-indicator"
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{option.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};