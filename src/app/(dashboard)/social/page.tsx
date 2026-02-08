"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Heart, MessageCircle, Zap, Flame, Smile, Sparkles, User, 
  MapPin, Send, Tag as TagIcon, Star, MessageSquare, 
  Search, ChevronRight, Clock, Plus
} from 'lucide-react';
import { MOCK_SOCIAL_FEED, MOCK_CHATS, MOCK_PLACES } from '@/app/lib/mock-data';
import { useApp } from '@/app/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const RANDOM_BIOS = [
  "Hoy logré mi meta de hidratación, ¡se siente increíble! 💧",
  "¿Alguien para un partido de fútbol en el Simón Bolívar este finde? ⚽",
  "Probando la receta de bowl de quinoa de bloomWe. 10/10 recomendable. 🥗",
  "La meditación de hoy me dejó con una paz mental absoluta. 🙏",
  "¡Nueva racha de 7 días! La disciplina tarde o temprano vence al talento.",
  "Acabo de descubrir un nuevo spot para hacer yoga al aire libre. ✨",
  "Motivada al 100% con los tips personalizados de hoy.",
  "Cuidar la salud mental es tan importante como el ejercicio físico. ❤️",
  "¿Algún consejo para mejorar mi técnica de natación? 🏊‍♂️",
  "Día de descanso activo: caminata por el Virrey."
];

const RANDOM_ACTIVITIES = [
  "Completó reto de hidratación",
  "Publicó nueva foto",
  "Alcanzó meta de pasos",
  "Compartió un tip",
  "Nueva marca personal"
];

const QUICK_TAGS = ['Yoga', 'Nutrición', 'Mental', 'Deporte'];

interface Comment {
  id: string;
  name: string;
  text: string;
}

interface SocialPost {
  id: string;
  name: string;
  photo: string;
  bio: string;
  recentActivity: string;
  interests: string[];
  streak: number;
  isMe: boolean;
  likes: number;
  userLiked: boolean;
  comments: Comment[];
}

