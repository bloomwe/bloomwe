
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Zap, Flame, Smile, Sparkles, User, MapPin, Award, Clock, Send, Tag as TagIcon } from 'lucide-react';
import { MOCK_SOCIAL_FEED } from '@/app/lib/mock-data';
import { useApp } from '@/app/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const NAMES = ['Lucas', 'Martina', 'Daniel', 'Isabella', 'Santi', 'Elena', 'Diego', 'Lucía', 'Javier', 'Sara'];
const LAST_NAMES = ['Silva', 'Pérez', 'Torres', 'Sánchez', 'Ramírez', 'Díaz', 'Morales', 'Castro'];
const BIOS = [
  'Enfocado en mi mejor versión. ¡Vamos con toda!',
  'Amante de la naturaleza y el ejercicio al aire libre.',
  'Cocinando saludable y viviendo feliz.',
  'Buscando equilibrio entre estudio y bienestar.',
  'Día a día construyendo mejores hábitos.'
];
const ACTIVITIES = [
  'Acaba de completar un reto de hidratación',
  'Subió una nueva foto de su entrenamiento',
  'Se unió a BloomWell hoy',
  'Alcanzó su meta de pasos diaria',
  'Compartió un tip de meditación'
];

const RANDOM_COMMENTS = [
  "¡Excelente iniciativa!",
  "Me motiva mucho ver esto.",
  "¡A darle con toda!",
  "Increíble progreso, sigue así.",
  "¿Cómo lo lograste? ¡Pasa el tip!",
  "Me encanta tu energía.",
  "¡Qué bien te ves!",
  "Totalmente de acuerdo contigo.",
  "Esto es justo lo que necesitaba leer hoy.",
  "¡Eres una inspiración!",
  "¡Qué buen hábito!",
  "Mañana mismo empiezo yo también.",
  "¡Eso es actitud!",
  "Brutal el cambio que estás logrando."
];

const ALL_INTERESTS = [
  'Yoga', 'Running', 'Meditación', 'Nutrición', 'Salud Mental', 
  'Ciclismo', 'Natación', 'Lectura', 'Culinaria', 'Gimnasio', 
  'Crossfit', 'Hidratación', 'Sueño', 'Bienestar', 'Mindfulness',
  'Baile', 'Senderismo', 'Tenis', 'Vegano', 'Keto', 'Calistenia'
];

const QUICK_TAGS = ['Yoga', 'Nutrición', 'Mental', 'Deporte'];

