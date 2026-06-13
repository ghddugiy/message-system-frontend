'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Droplets, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { GradientButton } from '@/components/shared/GradientButton';
import { Input } from '@/components/ui/input';
import { GlowBackground } from '@/components/shared/GlowBackground';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <>
      <GlowBackground intensity="medium" />
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <GlassCard glow glowColor="blue" className="p-8">
            <div className="space-y-8">
              {/* Logo */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Droplets className="w-12 h-12 text-blue-500" />
                  <motion.div
                    className="absolute inset-0 bg-blue-500 blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-center">
                    TimeDrop
                  </h1>
                  <p className="text-slate-400 text-center mt-2">
                    Send messages across time
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-slate-800/50 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="bg-slate-800/50 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                  />
                </div>

                <GradientButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </GradientButton>
              </form>

              <p className="text-center text-sm text-slate-400">
                Demo: Use any email and password to continue
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </>
  );
}