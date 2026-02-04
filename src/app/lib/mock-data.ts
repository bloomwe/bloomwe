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
