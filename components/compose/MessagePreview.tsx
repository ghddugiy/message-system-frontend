'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, Clock, User } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { cn } from '@/lib/utils';

interface MessagePreviewProps {
  recipient: string;
  message: string;
  deliveryDate: Date | null;
  className?: string;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({
  recipient,
  message,
  deliveryDate,
  className,
}) => {
  const formatMessage = (text: string) => {
    if (!text) return 'Your message will appear here...';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select a delivery date';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('space-y-4', className)}
    >
      <GlassCard glow glowColor="purple" className="p-6 h-full">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-2 text-sm font-medium text-purple-400">
            <Mail className="w-4 h-4" />
            <span>Message Preview</span>
          </div>

          {/* Recipient */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-slate-400 uppercase tracking-wider">
              <User className="w-3 h-3" />
              <span>To</span>
            </div>
            <p className="text-white font-medium">
              {recipient || 'No recipient selected'}
            </p>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-slate-400 uppercase tracking-wider">
              <Mail className="w-3 h-3" />
              <span>Message</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                {formatMessage(message)}
              </p>
            </div>
          </div>

          {/* Delivery Date */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-slate-400 uppercase tracking-wider">
              <Calendar className="w-3 h-3" />
              <span>Delivering</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <p className="text-white font-medium">{formatDate(deliveryDate)}</p>
            </div>
          </div>

          {/* Character Count */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-slate-500 text-right">
              {message.length} characters
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};