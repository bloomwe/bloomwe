"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Send, Zap, Flame, Smile } from 'lucide-react';
import { MOCK_SOCIAL_FEED } from '@/app/lib/mock-data';
import { useApp } from '@/app/context/AppContext';
import { cn } from '@/lib/utils';

export default function SocialPage() {
  const { userData, streak } = useApp();
  const [post, setPost] = useState('');
  const [feed, setFeed] = useState(MOCK_SOCIAL_FEED);

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
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in bg-secondary/10 min-h-screen pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Comunidad</h1>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
          <Flame size={18} className="text-orange-500" fill="currentColor" />
          <span className="text-sm font-bold">{streak} día racha</span>
        </div>
      </header>

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

      <div className="space-y-6">
        {feed.map((user) => (
          <Card key={user.id} className="rounded-3xl border-none shadow-sm overflow-hidden bg-white">
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
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">{user.bio}</p>
              
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
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Heart size={20} /> <span className="text-xs">Me gusta</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle size={20} /> <span className="text-xs">Comentar</span>
                </button>
                <button className="flex items-center gap-2 text-primary font-bold ml-auto hover:scale-105 transition-transform">
                  <Zap size={18} fill="currentColor" /> <span className="text-xs">Hacer Match</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
