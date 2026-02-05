
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Dumbbell, Moon, ShoppingBag, TreePine, Utensils, Award, 
  ChevronRight, Phone, Mail, MapPin, Search, Clock, Calendar as CalendarIcon, 
  Timer, Play, BookOpen, Download, Music, Tag, Map, Star, ArrowLeft,
  CheckCircle2, ListChecks, ChefHat, Sparkles
} from 'lucide-react';
import { MOCK_EXPERTS, MOCK_RECIPES, MOCK_PLACES, MOCK_SPORTS_ACTIVITIES, MOCK_RELAXATION, MOCK_SHOPS } from '@/app/lib/mock-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/app/context/AppContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const CATEGORIES = [
  { id: 'deportes', name: 'Deportes', icon: Dumbbell, color: 'bg-orange-100 text-orange-600' },
  { id: 'relax', name: 'Relajación', icon: Moon, color: 'bg-blue-100 text-blue-600' },
  { id: 'tiendas', name: 'Tiendas', icon: ShoppingBag, color: 'bg-purple-100 text-purple-600' },
  { id: 'activa', name: 'Actívate', icon: TreePine, color: 'bg-green-100 text-green-600' },
  { id: 'comidas', name: 'Comidas', icon: Utensils, color: 'bg-red-100 text-red-600' },
  { id: 'expertos', name: 'Expertos', icon: Award, color: 'bg-primary/10 text-primary' },
];

const RECIPE_TABS = ['Todos', 'Ligeras', 'Fuertes', 'Snacks'];
const EXPERT_TABS = ['Todos', 'Médicos', 'Psicólogos', 'Nutricionistas'];

