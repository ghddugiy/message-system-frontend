'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Calendar, Clock, Send, Loader2 } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { GradientButton } from '@/components/shared/GradientButton';
import { QuickTimeSelector, QuickTimeOption } from './QuickTimeSelector';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

interface ComposeFormProps {
  onSchedule?: (data: {
    recipient: string;
    message: string;
    deliveryDate: Date;
  }) => void;
  onDataChange?: (data: {
    recipient: string;
    message: string;
    deliveryDate: Date | null;
  }) => void;
  className?: string;
}

export const ComposeForm: React.FC<ComposeFormProps> = ({
  onSchedule,
  onDataChange,
  className,
}) => {
  const { showToast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [quickTime, setQuickTime] = useState<QuickTimeOption>('1day');
  const [isSending, setIsSending] = useState(false);

  const notifyDataChange = () => {
    let scheduledDate: Date | null = null;
    if (deliveryDate && deliveryTime) {
      scheduledDate = new Date(`${deliveryDate}T${deliveryTime}`);
    }
    onDataChange?.({
      recipient,
      message,
      deliveryDate: scheduledDate,
    });
  };

  const handleQuickTimeSelect = (option: QuickTimeOption) => {
    setQuickTime(option);
    if (option !== 'custom') {
      const now = new Date();
      const timeMap = {
        '1hour': 1,
        '6hours': 6,
        '1day': 24,
        '1week': 24 * 7,
        '1month': 24 * 30,
      };
      const hours = timeMap[option];
      now.setHours(now.getHours() + hours);
      setDeliveryDate(now.toISOString().split('T')[0]);
      setDeliveryTime(now.toTimeString().slice(0, 5));
      notifyDataChange();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Live validation
    if (!recipient) {
      showToast('Please enter a recipient email', 'error');
      return;
    }
    
    if (!message) {
      showToast('Please enter a message', 'error');
      return;
    }
    
    if (!deliveryDate || !deliveryTime) {
      showToast('Please select a delivery date and time', 'error');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipient)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    const scheduledDate = new Date(
  `${deliveryDate} ${deliveryTime}`
);
    setIsSending(true);

    try {
      // Call the backend API
      const response = await axios.post(
  'https://message-system-backend.onrender.com/api/schedule',
  {
    recipientEmail: recipient,
    subject: 'TimeDrop Message',
    message: message,
    scheduledAt: new Date(
  `${deliveryDate}T${deliveryTime}:00`
).toISOString(),
  }
);

      if (response.data.success) {
        showToast('Message scheduled successfully!', 'success');
        
        // Clear form after success
        setRecipient('');
        setMessage('');
        setDeliveryDate('');
        setDeliveryTime('');
        setQuickTime('1day');
        
        // Notify parent component
        onSchedule?.({
          recipient,
          message,
          deliveryDate: scheduledDate,
        });
      } else {
        showToast(response.data.error || 'Failed to schedule message', 'error');
      }
    } catch (error: any) {
      console.error('Error sending email:', error);
      if (error.response) {
        showToast(error.response.data.error || 'Failed to schedule message', 'error');
      } else if (error.request) {
        showToast('Network error. Please check if the backend server is running.', 'error');
      } else {
        showToast('An unexpected error occurred', 'error');
      }
    } finally {
      setIsSending(false);
    }
  };

  const characterCount = message.length;
  const maxCharacters = 1000;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('space-y-6', className)}
    >
      <GlassCard glow glowColor="blue" className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
              <Mail className="w-4 h-4" />
              <span>Recipient</span>
            </label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                notifyDataChange();
              }}
              placeholder="recipient@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Quick Time Selector */}
          <QuickTimeSelector
            selected={quickTime}
            onSelect={handleQuickTimeSelect}
          />

          {/* Date & Time Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => {
                  setDeliveryDate(e.target.value);
                  setQuickTime('custom');
                  notifyDataChange();
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                <Clock className="w-4 h-4" />
                <span>Time</span>
              </label>
              <input
                type="time"
                value={deliveryTime}
                onChange={(e) => {
                  setDeliveryTime(e.target.value);
                  setQuickTime('custom');
                  notifyDataChange();
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
              <Mail className="w-4 h-4" />
              <span>Message</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                notifyDataChange();
              }}
              placeholder="Write your message to the future..."
              rows={8}
              maxLength={maxCharacters}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              required
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500">
                {characterCount}/{maxCharacters} characters
              </p>
              {characterCount > maxCharacters * 0.9 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-yellow-400"
                >
                  Approaching character limit
                </motion.p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <GradientButton 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Schedule Message
              </>
            )}
          </GradientButton>
        </form>
      </GlassCard>
    </motion.div>
  );
};