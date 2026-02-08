"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppProvider, useApp } from './context/AppContext';
import { Skeleton } from '@/components/ui/skeleton';

function AppInitializer() {
  const { userData, currentUser, isLoaded } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (!currentUser) {
        router.push('/auth');
      } else if (!userData || !userData.onboarded) {
        router.push('/onboarding');
      } else {
        router.push('/home');
      }
    }
  }, [isLoaded, currentUser, userData, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8 gap-4">
      <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center animate-bounce shadow-xl">
        <span className="text-white text-4xl font-bold">BW</span>
      </div>
      <h1 className="text-2xl font-bold text-primary">bloomWe</h1>
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

export default function EntryPage() {
  return (
    <AppProvider>
      <AppInitializer />
    </AppProvider>
  );
}
