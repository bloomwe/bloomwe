"use client";

import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';
import { 
  Settings, LogOut, Edit2, Flame, Trophy, Calendar, 
  ChevronRight, MapPin, Mail, Bell, Shield, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

const STATS_DATA = [
  { name: 'Lun', value: 3 },
  { name: 'Mar', value: 5 },
  { name: 'Mie', value: 2 },
  { name: 'Jue', value: 8 },
  { name: 'Vie', value: 4 },
  { name: 'Sab', value: 6 },
  { name: 'Dom', value: 1 },
];

const CATEGORY_DATA = [
  { name: 'Yoga', value: 40, color: '#17B5B5' },
  { name: 'Nutrición', value: 30, color: '#6CD7D7' },
  { name: 'Running', value: 30, color: '#FF7043' },
];

export default function ProfilePage() {
  const { userData, streak, completedTipsToday } = useApp();

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in bg-secondary/5 min-h-screen pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <Button variant="ghost" size="icon" className="rounded-full"><Settings size={22} /></Button>
      </header>

      <section className="flex flex-col items-center gap-4 bg-white p-8 rounded-[3rem] shadow-sm border border-border/50">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={userData?.profilePic} />
            <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full text-white border-2 border-white shadow-lg cursor-pointer">
            <Edit2 size={14} />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{userData?.name || 'Usuario BloomWell'}</h2>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1 mt-1">
            <MapPin size={14} /> {userData?.location || 'Mundo Saludable'}
          </p>
        </div>
        <div className="flex gap-4 w-full mt-4">
          <div className="flex-1 bg-primary/10 p-4 rounded-3xl text-center border border-primary/20">
            <Flame size={20} className="mx-auto text-primary mb-1" fill="currentColor" />
            <p className="text-xl font-black text-primary">{streak}</p>
            <p className="text-[10px] font-bold text-primary/70 uppercase">Racha</p>
          </div>
          <div className="flex-1 bg-secondary p-4 rounded-3xl text-center border border-border/50">
            <Trophy size={20} className="mx-auto text-primary mb-1" />
            <p className="text-xl font-black text-primary">12</p>
            <p className="text-[10px] font-bold text-primary/70 uppercase">Logros</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-lg px-2">Mis Estadísticas</h2>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase flex items-center justify-between">
              Tips completados esta semana
              <Badge variant="outline" className="text-[9px]">Últimos 7 días</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-48 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#999' }} />
                <Bar dataKey="value" fill="#17B5B5" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-lg px-2">Preferencias</h2>
        <div className="grid gap-3">
          <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl text-blue-600"><Bell size={18} /></div>
              <Label className="font-bold">Notificaciones</Label>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-xl text-purple-600"><Shield size={18} /></div>
              <Label className="font-bold">Privacidad</Label>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>
          <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-xl text-green-600"><Calendar size={18} /></div>
              <Label className="font-bold">Sincronizar Calendario</Label>
            </div>
            <Switch />
          </div>
        </div>
      </section>

      <Button variant="destructive" className="w-full h-14 rounded-2xl font-bold bg-red-50 text-red-500 hover:bg-red-100 border-none shadow-none mt-4">
        <LogOut size={20} className="mr-2" /> Cerrar Sesión
      </Button>
      
      <div className="text-center pb-8">
        <p className="text-[10px] text-muted-foreground">BloomWell v1.0.0 • Hecho para tu bienestar</p>
      </div>
    </div>
  );
}
