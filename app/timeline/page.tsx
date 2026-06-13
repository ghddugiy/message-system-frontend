'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  Clock as PendingIcon,
  XCircle,
  Filter
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { GlassCard } from '@/components/shared/GlassCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

type MessageStatus = 'pending' | 'delivered' | 'failed';

interface TimelineMessage {
  id: string;
  recipient: string;
  message: string;
  scheduledDate: Date;
  deliveredDate?: Date;
  status: MessageStatus;
}

type FilterOption = 'all' | 'pending' | 'delivered' | 'failed';

const mockMessages: TimelineMessage[] = [
  {
    id: '1',
    recipient: 'future@example.com',
    message: 'Hey future me! Remember to take a moment to appreciate how far you\'ve come. This message was sent from the past as a reminder of your journey and growth.',
    scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '2',
    recipient: 'team@company.com',
    message: 'Quarterly goals achieved! Great work everyone. Let\'s keep pushing forward and make this our best year yet.',
    scheduledDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deliveredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'delivered',
  },
  {
    id: '3',
    recipient: 'friend@example.com',
    message: 'Happy birthday! Wishing you all the best on your special day. May this year bring you joy and success.',
    scheduledDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    deliveredDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'delivered',
  },
  {
    id: '4',
    recipient: 'invalid@email',
    message: 'This message failed to deliver due to an invalid email address.',
    scheduledDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    status: 'failed',
  },
  {
    id: '5',
    recipient: 'family@example.com',
    message: 'Don\'t forget about the family reunion next month! It\'s going to be great to see everyone again.',
    scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'pending',
  },
];

const statusConfig = {
  pending: {
    icon: PendingIcon,
    label: 'Pending',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  delivered: {
    icon: CheckCircle,
    label: 'Delivered',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  failed: {
    icon: XCircle,
    label: 'Failed',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
};

const filterOptions: FilterOption[] = ['all', 'pending', 'delivered', 'failed'];

export default function TimelinePage() {
  const [filter, setFilter] = useState<FilterOption>('all');

  const filteredMessages = mockMessages.filter((message) => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatMessagePreview = (text: string, maxLength: number = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Navbar />
      <PageWrapper showGlow glowIntensity="medium">
        <div className="space-y-8">
          <SectionHeading
            title="Timeline"
            subtitle="Track all your scheduled messages and their delivery status."
            align="center"
            gradient
          />

          {/* Filter Tabs */}
          <div className="flex items-center justify-center">
            <GlassCard className="p-2">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400 mr-2" />
                {filterOptions.map((option) => (
                  <motion.button
                    key={option}
                    onClick={() => setFilter(option)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 capitalize',
                      filter === option
                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Glowing Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-cyan-600">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-blue-600 via-purple-600 to-cyan-600"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute inset-0 bg-blue-500 blur-md"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {filteredMessages.map((message, index) => {
                  const config = statusConfig[message.status];
                  const StatusIcon = config.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={cn(
                        'relative flex items-start',
                        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      )}
                    >
                      {/* Timeline Node */}
                      <div className={cn(
                        'absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 -translate-x-1/2',
                        'shadow-[0_0_20px_-5px_rgba(59,130,246,0.8)]',
                        'z-10'
                      )}>
                        <motion.div
                          className="absolute inset-0 rounded-full bg-blue-400"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.8, 0.4, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>

                      {/* Timeline Card */}
                      <div className={cn(
                        'w-full md:w-5/12 ml-16 md:ml-0',
                        isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                      )}>
                        <motion.div
                          whileHover={{ y: -4, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <GlassCard className="p-6">
                            <div className="space-y-4">
                              {/* Status Badge */}
                              <div className="flex items-center justify-between">
                                <div className={cn(
                                  'flex items-center space-x-2 px-3 py-1 rounded-full',
                                  config.bgColor,
                                  config.borderColor,
                                  'border'
                                )}>
                                  <StatusIcon className={cn('w-4 h-4', config.color)} />
                                  <span className={cn('text-xs font-medium', config.color)}>
                                    {config.label}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-500">
                                  {message.id}
                                </span>
                              </div>

                              {/* Recipient */}
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-400">To:</span>
                                <span className="text-white font-medium">{message.recipient}</span>
                              </div>

                              {/* Message */}
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Mail className="w-4 h-4 text-slate-400" />
                                  <span className="text-sm text-slate-400">Message:</span>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                  {formatMessagePreview(message.message)}
                                </p>
                              </div>

                              {/* Timestamps */}
                              <div className="space-y-2 pt-2 border-t border-white/10">
                                <div className="flex items-center space-x-2 text-xs">
                                  <Calendar className="w-3 h-3 text-slate-400" />
                                  <span className="text-slate-400">Scheduled:</span>
                                  <span className="text-slate-300">{formatDate(message.scheduledDate)}</span>
                                </div>
                                {message.deliveredDate && (
                                  <div className="flex items-center space-x-2 text-xs">
                                    <Clock className="w-3 h-3 text-slate-400" />
                                    <span className="text-slate-400">Delivered:</span>
                                    <span className="text-slate-300">{formatDate(message.deliveredDate)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </GlassCard>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Empty State */}
          {filteredMessages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Mail className="w-16 h-16 mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400 text-lg">No messages found</p>
              <p className="text-slate-500 text-sm mt-2">Try selecting a different filter</p>
            </motion.div>
          )}
        </div>
      </PageWrapper>
    </>
  );
}