"use client";

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Trash2, Calendar as CalendarIcon, MapPin, Activity } from 'lucide-react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { HOBBIES_LIST } from '@/app/lib/mock-data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  date: Date;
  title: string;
  time: string;
  type: string;
  notes?: string;
}

const INITIAL_EVENT_STATE = {
  title: '',
  time: '08:00',
  type: 'Yoga',
  notes: ''
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<typeof INITIAL_EVENT_STATE>(INITIAL_EVENT_STATE);

  useEffect(() => {
    const saved = getFromStorage<Event[]>(STORAGE_KEYS.EVENTS) || [];
    setEvents(saved.map(e => ({ ...e, date: new Date(e.date) })));
  }, []);

  const saveEvents = (updated: Event[]) => {
    setEvents(updated);
    saveToStorage(STORAGE_KEYS.EVENTS, updated);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !date) return;
    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      time: newEvent.time,
      type: newEvent.type,
      date: date,
      notes: newEvent.notes
    };
    saveEvents([...events, event]);
    setIsAddOpen(false);
    setNewEvent(INITIAL_EVENT_STATE);
  };

  const deleteEvent = (id: string) => {
    saveEvents(events.filter(e => e.id !== id));
  };

  const dayEvents = events.filter(e => 
    date && e.date.toDateString() === date.toDateString()
  ).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in bg-secondary/5 min-h-screen pb-24">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tu Agenda</h1>
          <p className="text-xs text-muted-foreground">Gestiona tus hábitos y metas</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-2xl h-12 w-12 bg-primary shadow-lg shadow-primary/20">
              <Plus size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] max-w-[90vw] p-8">
            <DialogHeader>
              <DialogTitle>Nueva Actividad</DialogTitle>
              <DialogDescription className="text-xs">
                Programando para el {date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : 'día seleccionado'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">¿Qué harás?</Label>
                <Input 
                  value={newEvent.title} 
                  onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} 
                  placeholder="Ej: Yoga matutino" 
                  className="rounded-2xl h-12 bg-secondary/20 border-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Categoría</Label>
                  <Select value={newEvent.type} onValueChange={v => setNewEvent(p => ({ ...p, type: v }))}>
                    <SelectTrigger className="rounded-2xl h-12 bg-secondary/20 border-none">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      {HOBBIES_LIST.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Hora</Label>
                  <Input 
                    type="time" 
                    value={newEvent.time} 
                    onChange={e => setNewEvent(p => ({ ...p, time: e.target.value }))} 
                    className="rounded-2xl h-12 bg-secondary/20 border-none"
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleAddEvent} className="w-full h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20">
                  Añadir al Calendario
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <section className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-border/50 overflow-hidden">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="mx-auto"
          locale={es}
          classNames={{
            day_selected: "bg-primary text-primary-foreground rounded-xl hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-secondary text-primary font-bold rounded-xl",
            day: cn("h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-xl transition-colors hover:bg-secondary/50"),
          }}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-bold text-lg text-primary">
            {date ? format(date, "d 'de' MMMM", { locale: es }) : 'Selecciona un día'}
          </h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
            {dayEvents.length} {dayEvents.length === 1 ? 'actividad' : 'actividades'}
          </Badge>
        </div>

        {dayEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[2.5rem] border border-dashed border-muted-foreground/20 text-center">
            <div className="bg-secondary/30 p-4 rounded-full mb-4">
              <CalendarIcon size={32} className="text-primary/40" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">No hay actividades para este día.<br/>¡Crea un nuevo hábito!</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {dayEvents.map(event => (
              <Card key={event.id} className="rounded-3xl border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow group">
                <CardContent className="p-4 flex gap-4 items-center">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Activity size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{event.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Clock size={12} className="text-primary" /> {event.time}</span>
                      <span className="flex items-center gap-1"><Badge variant="outline" className="text-[8px] py-0 px-1.5 border-primary/20 text-primary">{event.type}</Badge></span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteEvent(event.id)} className="text-destructive/40 hover:text-destructive hover:bg-destructive/5 rounded-xl">
                    <Trash2 size={18} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