export default function SocialPage() {
  const { userData, streak, matches, pendingMatches, addMatchRequest, isMatch, isPending } = useApp();
  const { toast } = useToast();
  const [post, setPost] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [feed, setFeed] = useState<SocialPost[]>([]);
  const [matchSuccess, setMatchSuccess] = useState<string | null>(null);
  const [mainTab, setMainTab] = useState<'comunidad' | 'lugares' | 'mensajes'>('comunidad');
  const [comunidadTab, setComunidadTab] = useState<'discover' | 'pending' | 'favorites'>('discover');
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});

  const generateRandomPosts = useCallback((count: number): SocialPost[] => {
    return Array.from({ length: count }).map((_, i) => {
      const id = Math.random().toString(36).substr(2, 9);
      const name = MOCK_SOCIAL_FEED[Math.floor(Math.random() * MOCK_SOCIAL_FEED.length)].name;
      
      const shuffled = [...QUICK_TAGS].sort(() => 0.5 - Math.random());
      const postInterests = shuffled.slice(0, Math.floor(Math.random() * 2) + 1);

      return {
        id,
        name,
        photo: `https://picsum.photos/seed/${id}/150/150`,
        bio: RANDOM_BIOS[Math.floor(Math.random() * RANDOM_BIOS.length)],
        recentActivity: RANDOM_ACTIVITIES[Math.floor(Math.random() * RANDOM_ACTIVITIES.length)],
        interests: postInterests,
        streak: Math.floor(Math.random() * 50) + 1,
        isMe: false,
        likes: Math.floor(Math.random() * 50) + 5,
        userLiked: false,
        comments: []
      };
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    const initialFeed: SocialPost[] = MOCK_SOCIAL_FEED.map(u => ({ 
      ...u, 
      isMe: false, 
      likes: Math.floor(Math.random() * 20) + 5,
      userLiked: false,
      comments: (u as any).comments || []
    }));
    setFeed([...initialFeed, ...generateRandomPosts(3)]);
  }, [generateRandomPosts]);

  useEffect(() => {
    if (mounted && mainTab === 'comunidad' && comunidadTab === 'discover') {
      const discoverableCount = feed.filter(u => !isMatch(u.id) && !isPending(u.id) && !u.isMe).length;
      if (discoverableCount < 3) {
        setFeed(prev => [...prev, ...generateRandomPosts(5)]);
      }
    }
  }, [feed, isMatch, isPending, comunidadTab, mainTab, mounted, generateRandomPosts]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = () => {
    if (!post) return;
    const newPost: SocialPost = {
      id: 'me-' + Date.now(),
      name: userData?.name || 'Usuario',
      photo: userData?.profilePic || 'https://picsum.photos/seed/me/150/150',
      bio: post,
      recentActivity: 'Acaba de publicar un estado',
      interests: [...selectedTags],
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

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text) return;

    setFeed(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: Math.random().toString(36).substr(2, 9),
              name: userData?.name || 'Usuario',
              text
            }
          ]
        };
      }
      return p;
    }));

    setCommentInput(prev => ({ ...prev, [postId]: '' }));
    toast({
      title: "Comentario añadido",
      description: "Tu comentario se ha publicado correctamente.",
    });
  };

  const handleMatchRequestAction = (user: SocialPost) => {
    if (user.isMe) return;
    addMatchRequest(user.id);
    setMatchSuccess(user.name);
  };

  const filteredFeed = comunidadTab === 'discover' 
    ? feed.filter(u => !isMatch(u.id) && !isPending(u.id)) 
    : comunidadTab === 'pending' 
    ? feed.filter(u => isPending(u.id)) 
    : feed.filter(u => isMatch(u.id));

  const pendingCount = feed.filter(u => isPending(u.id)).length;
  const favoritesCount = feed.filter(u => isMatch(u.id)).length;

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in bg-secondary/10 min-h-screen pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">bloomSocial</h1>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Flame size={18} className="text-orange-500" fill="currentColor" />
          <span className="text-sm font-bold">{streak} día racha</span>
        </div>
      </header>

      <div className="bg-white p-1 rounded-2xl shadow-sm border border-border/50 flex gap-1">
        <button 
          onClick={() => setMainTab('comunidad')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
            mainTab === 'comunidad' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary/20"
          )}
        >
          Comunidad
        </button>
        <button 
          onClick={() => setMainTab('lugares')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
            mainTab === 'lugares' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary/20"
          )}
        >
          Lugares
        </button>
        <button 
          onClick={() => setMainTab('mensajes')}
          className={cn(
            "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1",
            mainTab === 'mensajes' ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-secondary/20"
          )}
        >
          Mensajes
          <Badge className="bg-white/20 text-white border-none text-[8px] h-4 min-w-4 px-1">2</Badge>
        </button>
      </div>

      {mainTab === 'comunidad' && (
        <>
          <div className="flex gap-2 bg-white/50 p-1.5 rounded-2xl shadow-none">
            <button onClick={() => setComunidadTab('discover')} className={cn("flex-1 py-2 rounded-xl text-[10px] font-bold", comunidadTab === 'discover' ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
              Descubrir
            </button>
            <button onClick={() => setComunidadTab('pending')} className={cn("flex-1 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5", comunidadTab === 'pending' ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
              Pendientes
              {pendingCount > 0 && <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-md text-[8px]">{pendingCount}</span>}
            </button>
            <button onClick={() => setComunidadTab('favorites')} className={cn("flex-1 py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5", comunidadTab === 'favorites' ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
              Favoritos
              {favoritesCount > 0 && <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-md text-[8px]">{favoritesCount}</span>}
            </button>
          </div>

          {comunidadTab === 'discover' && (
            <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-white">
              <CardContent className="p-4 flex flex-col gap-3">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userData?.profilePic} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <textarea
                    placeholder="¿Qué estás haciendo hoy por tu bienestar?"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    className="flex-1 bg-secondary/30 rounded-2xl p-3 text-xs focus:outline-none min-h-[60px] border-none resize-none"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TAGS.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} className={cn("px-3 py-1 rounded-full text-[10px] font-bold transition-all border", selectedTags.includes(tag) ? "bg-primary text-white border-primary" : "bg-secondary/20 text-muted-foreground")}>
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-1">
                  <button onClick={handlePost} className="bg-primary text-white rounded-full px-6 py-2 text-xs font-bold shadow-md hover:bg-primary/90 transition-all">Publicar</button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {filteredFeed.map((user) => (
              <Card key={user.id} className="rounded-3xl border-none shadow-sm overflow-hidden bg-white group">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={user.photo} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm">{user.name}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium">{user.recentActivity}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full text-primary">
                      <Flame size={12} fill="currentColor" />
                      <span className="text-[10px] font-bold">{user.streak}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-2">{user.bio}</p>
                  
                  {user.interests && user.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {user.interests.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-primary/5 text-primary border-none text-[8px] px-2 py-0.5 font-black uppercase tracking-widest rounded-full"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                    <button onClick={() => handleLike(user.id)} className={cn("flex items-center gap-1.5 transition-colors", user.userLiked ? "text-red-500" : "text-muted-foreground")}>
                      <Heart size={18} fill={user.userLiked ? "currentColor" : "none"} /> 
                      <span className="text-xs font-bold">{user.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground">
                      <MessageCircle size={18} /> 
                      <span className="text-xs font-bold">{user.comments.length}</span>
                    </button>
                    
                    <div className="ml-auto">
                      {isMatch(user.id) ? (
                        <Badge className="bg-green-100 text-green-600 border-none px-3 py-1 font-bold text-[10px]">Amigos</Badge>
                      ) : isPending(user.id) ? (
                        <Badge className="bg-primary/10 text-primary border-none px-3 py-1 font-bold text-[10px]">Pendiente</Badge>
                      ) : !user.isMe && (
                        <button onClick={() => handleMatchRequestAction(user)} className="flex items-center gap-2 text-primary font-bold hover:scale-105 transition-transform">
                          <Zap size={16} fill="currentColor" /> <span className="text-xs">Match</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                    {user.comments.length > 0 && (
                      <div className="space-y-2">
                        {user.comments.map((comment) => (
                          <div key={comment.id} className="flex flex-col bg-secondary/10 p-2.5 rounded-2xl">
                            <span className="text-[10px] font-black text-primary uppercase mb-0.5">{comment.name}</span>
                            <p className="text-xs text-muted-foreground leading-tight">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 items-center bg-secondary/20 p-2 rounded-2xl">
                      <Input 
                        placeholder="Añadir un comentario..." 
                        value={commentInput[user.id] || ''}
                        onChange={(e) => setCommentInput(prev => ({ ...prev, [user.id]: e.target.value }))}
                        className="h-8 bg-transparent border-none text-[11px] placeholder:text-muted-foreground/50 shadow-none focus-visible:ring-0"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7 rounded-full text-primary hover:bg-primary/10 shrink-0"
                        onClick={() => handleAddComment(user.id)}
                      >
                        <Send size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredFeed.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center bg-white/50 rounded-3xl border border-dashed border-muted-foreground/20">
                <Smile size={32} className="text-muted-foreground/30 mb-2" />
                <p className="text-xs font-medium text-muted-foreground">Nada por aquí... ¡Sigue explorando!</p>
              </div>
            )}
          </div>
        </>
      )}

      {mainTab === 'lugares' && (
        <div className="space-y-6 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Buscar lugares favoritos..." className="pl-10 h-10 rounded-2xl bg-white border-none shadow-sm" />
          </div>
          
          <h2 className="text-sm font-bold text-primary flex items-center gap-2 px-1">
            <Star size={16} fill="currentColor" /> Mis Sitios Favoritos
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {MOCK_PLACES.slice(0, 3).map(place => (
              <Card key={place.id} className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white group cursor-pointer">
                <div className="relative h-36">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3">
                    <div className="h-8 w-8 bg-white/90 rounded-full flex items-center justify-center text-yellow-500 shadow-md">
                      <Star size={18} fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-0.5">
                    {[...Array(place.rating || 5)].map((_, i) => (
                      <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm truncate">{place.name}</h3>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-medium">
                    <MapPin size={12} className="text-primary" /> {place.address}
                  </p>
                  <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                    {place.activities.map(a => <Badge key={a} variant="outline" className="text-[8px] h-4 border-primary/20 text-primary">{a}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full h-12 rounded-2xl border-dashed border-2 border-muted-foreground/30 text-muted-foreground font-bold hover:bg-white/50">
            <Plus size={18} className="mr-2" /> Añadir Nuevo Lugar
          </Button>
        </div>
      )}

      {mainTab === 'mensajes' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-2 px-2 pb-2">
            {MOCK_CHATS.map(chat => (
              <div key={chat.id} className="flex flex-col items-center gap-1 shrink-0">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-primary">
                    <AvatarImage src={chat.photo} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />}
                </div>
                <span className="text-[10px] font-bold text-foreground/70 truncate w-14 text-center">{chat.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-2">
            {MOCK_CHATS.map(chat => (
              <Card key={chat.id} className="rounded-2xl border-none shadow-none bg-white hover:bg-secondary/10 transition-colors cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-12 w-12 shadow-sm">
                    <AvatarImage src={chat.photo} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="font-bold text-sm truncate">{chat.name}</h3>
                      <span className="text-[9px] text-muted-foreground font-medium">{chat.time}</span>
                    </div>
                    <p className={cn("text-[11px] truncate", chat.unreadCount > 0 ? "font-bold text-foreground" : "text-muted-foreground")}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="bg-primary text-white text-[9px] h-5 w-5 rounded-full flex items-center justify-center font-bold shadow-sm shadow-primary/20">
                      {chat.unreadCount}
                    </div>
                  )}
                  <ChevronRight size={16} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center py-8 text-center bg-white/30 rounded-[2.5rem] border border-dashed border-muted-foreground/20">
            <MessageSquare size={32} className="text-muted-foreground/30 mb-2" />
            <p className="text-xs font-medium text-muted-foreground">Busca amigos para chatear</p>
            <Button size="sm" variant="ghost" className="mt-2 text-primary text-[10px] font-bold">Ver Sugerencias</Button>
          </div>
        </div>
      )}

      <Dialog open={!!matchSuccess} onOpenChange={() => setMatchSuccess(null)}>
        <DialogContent className="rounded-[2.5rem] max-w-[85vw] p-8 text-center border-none">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-black text-primary flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Zap size={40} className="text-primary fill-primary" />
              </div>
              ¡Solicitud Enviada!
            </DialogTitle>
            <DialogDescription className="text-center pt-2 font-medium">
              Se ha enviado tu interés a <span className="text-primary font-bold">{matchSuccess}</span>. Lo verás en tu pestaña de pendientes.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setMatchSuccess(null)} className="w-full h-12 rounded-2xl bg-primary mt-6 font-bold shadow-lg shadow-primary/20">Entendido</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
