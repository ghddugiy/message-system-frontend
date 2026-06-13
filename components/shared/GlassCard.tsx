import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: 'blue' | 'purple' | 'cyan' | 'pink';
}

const glowColors = {
  blue: 'shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]',
  purple: 'shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)]',
  cyan: 'shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]',
  pink: 'shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)]',
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  glowColor = 'blue',
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-slate-900/80 to-slate-800/80',
        'backdrop-blur-xl',
        'border border-white/10',
        glow && glowColors[glowColor],
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};