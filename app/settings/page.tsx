'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Bell, 
  Zap, 
  Shield, 
  Save, 
  Check,
  X,
  Activity,
  Settings as SettingsIcon,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { GlassCard } from '@/components/shared/GlassCard';
import { GradientButton } from '@/components/shared/GradientButton';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    displayName: 'Time Traveler',
    email: 'traveler@timedrop.com',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    realtimeUpdates: true,
    deliveryConfirmation: true,
  });

  const [workerSettings, setWorkerSettings] = useState({
    strictMode: false,
    queueProcessing: 'normal',
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileSave = async () => {
    setSaving(true);
    setError(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handlePasswordUpdate = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (securityData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setSaving(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <>
      <Navbar />
      <PageWrapper showGlow glowIntensity="medium" maxWidth="2xl">
        <div className="space-y-8">
          <SectionHeading
            title="Settings"
            subtitle="Manage your account preferences and application settings."
            align="center"
            gradient
          />

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-white/10">
              <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/30 data-[state=active]:to-purple-600/30">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/30 data-[state=active]:to-purple-600/30">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="worker" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/30 data-[state=active]:to-purple-600/30">
                <Zap className="w-4 h-4 mr-2" />
                Worker
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/30 data-[state=active]:to-purple-600/30">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Section */}
            <TabsContent value="profile" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard glow glowColor="blue" className="p-8">
                  <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <User className="w-12 h-12 text-white" />
                        </div>
                        <motion.div
                          className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-50"
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
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Profile Avatar</h3>
                        <p className="text-sm text-slate-400">Your public profile picture</p>
                      </div>
                    </div>

                    {/* Display Name */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                        <User className="w-4 h-4" />
                        <span>Display Name</span>
                      </label>
                      <Input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                        placeholder="Enter your display name"
                        className="bg-slate-800/50 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                        <Mail className="w-4 h-4" />
                        <span>Email Address</span>
                      </label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="bg-slate-800/50 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* Save Button */}
                    <GradientButton
                      onClick={handleProfileSave}
                      disabled={saving}
                      className="w-full"
                    >
                      {saving ? 'Saving...' : saveSuccess ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Save Profile
                        </>
                      )}
                    </GradientButton>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Notifications Section */}
            <TabsContent value="notifications" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard glow glowColor="purple" className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-purple-400 mb-6">
                      <Bell className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Notification Preferences</h3>
                    </div>

                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-white/5">
                      <div className="space-y-1">
                        <p className="font-medium text-white">Email Notifications</p>
                        <p className="text-sm text-slate-400">Receive email updates for your scheduled messages</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                      />
                    </div>

                    {/* Realtime Updates */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-white/5">
                      <div className="space-y-1">
                        <p className="font-medium text-white">Realtime Updates</p>
                        <p className="text-sm text-slate-400">Get instant notifications when messages are delivered</p>
                      </div>
                      <Switch
                        checked={notifications.realtimeUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, realtimeUpdates: checked })}
                      />
                    </div>

                    {/* Delivery Confirmation */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-white/5">
                      <div className="space-y-1">
                        <p className="font-medium text-white">Delivery Confirmation</p>
                        <p className="text-sm text-slate-400">Receive confirmation when messages are successfully delivered</p>
                      </div>
                      <Switch
                        checked={notifications.deliveryConfirmation}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, deliveryConfirmation: checked })}
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Worker Section */}
            <TabsContent value="worker" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard glow glowColor="cyan" className="p-8">
                  <div className="space-y-6">
                    {/* Worker Status */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Activity className="w-6 h-6 text-green-400" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-white">Worker Status</p>
                          <p className="text-sm text-green-400">Active and processing</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                        Online
                      </div>
                    </div>

                    {/* Strict Mode */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-white/5">
                      <div className="space-y-1">
                        <p className="font-medium text-white">Strict Mode</p>
                        <p className="text-sm text-slate-400">Enable strict delivery validation and error handling</p>
                      </div>
                      <Switch
                        checked={workerSettings.strictMode}
                        onCheckedChange={(checked) => setWorkerSettings({ ...workerSettings, strictMode: checked })}
                      />
                    </div>

                    {/* Queue Processing */}
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                        <SettingsIcon className="w-4 h-4" />
                        <span>Queue Processing Speed</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['slow', 'normal', 'fast'].map((speed) => (
                          <motion.button
                            key={speed}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setWorkerSettings({ ...workerSettings, queueProcessing: speed })}
                            className={cn(
                              'p-3 rounded-xl border font-medium capitalize transition-all duration-300',
                              workerSettings.queueProcessing === speed
                                ? 'bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border-cyan-500/30 text-white'
                                : 'bg-slate-800/30 border-white/10 text-slate-400 hover:bg-slate-800/50'
                            )}
                          >
                            {speed}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Worker Activity Badge */}
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Worker Activity</span>
                        <span className="text-xs text-slate-500">Last 24 hours</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: '75%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-white">75%</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Security Section */}
            <TabsContent value="security" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard glow glowColor="blue" className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-blue-400 mb-6">
                      <Shield className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Security Settings</h3>
                    </div>

                    {/* Current Password */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                        <Shield className="w-4 h-4" />
                        <span>Current Password</span>
                      </label>
                      <Input
                        type="password"
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                        className="bg-slate-800/50 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                        <Shield className="w-4 h-4" />
                        <span>New Password</span>
                      </label>
                      <Input
                        type="password"
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                        placeholder="Enter new password"
                        className="bg-slate-800/50 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-slate-400">
                        <Shield className="w-4 h-4" />
                        <span>Confirm Password</span>
                      </label>
                      <Input
                        type="password"
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        className="bg-slate-800/50 border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{error}</span>
                      </motion.div>
                    )}

                    {/* Update Button */}
                    <GradientButton
                      onClick={handlePasswordUpdate}
                      disabled={saving}
                      className="w-full"
                    >
                      {saving ? 'Updating...' : saveSuccess ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Updated!
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Update Password
                        </>
                      )}
                    </GradientButton>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </PageWrapper>
    </>
  );
}