export default function SocialPage() {
  const { userData, streak, matches, pendingMatches, addMatchRequest, isMatch, isPending } = useApp();
  const { toast } = useToast();
  const [post, setPost] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [mounted, setMounted] = useState(false);
  const [feed, setFeed] = useState<any[]>([]);
  const [matchSuccess, setMatchSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'discover' | 'pending' | 'favorites'>('discover');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const getRandomComments = () => {
    const shouldHaveComments = Math.random() > 0.4;
    if (!shouldHaveComments) return [];
    const count = Math.floor(Math.random() * 4) + 1;
    const shuffled = [...RANDOM_COMMENTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getRandomInterests = () => {
    const count = Math.floor(Math.random() * 3) + 1; 
    const shuffled = [...ALL_INTERESTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setMounted(true);
    
    const initialFeed = MOCK_SOCIAL_FEED.map(u => ({ 
      ...u, 
      isMe: false, 
      likes: Math.floor(Math.random() * 20) + 5,
      userLiked: false,
      comments: getRandomComments(),
      interests: getRandomInterests() 
    }));
    setFeed(initialFeed);

    const interval = setInterval(() => {
      const id = `gen-${Date.now()}`;
      const newUser = {
        id,
        name: `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
        photo: `https://picsum.photos/seed/${id}/150/150`,
        bio: BIOS[Math.floor(Math.random() * BIOS.length)],
        recentActivity: ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)],
        interests: getRandomInterests(),
        streak: Math.floor(Math.random() * 10) + 1,
        isMe: false,
        likes: Math.floor(Math.random() * 15),
        userLiked: false,
        comments: getRandomComments()
      };
      setFeed(prev => [newUser, ...prev]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mounted && activeTab === 'discover') {
      const discoverable = feed.filter(u => !isMatch(u.id) && !isPending(u.id) && !u.isMe);
      
      if (discoverable.length === 0 && feed.length > 0) {
        const generatedUsers = Array.from({ length: 5 }).map((_, i) => {
          const id = `gen-empty-${Date.now()}-${i}`;
          return {
            id,
            name: `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
            photo: `https://picsum.photos/seed/${id}/150/150`,
            bio: BIOS[Math.floor(Math.random() * BIOS.length)],
            recentActivity: ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)],
            interests: getRandomInterests(),
            streak: Math.floor(Math.random() * 10) + 1,
            isMe: false,
            likes: Math.floor(Math.random() * 15),
            userLiked: false,
            comments: getRandomComments()
          };
        });
        setFeed(prev => [...prev, ...generatedUsers]);
      }
    }
  }, [activeTab, feed, isMatch, isPending, mounted]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = () => {
    if (!post) return;
    const newPost = {
      id: 'me-' + Date.now(),
      name: userData?.name || 'Usuario',
      photo: userData?.profilePic || 'https://picsum.photos/seed/me/150/150',
      bio: post,
      recentActivity: 'Acaba de publicar un estado',
      interests: selectedTags.length > 0 ? selectedTags : (userData?.activities || getRandomInterests()),
      streak: streak,
      isMe: true,
      likes: 0,
      userLiked: false,
      comments: []
    };
    setFeed([newPost, ...feed]);
    setPost('');
    setSelectedTags([]);
    toast({
      title: "Publicado",
      description: "Tu estado se ha compartido con la comunidad.",
    });
  };

  const handleLike = (id: string) => {
    setFeed(prev => prev.map(u => {
      if (u.id === id) {
        const isLiking = !u.userLiked;
        return {
          ...u,
          userLiked: isLiking,
          likes: isLiking ? u.likes + 1 : u.likes - 1
        };
      }
      return u;
    }));
  };

  const handleAddComment = () => {
    if (!newComment || !selectedUser) return;
    
    setFeed(prev => prev.map(u => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          comments: [...u.comments, newComment]
        };
      }
      return u;
    }));

    setSelectedUser((prev: any) => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));

    setNewComment('');
    toast({
      title: "Comentario enviado",
      description: "Tu mensaje ha sido añadido.",
    });
  };

  const handleMatchRequestAction = (user: any) => {
    if (user.isMe) return;
    addMatchRequest(user.id);
    setMatchSuccess(user.name);
  };

  const filteredFeed = (() => {
    if (activeTab === 'discover') {
      return feed.filter(u => !isMatch(u.id) && !isPending(u.id));
    } else if (activeTab === 'pending') {
      return feed.filter(u => isPending(u.id));
    } else {
      return feed.filter(u => isMatch(u.id));
    }
  })();

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in bg-secondary/10 min-h-screen pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Comunidad</h1>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Flame size={18} className="text-orange-500" fill="currentColor" />
          <span className="text-sm font-bold">{streak} día racha</span>
        </div>
      </header>

      <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-border/50">
        <button 
          onClick={() => setActiveTab('discover')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all",
            activeTab === 'discover' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary/20"
          )}
        >
          Descubrir
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1",
            activeTab === 'pending' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary/20"
          )}
        >
          Pendientes
          {pendingMatches.length > 0 && (
            <span className={cn("flex h-4 w-4 items-center justify-center rounded-full text-[8px]", activeTab === 'pending' ? "bg-white text-primary" : "bg-primary text-white")}>
              {pendingMatches.length}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('favorites')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1",
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
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="flex gap-3">
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
              </div>
            </div>
            
            <div className="flex flex-col gap-3 px-1">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                <TagIcon size={12} className="text-primary" /> Añadir Etiquetas
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold transition-all border",
                      selectedTags.includes(tag) 
                        ? "bg-primary text-white border-primary shadow-sm" 
                        : "bg-secondary/20 text-muted-foreground border-transparent hover:bg-secondary/40"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-1">
              <div className="flex gap-2">
                <button className="h-8 w-8 text-primary flex items-center justify-center hover:bg-secondary/20 rounded-full transition-colors"><Smile size={20} /></button>
              </div>
              <Button onClick={handlePost} size="sm" className="bg-primary rounded-full px-6 font-bold shadow-md shadow-primary/20">Publicar</Button>
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
                ? "Aún no tienes matches aceptados. ¡Sigue conectando!" 
                : activeTab === 'pending'
                ? "No tienes solicitudes pendientes de respuesta."
                : "No hay más personas por descubrir."}
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
                    onClick={(e) => { e.stopPropagation(); handleLike(user.id); }}
                    className={cn(
                      "flex items-center gap-1.5 transition-colors",
                      user.userLiked ? "text-red-500" : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <Heart size={20} fill={user.userLiked ? "currentColor" : "none"} /> 
                    <span className="text-xs font-bold">{user.likes}</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle size={20} /> 
                    <span className="text-xs font-bold">{user.comments.length}</span>
                  </button>
                  
                  {!user.isMe && !isMatch(user.id) && !isPending(user.id) && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleMatchRequestAction(user); }}
                      className="flex items-center gap-2 text-primary font-bold ml-auto hover:scale-105 transition-transform"
                    >
                      <Zap size={18} fill="currentColor" /> <span className="text-xs">Match</span>
                    </button>
                  )}
                  {isPending(user.id) && (
                    <div className="ml-auto">
                      <Badge variant="outline" className="bg-secondary/20 text-muted-foreground border-none text-[9px] font-bold flex items-center gap-1">
                        <Clock size={10} /> Esperando
                      </Badge>
                    </div>
                  )}
                  {isMatch(user.id) && (
                    <div className="ml-auto">
                      <Badge className="bg-primary/20 text-primary border-none text-[9px] font-bold flex items-center gap-1">
                        <Sparkles size={10} /> Amigos
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="rounded-[2.5rem] max-w-[92vw] p-0 overflow-y-auto max-h-[90vh] border-none shadow-2xl no-scrollbar">
          {selectedUser && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedUser.name}</DialogTitle>
                <DialogDescription>Detalles de la publicación y comentarios</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col">
                <div className="relative h-32 bg-primary flex items-center justify-center shrink-0">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-xl translate-y-10">
                    <AvatarImage src={selectedUser.photo} className="object-cover" />
                    <AvatarFallback className="text-2xl font-bold bg-secondary text-primary">
                      {selectedUser.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="pt-12 p-6 space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                    <div className="flex justify-center gap-2 mt-2">
                       <Badge variant="secondary" className="bg-primary/10 text-primary text-[9px] border-none">
                         <Flame size={12} className="mr-1" fill="currentColor" /> {selectedUser.streak} Días
                       </Badge>
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-4 rounded-2xl">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">"{selectedUser.bio}"</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black text-[10px] text-primary uppercase tracking-widest flex items-center gap-2">
                      <MessageCircle size={14} /> Comentarios ({selectedUser.comments.length})
                    </h4>
                    
                    <div className="space-y-3">
                      {selectedUser.comments.map((comment: string, i: number) => (
                        <div key={i} className="bg-white border border-border/50 p-3 rounded-2xl shadow-sm">
                          <p className="text-xs text-muted-foreground leading-relaxed">{comment}</p>
                        </div>
                      ))}
                      {selectedUser.comments.length === 0 && (
                        <p className="text-[10px] text-center text-muted-foreground py-2 italic">Sé el primero en comentar...</p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Input 
                        placeholder="Escribe un comentario..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="rounded-xl h-10 bg-secondary/20 border-none text-xs"
                      />
                      <Button 
                        size="icon" 
                        onClick={handleAddComment}
                        disabled={!newComment}
                        className="rounded-xl h-10 w-10 shrink-0 bg-primary"
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    {!selectedUser.isMe && !isMatch(selectedUser.id) && !isPending(selectedUser.id) && (
                      <Button 
                        onClick={() => {
                          handleMatchRequestAction(selectedUser);
                          setSelectedUser(null);
                        }}
                        className="w-full h-12 rounded-2xl bg-primary font-bold shadow-lg shadow-primary/20"
                      >
                        <Zap size={18} fill="currentColor" className="mr-2" /> Hacer Match
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedUser(null)}
                      className="w-full h-12 rounded-2xl border-primary/20 text-primary font-bold"
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
            </DialogDescription>
          </DialogHeader>
          <div className="pt-6">
            <Button onClick={() => setMatchSuccess(null)} className="w-full h-12 rounded-2xl bg-primary font-bold shadow-lg shadow-primary/20">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
