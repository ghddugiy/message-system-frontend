'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ComposeForm } from '@/components/compose/ComposeForm';
import { MessagePreview } from '@/components/compose/MessagePreview';
import { SectionHeading } from '@/components/shared/SectionHeading';

export default function ComposePage() {
  const [previewData, setPreviewData] = useState({
    recipient: '',
    message: '',
    deliveryDate: null as Date | null,
  });

  const handleSchedule = (data: {
    recipient: string;
    message: string;
    deliveryDate: Date;
  }) => {
    console.log('Scheduled message:', data);
    // The form now handles the API call and success state
    // This callback is just for logging or additional handling
  };

  const handleDataChange = (data: {
    recipient: string;
    message: string;
    deliveryDate: Date | null;
  }) => {
    setPreviewData(data);
  };

  return (
    <>
      <Navbar />
      <PageWrapper showGlow glowIntensity="medium">
        <div className="space-y-8">
          <SectionHeading
            title="Compose a Drop"
            subtitle="Schedule a message to be delivered at any point in the future."
            align="center"
            gradient
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComposeForm
              onSchedule={handleSchedule}
              onDataChange={handleDataChange}
            />

            <MessagePreview
              recipient={previewData.recipient}
              message={previewData.message}
              deliveryDate={previewData.deliveryDate}
            />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}