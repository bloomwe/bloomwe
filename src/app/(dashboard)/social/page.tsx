"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Heart, MessageCircle, Zap, Flame, Smile, Sparkles, User, MapPin, Award } from 'lucide-react';
import { MOCK_SOCIAL_FEED } from '@/app/lib/mock-data';
import { useApp } from '@/app/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function SocialPage() {
  const { userData, streak, matches, addMatch } = useApp();
  const { toast } = useToast();
  const [post, setPost] = useState('');
  const [feed, setFeed] = useState(MOCK_SOCIAL_FEED);
  const [matchSuccess, setMatchSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'discover' | 'favorites'>('discover');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handlePost = () => {
    if (!post) return;
    const newPost = {
      id: Math.random().toString(),
      name: userData?.name || 'Usuario',
      photo: userData?.profilePic || 'https://picsum.photos/seed/me/150/150',
      bio: post,
      recentActivity: 'Acaba de publicar un estado',
      interests: userData?.activities || [],
      streak: streak
    };
    setFeed([newPost, ...feed]);
    setPost('');
    toast({
      title: "Publicado",
      description: "Tu estado se ha compartido con la comunidad.",
    });
  };

  const handleMatchRequest = (user: any) => {
    addMatch(user.id);
    setMatchSuccess(user.name);
  };

  const filteredFeed = activeTab === 'discover' 
    ? feed 
    : feed.filter(u => matches.includes(u.id));

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in bg-secondary/10 min-h-screen pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Comunidad</h1>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Flame size={18} className="text-orange-500" fill="currentColor" />
          <span className="text-sm font-bold">{streak} día racha</span>
        </div>
      </header>

      {/* Tabs de Navegación */}
      <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-border/50">
        <button 
          onClick={() => setActiveTab('discover')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
            activeTab === 'discover' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary/20"
          )}
        >
          Descubrir
        </button>
        <button 
          onClick={() => setActiveTab('favorites')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'favorites' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary/20"
          )}
        >
          Favoritos
          {matches.length > 0 && (
            <span className={cn("flex h-4 w-4 items-center justify-center rounded-full text-[8px]", activeTab === 'favorites' ? "bg-white text-primary" : "bg-primary text-white")}>
              {matches.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'discover' && (
        <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-white">
          <CardContent className="p-4 flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userData?.profilePic} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <textarea
                placeholder="¿Qué estás haciendo por tu bienestar?"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                className="w-full bg-secondary/30 rounded-2xl p-3 text-sm focus:outline-none min-h-[80px] border-none resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-primary"><Smile size={20} /></Button>
                </div>
                <Button onClick={handlePost} size="sm" className="bg-primary rounded-full px-4 font-bold">Publicar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {filteredFeed.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white/50 rounded-[2.5rem] border border-dashed border-muted-foreground/30">
            <User size={48} className="text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-medium text-sm">
              {activeTab === 'favorites' 
                ? "Aún no tienes matches. ¡Ve a descubrir personas geniales!" 
                : "No hay más personas por descubrir en este momento."}
            </p>
          </div>
        ) : (
          filteredFeed.map((user) => (
            <Card 
              key={user.id} 
              className="rounded-3xl border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelectedUser(user)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={user.photo} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-sm">{user.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{user.recentActivity}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full text-primary">
                    <Flame size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold">{user.streak}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-4 line-clamp-2">{user.bio}</p>
                
                {user.interests && user.interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.interests.map(i => (
                      <Badge key={i} variant="secondary" className="text-[9px] bg-secondary/50 text-primary border-none">
                        {i}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-6 pt-2 border-t border-border/50">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toast({ title: "¡Me gusta!", description: `Le diste me gusta al post de ${user.name}` }); }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Heart size={20} /> <span className="text-xs">Me gusta</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle size={20} /> <span className="text-xs">Comentar</span>
                  </button>
                  {!matches.includes(user.id) && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleMatchRequest(user); }}
                      className="flex items-center gap-2 text-primary font-bold ml-auto hover:scale-105 transition-transform"
                    >
                      <Zap size={18} fill="currentColor" /> <span className="text-xs">Hacer Match</span>
                    </button>
                  )}
                  {matches.includes(user.id) && (
                    <div className="ml-auto">
                      <Badge className="bg-primary/20 text-primary border-none text-[9px] font-bold">¡Hiciste Match!</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal de información del usuario */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="rounded-[2.5rem] max-w-[92vw] p-0 overflow-hidden border-none shadow-2xl">
          {selectedUser && (
            <div className="flex flex-col">
              <div className="relative h-40 bg-primary flex items-center justify-center">
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-white/20 backdrop-blur-md border-none text-white font-bold flex items-center gap-1">
                    <Flame size={14} fill="currentColor" /> {selectedUser.streak} días
                  </Badge>
                </div>
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl translate-y-12">
                  <AvatarImage src={selectedUser.photo} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold bg-secondary text-primary">
                    {selectedUser.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="pt-16 p-8 space-y-6 text-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedUser.name}</h2>
                  <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">Miembro Activo BloomWell</p>
                </div>

                <div className="flex justify-center gap-2 text-[10px] text-muted-foreground font-medium">
                  <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-full"><MapPin size={14} className="text-primary" /> Bogotá, CO</span>
                  <span className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-full"><Award size={14} className="text-primary" /> Nivel 12</span>
                </div>

                <div className="text-left space-y-2">
                  <h4 className="font-black text-[10px] text-primary uppercase tracking-widest">Sobre mí</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedUser.bio}</p>
                </div>

                <div className="text-left space-y-3">
                  <h4 className="font-black text-[10px] text-primary uppercase tracking-widest">Intereses</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.interests?.map((i: string) => (
                      <Badge key={i} variant="secondary" className="bg-primary/5 text-primary text-[10px] px-3 py-1 font-bold rounded-full border-none">
                        {i}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  {!matches.includes(selectedUser.id) ? (
                    <Button 
                      onClick={() => handleMatchRequest(selectedUser)}
                      className="w-full h-14 rounded-2xl bg-primary font-bold shadow-lg shadow-primary/20"
                    >
                      <Zap size={20} fill="currentColor" className="mr-2" /> Hacer Match
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      className="w-full h-14 rounded-2xl bg-secondary text-primary font-bold shadow-none opacity-100"
                    >
                      <Sparkles size={20} className="mr-2" /> Ya están conectados
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedUser(null)}
                    className="w-full h-14 rounded-2xl border-primary/20 text-primary font-bold"
                  >
                    Cerrar Perfil
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de éxito de match */}
      <Dialog open={!!matchSuccess} onOpenChange={() => setMatchSuccess(null)}>
        <DialogContent className="rounded-[2.5rem] max-w-[85vw] p-8 text-center border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-black text-primary flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Zap size={40} className="text-primary fill-primary" />
              </div>
              ¡Solicitud Enviada!
            </DialogTitle>
            <DialogDescription className="text-center pt-2 text-sm font-medium leading-relaxed">
              La notificación se ha enviado a <span className="text-primary font-bold">{matchSuccess}</span>. 
              <br /><br />
              Debes esperar a que <span className="text-primary font-bold">{matchSuccess}</span> te devuelva el match para conectar y ver su perfil en tus favoritos.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-6">
            <Button onClick={() => setMatchSuccess(null)} className="w-full h-12 rounded-2xl bg-primary font-bold shadow-lg shadow-primary/20">
              ¡Genial!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
