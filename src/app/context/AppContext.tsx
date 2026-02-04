"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { generateDailyTips, DailyTipsOutput } from '@/ai/flows/personalized-daily-tips';

interface UserData {
  onboarded: boolean;
  motivations: string[];
  activities: string[];
  timeCommitment: string;
  name: string;
  email: string;
  location: string;
  birthDate: string;
  profilePic: string;
  hobbies: Record<string, { level: string }>;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  dailyTips: DailyTipsOutput;
  setDailyTips: (tips: DailyTipsOutput) => void;
  completedTipsToday: string[];
  toggleTipCompletion: (tipId: string) => void;
  streak: number;
  lastCompletedDate: string | null;
  refreshTips: () => Promise<void>;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [dailyTips, setDailyTips] = useState<DailyTipsOutput>([]);
  const [completedTipsToday, setCompletedTipsToday] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = getFromStorage<UserData>(STORAGE_KEYS.USER_DATA);
    const savedTips = getFromStorage<DailyTipsOutput>(STORAGE_KEYS.TIPS_CACHE);
    const savedCompleted = getFromStorage<string[]>(STORAGE_KEYS.COMPLETED_TIPS) || [];
    const savedStreak = getFromStorage<number>(STORAGE_KEYS.STREAK) || 0;
    const lastTipsDate = getFromStorage<string>(STORAGE_KEYS.LAST_TIPS_DATE);

    if (savedUser) setUserDataState(savedUser);
    
    const today = new Date().toDateString();
    if (lastTipsDate === today && savedTips) {
      setDailyTips(savedTips);
      setCompletedTipsToday(savedCompleted);
    } else if (savedUser) {
      // New day, clear completed and fetch new tips
      saveToStorage(STORAGE_KEYS.COMPLETED_TIPS, []);
      saveToStorage(STORAGE_KEYS.LAST_TIPS_DATE, today);
      // Fetching will happen in refreshTips called separately or in useEffect
    }

    setStreak(savedStreak);
    setIsLoaded(true);
  }, []);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
    saveToStorage(STORAGE_KEYS.USER_DATA, data);
  };

  const refreshTips = async () => {
    if (!userData) return;
    try {
      const tips = await generateDailyTips({
        motivation: userData.motivations,
        activities: userData.activities,
        timeCommitment: userData.timeCommitment,
        hobbies: userData.hobbies,
        completedTips: []
      });
      setDailyTips(tips);
      saveToStorage(STORAGE_KEYS.TIPS_CACHE, tips);
      saveToStorage(STORAGE_KEYS.LAST_TIPS_DATE, new Date().toDateString());
    } catch (e) {
      console.error("Error generating tips", e);
    }
  };

  const toggleTipCompletion = (tipId: string) => {
    const updated = completedTipsToday.includes(tipId)
      ? completedTipsToday.filter(id => id !== tipId)
      : [...completedTipsToday, tipId];
    
    setCompletedTipsToday(updated);
    saveToStorage(STORAGE_KEYS.COMPLETED_TIPS, updated);

    // Update streak logic
    const today = new Date().toDateString();
    if (updated.length > 0 && lastCompletedDate !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastCompletedDate(today);
      saveToStorage(STORAGE_KEYS.STREAK, newStreak);
    }
  };

  return (
    <AppContext.Provider value={{
      userData, setUserData, dailyTips, setDailyTips,
      completedTipsToday, toggleTipCompletion,
      streak, lastCompletedDate, refreshTips, isLoaded
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};