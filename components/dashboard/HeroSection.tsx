'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { GradientButton } from '@/components/shared/GradientButton';

export const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <GlassCard glow glowColor="blue" className="p-6 md:p-8 lg:p-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Worker Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-green-500" />
            </motion.div>
            <span className="text-sm font-medium text-green-400">
              Worker Active
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Send a message across time.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Schedule messages to be delivered at any point in the future. 
            Perfect for reminders, time capsules, or sending thoughts to your future self.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <GradientButton 
              variant="primary" 
              size="md"
              onClick={() => router.push('/compose')}
            >
              Compose a Drop
              <ArrowRight className="w-4 h-4 ml-2" />
            </GradientButton>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/timeline')}
              className="relative overflow-hidden rounded-xl font-semibold px-6 py-3 text-base text-white border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.5)] hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center">
                View Timeline
                <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </motion.button>
          </motion.div>

          {/* Subtle Animated Glow */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
};