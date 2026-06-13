'use client';

import React from 'react';
import { Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { NextDispatchCard } from '@/components/dashboard/NextDispatchCard';

export default function DashboardPage() {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  deliveryDate.setHours(14, 30, 0, 0);

  return (
    <>
      <Navbar />
      <PageWrapper showGlow glowIntensity="medium">
        <div className="space-y-8">
          <HeroSection />

          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Pending Drops"
                value="12"
                icon={Clock}
                trend={{
                  value: "+3 this week",
                  direction: "up"
                }}
                delay={0.1}
              />
              <StatsCard
                title="Delivered"
                value="48"
                icon={CheckCircle}
                trend={{
                  value: "+12 this month",
                  direction: "up"
                }}
                delay={0.2}
              />
              <StatsCard
                title="Total Composed"
                value="60"
                icon={MessageSquare}
                trend={{
                  value: "+5 this week",
                  direction: "up"
                }}
                delay={0.3}
              />
            </div>
          </section>

          <section>
            <NextDispatchCard
              recipient="future@example.com"
              message="Hey future me! Remember to take a moment to appreciate how far you've come. This message was sent from the past as a reminder of your journey and growth."
              deliveryDate={deliveryDate}
            />
          </section>
        </div>
      </PageWrapper>
    </>
  );
}