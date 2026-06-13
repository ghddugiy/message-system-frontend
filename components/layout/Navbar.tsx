'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PenSquare, 
  Clock, 
  Settings, 
  LogOut,
  Menu,
  X,
  Droplets
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Compose', href: '/compose', icon: PenSquare },
  { name: 'Timeline', href: '/timeline', icon: Clock },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    // In a real app, this would call an API to sign out
    // For now, just redirect to login page
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="relative">
                <Droplets className="w-8 h-8 text-blue-500" />
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
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                TimeDrop
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300',
                      'flex items-center space-x-2',
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {isActive && (
                      <>
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl"
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        />
                        <motion.div
                          layoutId="navbar-glow"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl blur-md"
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        />
                      </>
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Sign Out Button */}
            <div className="hidden md:flex items-center pl-4 border-l border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center space-x-3 px-5 py-4 rounded-xl font-medium transition-all duration-300',
                        isActive
                          ? 'text-white bg-gradient-to-r from-blue-600/30 to-purple-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
                <div className="pt-3 border-t border-white/10">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-3 px-5 py-4 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};