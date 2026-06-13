'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Mail, Calendar, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { GradientButton } from '@/components/shared/GradientButton';

interface NextDispatchCardProps {
  recipient: string;
  message: string;
  deliveryDate: Date;
  className?: string;
}

export const NextDispatchCard: React.FC<NextDispatchCardProps> = ({
  recipient,
  message,
  deliveryDate,
  className,
}) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const delivery = deliveryDate.getTime();
      const difference = delivery - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [deliveryDate]);

  const formatMessagePreview = (text: string, maxLength: number = 80) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={className}
    >
      <GlassCard glow glowColor="purple" className="p-6 h-full">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm font-medium text-purple-400">
              <Clock className="w-4 h-4" />
              <span>Next Dispatch</span>
            </div>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-purple-500"
            />
          </div>

          {/* Recipient */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/20">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">To</p>
              <p className="text-white font-medium">{recipient}</p>
            </div>
          </div>

          {/* Message Preview */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Message</p>
            <p className="text-slate-300 leading-relaxed">
              {formatMessagePreview(message)}
            </p>
          </div>

          {/* Delivery Date */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/20">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Delivering</p>
              <p className="text-white font-medium">
                {deliveryDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center p-2 rounded-lg bg-slate-800/50 border border-white/5"
              >
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>

          {/* View Details Button */}
          <GradientButton 
            variant="secondary" 
            size="md" 
            className="w-full"
            onClick={() => router.push('/timeline')}
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </GradientButton>
        </div>
      </GlassCard>
    </motion.div>
  );
};