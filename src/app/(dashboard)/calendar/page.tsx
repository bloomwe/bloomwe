"use client";

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, MapPin, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { HOBBIES_LIST } from '@/app/lib/mock-data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Event {
  id: string;
  date: Date;
  title: string;
  time: string;
  type: string;
  notes?: string;
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({ type: 'Yoga' });

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
      time: newEvent.time || '08:00',
      type: newEvent.type || 'General',
      date: date,
      notes: newEvent.notes
    };
    saveEvents([...events, event]);
    setIsAddOpen(false);
    setNewEvent({ type: 'Yoga' });
  };

  const deleteEvent = (id: string) => {
    saveEvents(events.filter(e => e.id !== id));
  };

  const dayEvents = events.filter(e => 
    date && e.date.toDateString() === date.toDateString()
  );

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendario</h1>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="icon" className="rounded-full h-10 w-10 bg-primary">
              <Plus size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-[90vw]">
            <DialogHeader>
              <DialogTitle>Nueva Actividad</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <Label>Título</Label>
                <Input value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} placeholder="Ej: Correr 5km" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Tipo</Label>
                  <Select value={newEvent.type} onValueChange={v => setNewEvent(p => ({ ...p, type: v }))}>
                    <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                    <SelectContent>
                      {HOBBIES_LIST.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Hora</Label>
                  <Input type="time" value={newEvent.time} onChange={e => setNewEvent(p => ({ ...p, time: e.target.value }))} />
                </div>
              </div>
              <Button onClick={handleAddEvent} className="w-full h-12 rounded-xl bg-primary mt-4">Programar Recordatorio</Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <section className="bg-white rounded-3xl p-4 shadow-sm border border-border overflow-hidden">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="mx-auto"
          locale={es}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">
            {date ? format(date, "d 'de' MMMM", { locale: es }) : 'Selecciona un día'}
          </h2>
          <Badge variant="secondary">{dayEvents.length} eventos</Badge>
        </div>

        {dayEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed text-center">
            <CalendarIcon size={40} className="text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">No hay eventos para este día.<br/>¡Añade uno nuevo!</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {dayEvents.map(event => (
              <Card key={event.id} className="rounded-2xl border-none shadow-sm overflow-hidden bg-white">
                <CardContent className="p-4 flex gap-4">
                  <div className="w-1 bg-primary rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-bold">{event.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                      <span className="flex items-center gap-1"><Badge variant="secondary" className="text-[9px] py-0">{event.type}</Badge></span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteEvent(event.id)} className="text-destructive hover:bg-destructive/10">
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
