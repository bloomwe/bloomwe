"use client";

import React, { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Flame, Droplets, Dumbbell, Brain, Apple, Clock, CheckCircle2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORY_ICONS: Record<string, any> = {
  hydration: Droplets,
  exercise: Dumbbell,
  mental: Brain,
  nutrition: Apple,
  default: Zap
};

export default function HomePage() {
  const { userData, dailyTips, completedTipsToday, toggleTipCompletion, streak, refreshTips } = useApp();
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dailyTips.length === 0) {
      setLoading(true);
      refreshTips().finally(() => setLoading(false));
    }
  }, [dailyTips.length, refreshTips]);

  const progress = dailyTips.length > 0 ? (completedTipsToday.length / dailyTips.length) * 100 : 0;

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">¡Hola, {userData?.name?.split(' ')[0]}!</p>
          <h1 className="text-2xl font-bold">Tu BloomWell hoy</h1>
        </div>
        <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full text-primary border border-primary/20">
          <Flame size={18} fill="currentColor" />
          <span className="font-bold">{streak}</span>
        </div>
      </header>

      <section className="space-y-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-bold text-lg">Tu Progreso</h2>
            <span className="text-2xl font-black text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-4 bg-secondary" />
          <p className="text-xs text-muted-foreground mt-3 text-center">
            {completedTipsToday.length === dailyTips.length ? "¡Increíble! Has completado todo por hoy 🎉" : `Has completado ${completedTipsToday.length} de ${dailyTips.length} tips`}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Tips Diarios</h2>
          {dailyTips.length > 0 && (
            <Badge variant="secondary" className="bg-secondary/50 text-primary">Nuevos tips en 12h</Badge>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid gap-3">
            {dailyTips.map((tip) => {
              const Icon = CATEGORY_ICONS[tip.category.toLowerCase()] || CATEGORY_ICONS.default;
              const isCompleted = completedTipsToday.includes(tip.id);
              
              return (
                <Card 
                  key={tip.id} 
                  className={cn("transition-all duration-300 border shadow-none rounded-2xl cursor-pointer", isCompleted ? "bg-primary/5 border-primary/20" : "bg-white hover:shadow-md")}
                  onClick={() => setSelectedTip(tip)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={cn("p-3 rounded-xl", isCompleted ? "bg-primary text-white" : "bg-secondary text-primary")}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={cn("font-bold truncate", isCompleted && "text-muted-foreground line-through")}>{tip.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{tip.category}</span>
                        <span className="text-muted-foreground text-[10px]">•</span>
                        <span className="text-muted-foreground text-[10px]">{tip.timeEstimate} min</span>
                      </div>
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); toggleTipCompletion(tip.id); }}>
                       <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors", isCompleted ? "bg-primary border-primary text-white" : "border-muted-foreground/30")}>
                         {isCompleted && <CheckCircle2 size={16} />}
                       </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <Dialog open={!!selectedTip} onOpenChange={() => setSelectedTip(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-none max-w-[90vw]">
          {selectedTip && (
            <div className="flex flex-col">
              <div className="h-40 bg-primary flex items-center justify-center text-white p-8 text-center">
                <h2 className="text-2xl font-bold">{selectedTip.title}</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-around bg-secondary/30 p-4 rounded-2xl">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Nivel</p>
                    <p className="font-semibold">{selectedTip.level}</p>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Tiempo</p>
                    <p className="font-semibold">{selectedTip.timeEstimate} min</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-primary uppercase mb-1">Descripción</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedTip.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-primary uppercase mb-1">Actividades Relacionadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTip.activities.map((a: string) => (
                      <Badge key={a} variant="outline" className="border-primary/30 text-primary">{a}</Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    toggleTipCompletion(selectedTip.id);
                    setSelectedTip(null);
                  }}
                  className={cn("w-full h-12 rounded-2xl font-bold", completedTipsToday.includes(selectedTip.id) ? "bg-muted text-muted-foreground" : "bg-primary hover:bg-primary/90")}
                >
                  {completedTipsToday.includes(selectedTip.id) ? 'Marcar como pendiente' : '¡Completado!'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
