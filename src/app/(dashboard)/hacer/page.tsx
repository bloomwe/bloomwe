"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dumbbell, Moon, ShoppingBag, TreePine, Utensils, Award, 
  ChevronRight, Phone, Mail, MapPin, Search, Clock
} from 'lucide-react';
import { MOCK_EXPERTS, MOCK_RECIPES, MOCK_PLACES, MOCK_RELAXATION } from '@/app/lib/mock-data';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'deportes', name: 'Deportes', icon: Dumbbell, color: 'bg-orange-100 text-orange-600' },
  { id: 'relax', name: 'Relajación', icon: Moon, color: 'bg-blue-100 text-blue-600' },
  { id: 'tiendas', name: 'Tiendas', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
  { id: 'activa', name: 'Actívate', icon: TreePine, color: 'bg-green-100 text-green-600' },
  { id: 'comidas', name: 'Comidas', icon: Utensils, color: 'bg-red-100 text-red-600' },
  { id: 'expertos', name: 'Expertos', icon: Award, color: 'bg-primary/10 text-primary' },
];

export default function HacerPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'expertos':
        return (
          <div className="space-y-4 animate-fade-in">
            {MOCK_EXPERTS.map(exp => (
              <Card key={exp.id} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">
                    {exp.name.split(' ')[1][0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{exp.name}</h3>
                    <p className="text-xs text-primary font-medium">{exp.specialty}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{exp.bio}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="h-8 rounded-lg" asChild>
                        <a href={`tel:${exp.phone}`}><Phone size={14} className="mr-1" /> Llamar</a>
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 rounded-lg" asChild>
                        <a href={`mailto:${exp.email}`}><Mail size={14} className="mr-1" /> Email</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'comidas':
        return (
          <div className="grid grid-cols-1 gap-4 animate-fade-in pb-8">
            {MOCK_RECIPES.map(recipe => (
              <Card key={recipe.id} className="rounded-2xl border-none shadow-sm overflow-hidden">
                <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{recipe.name}</h3>
                    <Badge variant="secondary">{recipe.category}</Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock size={12} /> {recipe.time}</span>
                    <span className="flex items-center gap-1"><Award size={12} /> {recipe.difficulty}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center bg-secondary/30 p-2 rounded-xl text-[10px]">
                    <div><p className="font-bold">{recipe.nutrition.calories}</p><p>Cal</p></div>
                    <div><p className="font-bold">{recipe.nutrition.protein}</p><p>Prot</p></div>
                    <div><p className="font-bold">{recipe.nutrition.carbs}</p><p>Carbs</p></div>
                    <div><p className="font-bold">{recipe.nutrition.fats}</p><p>Grasa</p></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'activa':
        return (
          <div className="space-y-4 animate-fade-in">
            {MOCK_PLACES.map(place => (
              <Card key={place.id} className="rounded-2xl border-none shadow-sm overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-bold">{place.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={12} /> {place.address}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {place.activities.map(a => <Badge key={a} variant="outline" className="text-[10px]">{a}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 text-center h-48 bg-white rounded-3xl border border-dashed">
            <p className="text-muted-foreground">Próximamente datos reales de {activeTab}.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in">
      <header>
        <h1 className="text-2xl font-bold">Actividades y Hub</h1>
        <p className="text-muted-foreground text-sm">Explora tu entorno saludable</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input placeholder="Buscar lugares, recetas..." className="pl-10 h-12 bg-white rounded-2xl border-none shadow-sm" />
      </div>

      {!activeTab ? (
        <section className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-3 text-center border border-border/50"
            >
              <div className={cn("p-4 rounded-2xl", cat.color)}>
                <cat.icon size={28} />
              </div>
              <span className="font-bold text-sm">{cat.name}</span>
            </button>
          ))}
        </section>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab(null)} className="h-8">← Volver</Button>
            <h2 className="font-bold text-lg capitalize">{activeTab}</h2>
          </div>
          {renderContent()}
        </div>
      )}
    </div>
  );
}
