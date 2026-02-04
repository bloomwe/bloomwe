export const MOCK_EXPERTS = [
  {
    id: '1',
    category: 'Médicos Generales',
    name: 'Dr. Julián Rivera',
    specialty: 'Medicina General y Preventiva',
    experience: 8,
    bio: 'Especialista en salud joven y prevención de enfermedades crónicas.',
    phone: '+573001234567',
    email: 'julian.rivera@bloomwell.com',
    location: 'Centro Médico Norte, Piso 4',
    hours: 'Lun-Vie 8am - 5pm'
  },
  {
    id: '2',
    category: 'Nutricionistas',
    name: 'Dra. Sofía Mendez',
    specialty: 'Nutrición Deportiva',
    experience: 5,
    bio: 'Ayudo a jóvenes a optimizar su rendimiento a través de la alimentación.',
    phone: '+573007654321',
    email: 'sofia.m@bloomwell.com',
    location: 'Consultorio Vitalia 202',
    hours: 'Lun-Sáb 9am - 1pm'
  }
];

export const MOCK_RECIPES = [
  {
    id: '1',
    category: 'Ligeras',
    name: 'Bowl de Quinoa y Mango',
    time: '15 min',
    difficulty: 'Fácil',
    ingredients: ['1 taza quinoa', 'Mango picado', 'Espinacas', 'Aderezo limón'],
    instructions: ['Cocina la quinoa', 'Mezcla con vegetales', 'Añade el mango', 'Aliña al gusto'],
    nutrition: { calories: 320, protein: '12g', carbs: '45g', fats: '8g' },
    image: 'https://picsum.photos/seed/food1/400/300'
  },
  {
    id: '2',
    category: 'Snacks',
    name: 'Energy Balls de Avena',
    time: '10 min',
    difficulty: 'Muy Fácil',
    ingredients: ['Avena', 'Crema de maní', 'Miel', 'Chispas de cacao'],
    instructions: ['Mezcla todo', 'Forma bolitas', 'Refrigera 20 min'],
    nutrition: { calories: 150, protein: '5g', carbs: '20g', fats: '6g' },
    image: 'https://picsum.photos/seed/food2/400/300'
  }
];

export const MOCK_PLACES = [
  {
    id: '1',
    name: 'Parque de la Salud',
    address: 'Av. Bienestar #123',
    activities: ['Running', 'Calistenia', 'Yoga'],
    hours: '5am - 9pm',
    image: 'https://picsum.photos/seed/park1/400/300'
  },
  {
    id: '2',
    name: 'Centro Deportivo El Turquesa',
    address: 'Calle Deporte #45',
    activities: ['Fútbol', 'Natación'],
    hours: '6am - 10pm',
    image: 'https://picsum.photos/seed/gym1/400/300'
  }
];

export const MOCK_SPORTS_ACTIVITIES = [
  {
    id: 's1',
    sport: 'Yoga',
    title: 'Yoga al Atardecer',
    date: 'Miércoles, 18 Oct',
    time: '05:30 PM',
    duration: '60 min',
    location: 'Mirador del Parque',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000',
    description: 'Encuentra tu equilibrio interior con una sesión guiada frente al sol poniente.'
  },
  {
    id: 's2',
    sport: 'Running',
    title: 'Carrera 5K Comunitaria',
    date: 'Sábado, 21 Oct',
    time: '07:00 AM',
    duration: '45-60 min',
    location: 'Entrada Principal Parque',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000',
    description: 'Únete a nuestro grupo de corredores para una ruta escénica de 5 kilómetros.'
  },
  {
    id: 's3',
    sport: 'Fútbol',
    title: 'Torneo Relámpago 5x5',
    date: 'Domingo, 22 Oct',
    time: '10:00 AM',
    duration: '120 min',
    location: 'Canchas Sintéticas Norte',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000',
    description: 'Arma tu equipo y participa en nuestro torneo amistoso de fin de semana.'
  },
  {
    id: 's4',
    sport: 'Natación',
    title: 'Clase Abierta de Técnica',
    date: 'Lunes, 23 Oct',
    time: '06:00 PM',
    duration: '50 min',
    location: 'Complejo Acuático Municipal',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000',
    description: 'Mejora tu brazada con consejos de instructores profesionales en piscina climatizada.'
  }
];

export const MOCK_SOCIAL_FEED = [
  {
    id: '1',
    name: 'Mateo González',
    photo: 'https://picsum.photos/seed/u1/150/150',
    bio: 'Amante del yoga y la vida sana. ¡Vamos por esos 30 días!',
    recentActivity: 'Completó sesión de Yoga 20 min',
    interests: ['Yoga', 'Lectura'],
    streak: 15
  },
  {
    id: '2',
    name: 'Valentina Ruiz',
    photo: 'https://picsum.photos/seed/u2/150/150',
    bio: 'Correr me hace libre. Busco partners para el parque.',
    recentActivity: 'Corrió 5km en el Parque Central',
    interests: ['Running', 'Ciclismo'],
    streak: 7
  }
];

export const MOCK_RELAXATION = {
  podcasts: [
    { id: '1', title: 'Mente Serena', duration: '20 min', author: 'Dr. Calma' },
    { id: '2', title: 'Wellness Diario', duration: '15 min', author: 'Ana Salud' }
  ],
  books: [
    { id: '1', title: 'El Arte de Respirar', author: 'James Nestor', synopsis: 'Una guía sobre la importancia de la respiración.' },
    { id: '2', title: 'Hábitos Atómicos', author: 'James Clear', synopsis: 'Cómo pequeños cambios traen grandes resultados.' }
  ]
};

export const HOBBIES_LIST = [
  'Yoga', 'Gimnasio', 'Ciclismo', 'Meditación', 'Lectura', 'Natación', 'Baile', 'Correr'
];

export const LEVELS = ['Nuevo', 'Medio', 'Avanzado', 'Experto'];
