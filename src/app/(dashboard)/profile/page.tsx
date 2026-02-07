"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription 
} from '@/components/ui/dialog';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { 
  Settings, LogOut, Edit2, Flame, Trophy, Calendar, 
  ChevronRight, MapPin, Mail, Bell, Shield, Info, Camera, Lock, Eye, EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const STATS_DATA = [
  { name: 'Lun', value: 3 },
  { name: 'Mar', value: 5 },
  { name: 'Mie', value: 2 },
  { name: 'Jue', value: 8 },
  { name: 'Vie', value: 4 },
  { name: 'Sab', value: 6 },
  { name: 'Dom', value: 1 },
];

export default function ProfilePage() {
  const { userData, setUserData, streak, logout } = useApp();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    location: '',
    birthDate: ''
  });

  useEffect(() => {
    if (isEditOpen && userData) {
      setEditForm({
        name: userData.name || '',
        email: userData.email || '',
        location: userData.location || '',
        birthDate: userData.birthDate || ''
      });
    }
  }, [isEditOpen, userData]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && userData) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...userData,
          profilePic: reader.result as string
        });
        toast({
          title: "Foto actualizada",
          description: "Tu nueva foto de perfil se ha guardado correctamente.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (userData) {
      setUserData({
        ...userData,
        ...editForm
      });
      setIsEditOpen(false);
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios se han guardado con éxito.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in bg-secondary/5 min-h-screen pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm hover:bg-primary/5">
              <Settings size={22} className="text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] max-w-[92vw] p-8 border-none">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Editar Perfil</DialogTitle>
              <DialogDescription className="text-xs">Actualiza tu información personal de bloomWe.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Nombre</Label>
                <Input 
                  value={editForm.name} 
                  onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                  className="rounded-2xl h-12 bg-secondary/20 border-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Email</Label>
                <Input 
                  value={editForm.email} 
                  onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))}
                  className="rounded-2xl h-12 bg-secondary/20 border-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Ubicación</Label>
                <Input 
                  value={editForm.location} 
                  onChange={e => setEditForm(p => ({ ...p, location: e.target.value }))}
                  className="rounded-2xl h-12 bg-secondary/20 border-none"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Fecha de Nacimiento</Label>
                <Input 
                  type="date"
                  value={editForm.birthDate} 
                  onChange={e => setEditForm(p => ({ ...p, birthDate: e.target.value }))}
                  className="rounded-2xl h-12 bg-secondary/20 border-none"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button onClick={handleSaveProfile} className="w-full h-14 rounded-2xl bg-primary font-bold shadow-lg shadow-primary/20">
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <section className="flex flex-col items-center gap-4 bg-white p-8 rounded-[3rem] shadow-sm border border-border/50">
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-primary/20 shadow-xl">
            <AvatarImage src={userData?.profilePic} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              {userData?.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <button 
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 p-2.5 bg-primary rounded-full text-white border-2 border-white shadow-lg hover:scale-110 transition-transform"
          >
            <Camera size={16} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{userData?.name || 'Usuario bloomWe'}</h2>
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1.5 mt-1 font-medium">
            <MapPin size={14} className="text-primary" /> {userData?.location || 'Mundo Saludable'}
          </p>
        </div>
        <div className="flex gap-4 w-full mt-6">
          <div className="flex-1 bg-primary/10 p-5 rounded-[2rem] text-center border border-primary/20">
            <Flame size={24} className="mx-auto text-primary mb-1" fill="currentColor" />
            <p className="text-2xl font-black text-primary">{streak}</p>
            <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">Racha</p>
          </div>
          <div className="flex-1 bg-secondary/30 p-5 rounded-[2rem] text-center border border-border/50">
            <Trophy size={24} className="mx-auto text-primary mb-1" />
            <p className="text-2xl font-black text-primary">12</p>
            <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">Logros</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-lg px-2 text-primary flex items-center gap-2">
          <BarChart size={20} /> Mis Estadísticas
        </h2>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase flex items-center justify-between tracking-wider">
              Tips completados esta semana
              <Badge variant="outline" className="text-[9px] border-primary/20 text-primary">Últimos 7 días</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-48 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#999' }} />
                <Bar dataKey="value" fill="#17B5B5" radius={[4, 4, 0, 0]} barSize={20} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-lg px-2 text-primary flex items-center gap-2">
          <Settings size={20} /> Preferencias
        </h2>
        <div className="grid gap-3">
          <div className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 rounded-2xl text-blue-600"><Bell size={20} /></div>
              <Label className="font-bold">Notificaciones</Label>
            </div>
            <Switch defaultChecked />
          </div>

          <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
            <DialogTrigger asChild>
              <button className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-border/30 hover:bg-secondary/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-100 rounded-2xl text-purple-600"><Shield size={20} /></div>
                  <Label className="font-bold cursor-pointer">Privacidad</Label>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>
            </DialogTrigger>
            <DialogContent className="rounded-[2.5rem] max-w-[92vw] p-8 border-none overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Lock className="text-primary" size={24} /> Configuración de Privacidad
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Gestiona quién puede ver tu actividad y cómo protegemos tus datos.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="bg-secondary/20 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="font-bold flex items-center gap-2">
                        <Eye size={16} className="text-primary" /> Perfil Público
                      </Label>
                      <p className="text-[10px] text-muted-foreground">Otros usuarios podrán ver tu racha y logros.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="font-bold flex items-center gap-2">
                        <MapPin size={16} className="text-primary" /> Compartir Ubicación
                      </Label>
                      <p className="text-[10px] text-muted-foreground">Mostrar tiendas y eventos cerca de ti.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-primary tracking-widest ml-1">Sobre tus datos</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-white border border-border/50 rounded-xl">
                      <div className="p-1.5 bg-green-100 rounded-lg text-green-600"><Shield size={14} /></div>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        Tus datos personales están encriptados y nunca se comparten con terceros sin tu consentimiento.
                      </p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white border border-border/50 rounded-xl">
                      <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600"><Info size={14} /></div>
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        Puedes solicitar la eliminación permanente de tu cuenta y todos tus datos en cualquier momento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setIsPrivacyOpen(false)} className="w-full h-12 rounded-2xl bg-primary font-bold">
                  Entendido
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 rounded-2xl text-green-600"><Calendar size={20} /></div>
              <Label className="font-bold">Sincronizar Calendario</Label>
            </div>
            <Switch />
          </div>
        </div>
      </section>

      <Button 
        onClick={logout}
        variant="destructive" 
        className="w-full h-14 rounded-2xl font-bold bg-red-50 text-red-500 hover:bg-red-100 border-none shadow-none mt-4"
      >
        <LogOut size={20} className="mr-2" /> Cerrar Sesión
      </Button>
      
      <div className="text-center pb-8">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">bloomWe v1.0.0 • Tu Bienestar es nuestra meta</p>
      </div>
    </div>
  );
}
