"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS, removeFromStorage } from '@/lib/storage';
import { generateDailyTips, DailyTipsOutput } from '@/ai/flows/personalized-daily-tips';
import { useRouter } from 'next/navigation';

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

export interface RegisteredActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  sport: string;
}

interface UserAccount {
  email: string;
  password?: string;
  userData?: UserData;
  streak?: number;
  registeredActivities?: RegisteredActivity[];
  matches?: string[];
  pendingMatches?: string[];
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
  registeredActivities: RegisteredActivity[];
  registerActivity: (activity: RegisteredActivity) => void;
  cancelActivity: (activityId: string) => void;
  matches: string[];
  pendingMatches: string[];
  addMatchRequest: (userId: string) => void;
  isMatch: (userId: string) => boolean;
  isPending: (userId: string) => boolean;
  // Auth additions
  currentUser: string | null;
  login: (email: string, pass: string) => boolean;
  signup: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [dailyTips, setDailyTips] = useState<DailyTipsOutput>([]);
  const [completedTipsToday, setCompletedTipsToday] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [registeredActivities, setRegisteredActivities] = useState<RegisteredActivity[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const [pendingMatches, setPendingMatches] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const sessionEmail = getFromStorage<string>(STORAGE_KEYS.CURRENT_SESSION);
    if (sessionEmail) {
      setCurrentUser(sessionEmail);
      loadUserData(sessionEmail);
    }
    setIsLoaded(true);
  }, []);

  const loadUserData = (email: string) => {
    const usersDb = getFromStorage<Record<string, UserAccount>>(STORAGE_KEYS.USERS_DB) || {};
    const user = usersDb[email];
    
    if (user) {
      setUserDataState(user.userData || null);
      setStreak(user.streak || 0);
      setRegisteredActivities(user.registeredActivities || []);
      setMatches(user.matches || []);
      setPendingMatches(user.pendingMatches || []);
      
      const savedTips = getFromStorage<DailyTipsOutput>(STORAGE_KEYS.TIPS_CACHE);
      const savedCompleted = getFromStorage<string[]>(STORAGE_KEYS.COMPLETED_TIPS) || [];
      const lastTipsDate = getFromStorage<string>(STORAGE_KEYS.LAST_TIPS_DATE);
      const today = new Date().toDateString();

      if (lastTipsDate === today && savedTips) {
        setDailyTips(savedTips);
        setCompletedTipsToday(savedCompleted);
      }
    }
  };

  const login = (email: string, pass: string) => {
    const usersDb = getFromStorage<Record<string, UserAccount>>(STORAGE_KEYS.USERS_DB) || {};
    const user = usersDb[email.toLowerCase()];
    
    if (user && user.password === pass) {
      saveToStorage(STORAGE_KEYS.CURRENT_SESSION, email.toLowerCase());
      setCurrentUser(email.toLowerCase());
      loadUserData(email.toLowerCase());
      return true;
    }
    return false;
  };

  const signup = (email: string, pass: string) => {
    const usersDb = getFromStorage<Record<string, UserAccount>>(STORAGE_KEYS.USERS_DB) || {};
    if (usersDb[email.toLowerCase()]) return false;

    usersDb[email.toLowerCase()] = {
      email: email.toLowerCase(),
      password: pass,
      userData: undefined,
      streak: 0,
      registeredActivities: [],
      matches: [],
      pendingMatches: []
    };
    
    saveToStorage(STORAGE_KEYS.USERS_DB, usersDb);
    saveToStorage(STORAGE_KEYS.CURRENT_SESSION, email.toLowerCase());
    setCurrentUser(email.toLowerCase());
    setUserDataState(null);
    setStreak(0);
    setMatches([]);
    setPendingMatches([]);
    return true;
  };

  const logout = () => {
    removeFromStorage(STORAGE_KEYS.CURRENT_SESSION);
    setCurrentUser(null);
    setUserDataState(null);
    setDailyTips([]);
    setCompletedTipsToday([]);
    setStreak(0);
    setRegisteredActivities([]);
    setMatches([]);
    setPendingMatches([]);
    router.push('/auth');
  };

  const saveCurrentUserDataToDb = (updatedData: Partial<UserAccount>) => {
    if (!currentUser) return;
    const usersDb = getFromStorage<Record<string, UserAccount>>(STORAGE_KEYS.USERS_DB) || {};
    usersDb[currentUser] = { ...usersDb[currentUser], ...updatedData };
    saveToStorage(STORAGE_KEYS.USERS_DB, usersDb);
  };

  const setUserData = (data: UserData) => {
    setUserDataState(data);
    saveCurrentUserDataToDb({ userData: data });
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

    const today = new Date().toDateString();
    if (updated.length > 0 && lastCompletedDate !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastCompletedDate(today);
      saveCurrentUserDataToDb({ streak: newStreak });
    }
  };

  const registerActivity = (activity: RegisteredActivity) => {
    if (registeredActivities.some(a => a.id === activity.id)) return;
    const updated = [...registeredActivities, activity];
    setRegisteredActivities(updated);
    saveCurrentUserDataToDb({ registeredActivities: updated });
  };

  const cancelActivity = (activityId: string) => {
    const updated = registeredActivities.filter(a => a.id !== activityId);
    setRegisteredActivities(updated);
    saveCurrentUserDataToDb({ registeredActivities: updated });
  };

  const addMatchRequest = (userId: string) => {
    if (pendingMatches.includes(userId) || matches.includes(userId)) return;
    const updated = [...pendingMatches, userId];
    setPendingMatches(updated);
    saveCurrentUserDataToDb({ pendingMatches: updated });
  };

  const isMatch = (userId: string) => matches.includes(userId);
  const isPending = (userId: string) => pendingMatches.includes(userId);

  return (
    <AppContext.Provider value={{
      userData, setUserData, dailyTips, setDailyTips,
      completedTipsToday, toggleTipCompletion,
      streak, lastCompletedDate, refreshTips, isLoaded,
      registeredActivities, registerActivity, cancelActivity,
      matches, pendingMatches, addMatchRequest, isMatch, isPending,
      currentUser, login, signup, logout
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
