
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
  dailyTips?: DailyTipsOutput;
  completedTipsToday?: string[];
  lastTipsDate?: string;
  lastCompletedDate?: string;
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

// Usuarios de ejemplo para que aparezcan en favoritos por defecto
const DEFAULT_MATCHES = ['1', '2']; // IDs de Mateo González y Valentina Ruiz en MOCK_SOCIAL_FEED

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [dailyTips, setDailyTips] = useState<DailyTipsOutput>([]);
  const [completedTipsToday, setCompletedTipsToday] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [registeredActivities, setRegisteredActivities] = useState<RegisteredActivity[]>([]);
  const [matches, setMatches] = useState<string[]>(DEFAULT_MATCHES);
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
      // Si el usuario no tiene matches guardados, ponemos los de ejemplo
      setMatches(user.matches && user.matches.length > 0 ? user.matches : DEFAULT_MATCHES);
      setPendingMatches(user.pendingMatches || []);
      setLastCompletedDate(user.lastCompletedDate || null);
      
      const today = new Date().toDateString();

      if (user.lastTipsDate === today && user.dailyTips) {
        setDailyTips(user.dailyTips);
        setCompletedTipsToday(user.completedTipsToday || []);
      } else {
        setDailyTips([]);
        setCompletedTipsToday([]);
      }
    }
  };

  const saveCurrentUserDataToDb = (updatedData: Partial<UserAccount>) => {
    if (!currentUser) return;
    const usersDb = getFromStorage<Record<string, UserAccount>>(STORAGE_KEYS.USERS_DB) || {};
    usersDb[currentUser] = { ...usersDb[currentUser], ...updatedData };
    saveToStorage(STORAGE_KEYS.USERS_DB, usersDb);
  };

  const login = (email: string, pass: string) => {
    const emailKey = email.toLowerCase();
    const usersDb = getFromStorage<Record<string, UserAccount>>(STORAGE_KEYS.USERS_DB) || {};
    const user = usersDb[emailKey];
    
    if (user && user.password === pass) {
      saveToStorage(STORAGE_KEYS.CURRENT_SESSION, emailKey);
      setCurrentUser(emailKey);
      loadUserData(emailKey);
      return true;
    }
    return false;
  };

  const signup = (email: string, pass: string) => {
    const emailKey = email.toLowerCase();
    const usersDb = getFromStorage<Record<string, UserAccount>>(STORAGE_KEYS.USERS_DB) || {};
    if (usersDb[emailKey]) return false;

    // Inicializamos con DEFAULT_MATCHES para que aparezcan en Favoritos
    usersDb[emailKey] = {
      email: emailKey,
      password: pass,
      userData: undefined,
      streak: 0,
      registeredActivities: [],
      matches: DEFAULT_MATCHES,
      pendingMatches: [],
      dailyTips: [],
      completedTipsToday: [],
      lastTipsDate: '',
      lastCompletedDate: ''
    };
    
    saveToStorage(STORAGE_KEYS.USERS_DB, usersDb);
    saveToStorage(STORAGE_KEYS.CURRENT_SESSION, emailKey);
    setCurrentUser(emailKey);
    
    setUserDataState(null);
    setDailyTips([]);
    setCompletedTipsToday([]);
    setStreak(0);
    setLastCompletedDate(null);
    setRegisteredActivities([]);
    setMatches(DEFAULT_MATCHES);
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
    setLastCompletedDate(null);
    setRegisteredActivities([]);
    setMatches(DEFAULT_MATCHES);
    setPendingMatches([]);
    router.push('/auth');
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
      const today = new Date().toDateString();
      setDailyTips(tips);
      setCompletedTipsToday([]);
      
      saveCurrentUserDataToDb({ 
        dailyTips: tips, 
        lastTipsDate: today,
        completedTipsToday: [] 
      });
    } catch (e) {
      console.error("Error generating tips", e);
    }
  };

  const toggleTipCompletion = (tipId: string) => {
    const updated = completedTipsToday.includes(tipId)
      ? completedTipsToday.filter(id => id !== tipId)
      : [...completedTipsToday, tipId];
    
    setCompletedTipsToday(updated);
    
    const today = new Date().toDateString();
    let newStreak = streak;
    let newLastCompletedDate = lastCompletedDate;

    if (updated.length > 0 && lastCompletedDate !== today) {
      newStreak = streak + 1;
      newLastCompletedDate = today;
      setStreak(newStreak);
      setLastCompletedDate(newLastCompletedDate);
    }

    saveCurrentUserDataToDb({ 
      completedTipsToday: updated,
      streak: newStreak,
      lastCompletedDate: newLastCompletedDate || ''
    });
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