export default function HacerPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [recipeFilter, setRecipeFilter] = useState('Todos');
  const [expertFilter, setExpertFilter] = useState('Todos');
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const { toast } = useToast();
  const { registerActivity } = useApp();

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
  };

  const handleCopyCoupon = (code: string) => {
    toast({
      title: "Cupón copiado",
      description: `El código "${code}" ha sido copiado al portapapeles.`,
    });
  };

  const handleRegister = (activity: any) => {
    registerActivity({
      id: activity.id,
      title: activity.title,
      date: activity.date,
      time: activity.time,
      location: activity.location,
      sport: activity.sport
    });
    setRegistrationSuccess(activity.title);
  };

  const filteredRecipes = recipeFilter === 'Todos' 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(r => r.category === recipeFilter);

  const filteredExperts = expertFilter === 'Todos'
    ? MOCK_EXPERTS
    : MOCK_EXPERTS.filter(e => e.category === expertFilter);

  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'google_maps_placeholder');

  const renderContent = () => {
    switch (activeTab) {
      case 'deportes':
        return (
          <div className="space-y-6 animate-fade-in pb-8">
            <p className="text-xs text-muted-foreground px-1">Próximos eventos y sesiones disponibles</p>
            {MOCK_SPORTS_ACTIVITIES.map(activity => (
              <Card key={activity.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-all group">
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white border-none backdrop-blur-sm rounded-full px-4 py-1 font-bold shadow-sm">
                      {activity.sport}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-foreground">{activity.title}</h3>
                  <p className="text-xs text-muted-foreground mb-5 line-clamp-2">{activity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground bg-secondary/20 p-3 rounded-2xl">
                      <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                        <CalendarIcon size={14} />
                      </div>
                      <span className="truncate">{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground bg-secondary/20 p-3 rounded-2xl">
                      <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                        <Clock size={14} />
                      </div>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleRegister(activity)}
                    className="w-full mt-6 h-12 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 group-hover:bg-primary/90 transition-colors"
                  >
                    Inscribirse Ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'relax':
        return (
          <div className="space-y-8 animate-fade-in pb-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-lg flex items-center gap-2"><Music size={20} className="text-primary" /> Podcasts para Meditar</h3>
                <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Nuevos</Badge>
              </div>
              <div className="grid gap-4">
                {MOCK_RELAXATION.podcasts.map(pod => (
                  <Card key={pod.id} className="rounded-3xl border-none shadow-sm bg-white overflow-hidden group">
                    <CardContent className="p-4 flex gap-4">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                        <img src={pod.image} alt={pod.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play size={24} className="text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-sm truncate">{pod.title}</h4>
                          <p className="text-[10px] text-muted-foreground font-medium">{pod.author} • {pod.duration}</p>
                          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{pod.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 rounded-full text-[10px] font-bold text-primary hover:bg-primary/5"
                            onClick={() => handleDownload(pod.title)}
                          >
                            <Download size={14} className="mr-1" /> Descargar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-lg flex items-center gap-2"><BookOpen size={20} className="text-primary" /> Libros y Guías</h3>
                <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Populares</Badge>
              </div>
              <div className="grid gap-4">
                {MOCK_RELAXATION.books.map(book => (
                  <Card key={book.id} className="rounded-3xl border-none shadow-sm bg-white overflow-hidden">
                    <CardContent className="p-0 flex h-40">
                      <img src={book.image} alt={book.title} className="w-1/3 object-cover" />
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm">{book.title}</h4>
                          <p className="text-[10px] text-primary font-bold">{book.author}</p>
                          <p className="text-[11px] text-muted-foreground mt-2 line-clamp-3">{book.description}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full h-9 rounded-xl text-[10px] border-primary/20 text-primary font-bold hover:bg-primary/5"
                          onClick={() => handleDownload(book.title)}
                        >
                          <Download size={14} className="mr-2" /> Descargar Guía
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        );
      case 'tiendas':
        if (selectedShopId) {
          const shop = MOCK_SHOPS.find(s => s.id === selectedShopId);
          if (!shop) return null;
          return (
            <div className="space-y-6 animate-fade-in pb-8">
              <Button variant="ghost" onClick={() => setSelectedShopId(null)} className="mb-2 p-0 h-auto font-bold text-primary hover:bg-transparent">
                <ArrowLeft size={18} className="mr-2" /> Volver al listado
              </Button>
              
              <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                <img src={shop.image} alt={shop.name} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-2xl">{shop.name}</h3>
                      <p className="text-xs text-primary font-bold">{shop.category}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none">{shop.distance}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{shop.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground">
                    <MapPin size={14} className="text-primary" /> {shop.address}
                  </div>
                </CardContent>
              </Card>

              <section className="space-y-4">
                <h4 className="font-bold text-lg px-1 flex items-center gap-2"><Map size={18} className="text-primary" /> Ubicación en el Mapa</h4>
                <div className="rounded-[2rem] overflow-hidden h-40 bg-secondary/30 relative">
                  <img 
                    src={mapPlaceholder?.imageUrl || "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000"} 
                    alt="Mapa de Google" 
                    className="w-full h-full object-cover opacity-80" 
                    data-ai-hint={mapPlaceholder?.imageHint || "google map"}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary p-3 rounded-full text-white shadow-xl animate-bounce">
                      <MapPin size={24} fill="white" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="font-bold text-lg px-1 flex items-center gap-2"><ShoppingBag size={18} className="text-primary" /> Productos Destacados</h4>
                <div className="grid gap-3">
                  {shop.products.map((prod, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                      <span className="text-sm font-medium">{prod.name}</span>
                      <span className="text-sm font-bold text-primary">{prod.price}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="font-bold text-lg px-1 flex items-center gap-2"><Tag size={18} className="text-primary" /> Cupones de Descuento</h4>
                <div className="grid gap-3">
                  {shop.coupons.map((coupon, i) => (
                    <Card key={i} className="rounded-2xl border-dashed border-2 border-primary/30 bg-primary/5 overflow-hidden">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-primary uppercase">{coupon.discount}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{coupon.description}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className="h-8 rounded-lg bg-primary text-[10px] font-bold"
                          onClick={() => handleCopyCoupon(coupon.code)}
                        >
                          Copia: {coupon.code}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          );
        }
        return (
          <div className="space-y-6 animate-fade-in pb-8">
            <p className="text-xs text-muted-foreground px-1">Tiendas saludables cerca de ti</p>
            <div className="grid gap-4">
              {MOCK_SHOPS.map(shop => (
                <Card 
                  key={shop.id} 
                  className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedShopId(shop.id)}
                >
                  <div className="flex h-32">
                    <div className="w-1/3 overflow-hidden">
                      <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm">{shop.name}</h3>
                          <Badge className="bg-secondary/50 text-primary text-[8px] px-1.5 h-4 border-none">{shop.distance}</Badge>
                        </div>
                        <p className="text-[10px] text-primary font-bold mt-0.5">{shop.category}</p>
                        <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2">{shop.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-medium">
                        <MapPin size={10} className="text-primary" /> {shop.address}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'expertos':
        return (
          <div className="space-y-6 animate-fade-in pb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {EXPERT_TABS.map(tab => (
                <Button 
                  key={tab}
                  variant={expertFilter === tab ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setExpertFilter(tab)}
                  className={cn("rounded-full px-4 h-9 font-bold transition-all", expertFilter === tab ? "bg-primary shadow-md" : "border-primary/20 text-primary")}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="grid gap-4">
              {filteredExperts.map(exp => (
                <Card key={exp.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/30 overflow-hidden shrink-0">
                      <img 
                        src={exp.image} 
                        alt={exp.name} 
                        className="w-full h-full object-cover" 
                        data-ai-hint="doctor portrait"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{exp.name}</h3>
                        <Badge variant="secondary" className="bg-primary/5 text-primary text-[8px] border-none uppercase">{exp.category}</Badge>
                      </div>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider">{exp.specialty}</p>
                      <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2">{exp.bio}</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="h-10 rounded-xl flex-1 border-primary/20 text-primary hover:bg-primary/5" asChild>
                          <a href={`tel:${exp.phone}`}><Phone size={14} className="mr-2" /> Llamar</a>
                        </Button>
                        <Button size="sm" variant="outline" className="h-10 rounded-xl flex-1 border-primary/20 text-primary hover:bg-primary/5" asChild>
                          <a href={`mailto:${exp.email}`}><Mail size={14} className="mr-2" /> Email</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'comidas':
        if (selectedRecipeId) {
          const recipe = MOCK_RECIPES.find(r => r.id === selectedRecipeId);
          if (!recipe) return null;
          return (
            <div className="space-y-6 animate-fade-in pb-8">
              <Button variant="ghost" onClick={() => setSelectedRecipeId(null)} className="mb-2 p-0 h-auto font-bold text-primary hover:bg-transparent">
                <ArrowLeft size={18} className="mr-2" /> Volver a recetas
              </Button>
              
              <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                <img src={recipe.image} alt={recipe.name} className="w-full h-56 object-cover" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-2xl">{recipe.name}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none mt-1">{recipe.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-primary">{recipe.nutrition.calories}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">Calorías</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 text-xs font-medium text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5 bg-secondary/30 px-3 py-1.5 rounded-full"><Clock size={14} className="text-primary" /> {recipe.time}</span>
                    <span className="flex items-center gap-1.5 bg-secondary/30 px-3 py-1.5 rounded-full"><ChefHat size={14} className="text-primary" /> {recipe.difficulty}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center mb-8">
                    <div className="bg-secondary/10 p-3 rounded-2xl">
                      <p className="text-primary font-bold">{recipe.nutrition.protein}</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold">Proteína</p>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-2xl">
                      <p className="text-primary font-bold">{recipe.nutrition.carbs}</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold">Carbs</p>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-2xl">
                      <p className="text-primary font-bold">{recipe.nutrition.fats}</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-bold">Grasas</p>
                    </div>
                  </div>

                  <section className="space-y-4 mb-8">
                    <h4 className="font-bold text-lg flex items-center gap-2 text-primary">
                      <ListChecks size={20} /> Ingredientes
                    </h4>
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground border-b border-border/50 pb-2">
                          <CheckCircle2 size={16} className="text-primary shrink-0" /> {ing}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2 text-primary">
                      <Timer size={20} /> Preparación
                    </h4>
                    <div className="space-y-6">
                      {recipe.instructions.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 text-sm">
                            {i + 1}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          );
        }
        return (
          <div className="space-y-6 animate-fade-in pb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {RECIPE_TABS.map(tab => (
                <Button 
                  key={tab}
                  variant={recipeFilter === tab ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRecipeFilter(tab)}
                  className={cn("rounded-full px-4 h-9 font-bold transition-all", recipeFilter === tab ? "bg-primary shadow-md" : "border-primary/20 text-primary")}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredRecipes.map(recipe => (
                <Card 
                  key={recipe.id} 
                  className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedRecipeId(recipe.id)}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-primary border-none rounded-full backdrop-blur-sm px-3 py-1 font-bold">
                        {recipe.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3">{recipe.name}</h3>
                    <div className="flex gap-4 text-xs text-muted-foreground mb-5 font-medium">
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {recipe.time}</span>
                      <span className="flex items-center gap-1.5"><ChefHat size={14} className="text-primary" /> {recipe.difficulty}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-center bg-secondary/20 p-4 rounded-2xl text-[11px] font-bold">
                      <div className="flex flex-col"><span className="text-primary text-sm">{recipe.nutrition.calories}</span><span className="text-muted-foreground font-medium">Cal</span></div>
                      <div className="flex flex-col"><span className="text-primary text-sm">{recipe.nutrition.protein}</span><span className="text-muted-foreground font-medium">Prot</span></div>
                      <div className="flex flex-col"><span className="text-primary text-sm">{recipe.nutrition.carbs}</span><span className="text-muted-foreground font-medium">Carbs</span></div>
                      <div className="flex flex-col"><span className="text-primary text-sm">{recipe.nutrition.fats}</span><span className="text-muted-foreground font-medium">Grasa</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'activa':
        return (
          <div className="space-y-4 animate-fade-in pb-8">
            {MOCK_PLACES.map(place => (
              <Card key={place.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                <img src={place.image} alt={place.name} className="w-full h-36 object-cover" />
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg">{place.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2 font-medium"><MapPin size={14} className="text-primary" /> {place.address}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {place.activities.map(a => <Badge key={a} variant="outline" className="text-[10px] rounded-full px-3 border-primary/20 text-primary font-bold">{a}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 text-center h-48 bg-white rounded-[2.5rem] border border-dashed border-muted-foreground/30">
            <p className="text-muted-foreground font-medium">Próximamente datos reales de {activeTab}.</p>
          </div>
        );
    }
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setSelectedShopId(null);
    setSelectedRecipeId(null);
  };

  const handleBackToCategories = () => {
    setActiveTab(null);
    setSelectedShopId(null);
    setSelectedRecipeId(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-in min-h-screen bg-secondary/5 pb-24">
      <header>
        <h1 className="text-2xl font-bold text-foreground">Actividades y Hub</h1>
        <p className="text-muted-foreground text-sm font-medium">Explora tu entorno saludable</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <Input placeholder="Buscar lugares, recetas..." className="pl-12 h-14 bg-white rounded-[1.5rem] border-none shadow-sm focus-visible:ring-primary/20 text-sm" />
      </div>

      {!activeTab ? (
        <section className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-4 text-center border border-transparent hover:border-primary/20 group"
            >
              <div className={cn("p-5 rounded-[1.8rem] transition-transform group-hover:scale-110", cat.color)}>
                <cat.icon size={32} />
              </div>
              <span className="font-bold text-sm text-foreground">{cat.name}</span>
            </button>
          ))}
        </section>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBackToCategories} className="h-10 w-10 p-0 rounded-full bg-white shadow-sm">
              <ChevronRight className="rotate-180" size={20} />
            </Button>
            <h2 className="font-bold text-xl capitalize text-foreground">{activeTab}</h2>
          </div>
          {renderContent()}
        </div>
      )}

      <Dialog open={!!registrationSuccess} onOpenChange={() => setRegistrationSuccess(null)}>
        <DialogContent className="rounded-[2.5rem] max-w-[85vw] p-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-black text-primary flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Sparkles size={40} className="text-primary" />
              </div>
              ¡Te has inscrito!
            </DialogTitle>
            <DialogDescription className="text-center pt-2 font-medium">
              Pronto te llegará toda la información sobre <span className="text-primary font-bold">{registrationSuccess}</span> a tu correo electrónico.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-6">
            <Button onClick={() => setRegistrationSuccess(null)} className="w-full h-12 rounded-2xl bg-primary font-bold">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!downloadSuccess} onOpenChange={() => setDownloadSuccess(null)}>
        <DialogContent className="rounded-[2.5rem] max-w-[85vw] p-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-black text-primary flex flex-col items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Download size={40} className="text-primary" />
              </div>
              ¡Archivo Descargado!
            </DialogTitle>
            <DialogDescription className="text-center pt-2 font-medium">
              El archivo <span className="text-primary font-bold">"{downloadSuccess}"</span> se ha guardado en descargas en tu dispositivo.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-6">
            <Button onClick={() => setDownloadSuccess(null)} className="w-full h-12 rounded-2xl bg-primary font-bold">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
