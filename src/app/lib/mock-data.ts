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
    ingredients: ['1 taza quinoa cocida', '1 Mango maduro picado', '2 tazas de Espinacas baby', 'Aderezo de limón y miel', 'Semillas de chía'],
    instructions: [
      'Lava bien la quinoa y cocínala siguiendo las instrucciones del paquete.',
      'En un bowl grande, coloca una base de espinacas frescas.',
      'Añade la quinoa cocida templada o fría.',
      'Incorpora el mango picado en cubos.',
      'Rocía con el aderezo de limón y espolvorea las semillas de chía.'
    ],
    nutrition: { calories: 320, protein: '12g', carbs: '45g', fats: '8g' },
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000'
  },
  {
    id: '2',
    category: 'Snacks',
    name: 'Energy Balls de Avena',
    time: '10 min',
    difficulty: 'Muy Fácil',
    ingredients: ['1 taza de Avena en hojuelas', '1/2 taza de Crema de maní natural', '1/4 taza de Miel o sirope de agave', '2 cucharadas de Chispas de cacao dark'],
    instructions: [
      'En un recipiente mediano, mezcla la avena con la crema de maní y la miel.',
      'Añade las chispas de cacao y mezcla hasta tener una masa homogénea.',
      'Forma bolitas pequeñas con las manos.',
      'Colócalas en un plato y refrigera por al menos 20 minutos antes de consumir.'
    ],
    nutrition: { calories: 150, protein: '5g', carbs: '20g', fats: '6g' },
    image: 'https://images.unsplash.com/photo-1590080875515-8a03b1447a99?q=80&w=1000'
  },
  {
    id: '3',
    category: 'Fuertes',
    name: 'Salmón al Horno con Espárragos',
    time: '25 min',
    difficulty: 'Media',
    ingredients: ['1 filete de Salmón fresco', '1 manojo de Espárragos verdes', 'Aceite de oliva extra virgen', 'Limón, sal y pimienta', 'Ajo en polvo'],
    instructions: [
      'Precalienta el horno a 200°C.',
      'Coloca el salmón y los espárragos en una bandeja para horno.',
      'Sazona con sal, pimienta, ajo en polvo y un chorrito de aceite de oliva.',
      'Hornea durante 12-15 minutos dependiendo del grosor del pescado.',
      'Sirve con rodajas de limón fresco encima.'
    ],
    nutrition: { calories: 450, protein: '35g', carbs: '10g', fats: '28g' },
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000'
  },
  {
    id: '4',
    category: 'Fuertes',
    name: 'Tacos de Pollo Saludables',
    time: '20 min',
    difficulty: 'Fácil',
    ingredients: ['Pechuga de pollo desmechada', 'Tortillas de maíz integral', 'Aguacate machacado', 'Pico de gallo (tomate y cebolla)', 'Cilantro fresco'],
    instructions: [
      'Cocina el pollo y desméchalo.',
      'Calienta las tortillas en una sartén.',
      'Unta un poco de aguacate en cada tortilla.',
      'Añade el pollo y el pico de gallo.',
      'Termina con cilantro fresco y unas gotas de limón.'
    ],
    nutrition: { calories: 380, protein: '28g', carbs: '32g', fats: '15g' },
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1000'
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

export const MOCK_SHOPS = [
  {
    id: 'shop1',
    name: 'BioMarket Orgánico',
    category: 'Alimentación',
    distance: '800 m',
    address: 'Calle Verde #10-20',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000',
    description: 'Productos locales y orgánicos para una vida equilibrada.',
    products: [
      { name: 'Miel de Abeja Pura', price: '$12.000' },
      { name: 'Quinoa Real 500g', price: '$8.500' },
      { name: 'Kombucha Ancestral', price: '$6.000' }
    ],
    coupons: [
      { code: 'BIO10', discount: '10% OFF', description: 'En toda la tienda' },
      { code: 'FRUTAS20', discount: '20% OFF', description: 'En sección frutería' }
    ]
  },
  {
    id: 'shop2',
    name: 'SportXtreme',
    category: 'Ropa Deportiva',
    distance: '1.2 km',
    address: 'C.C. Portal Norte, Local 45',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000',
    description: 'Equipamiento de alto rendimiento para todos los niveles.',
    products: [
      { name: 'Tenis de Running Pro', price: '$250.000' },
      { name: 'Mat de Yoga Premium', price: '$45.000' },
      { name: 'Bandas Elásticas (Set)', price: '$15.000' }
    ],
    coupons: [
      { code: 'RUN25', discount: '25% OFF', description: 'En calzado de correr' }
    ]
  },
  {
    id: 'shop3',
    name: 'Zen Apothecary',
    category: 'Bienestar',
    distance: '2.5 km',
    address: 'Carrera 15 #82-11',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
    description: 'Aceites esenciales, cristales y herramientas para meditación.',
    products: [
      { name: 'Difusor de Aromas', price: '$110.000' },
      { name: 'Incienso de Sándalo', price: '$5.000' },
      { name: 'Aceite de Lavanda', price: '$25.000' }
    ],
    coupons: [
      { code: 'PAZINTERIOR', discount: '15% OFF', description: 'En primer kit de aceites' }
    ]
  },
  {
    id: 'shop4',
    name: 'NutriFit Store',
    category: 'Suplementos',
    distance: '5.0 km',
    address: 'Av. El Dorado #68',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000',
    description: 'Todo lo que necesitas para tu nutrición y recuperación muscular.',
    products: [
      { name: 'Proteína Whey 2lb', price: '$140.000' },
      { name: 'Creatina Monohidratada', price: '$60.000' },
      { name: 'BCAAs 30 servicios', price: '$75.000' }
    ],
    coupons: [
      { code: 'FIT2024', discount: '20% OFF', description: 'En toda la sección de proteínas' }
    ]
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
    { 
      id: 'p1', 
      title: 'Mente Serena', 
      duration: '20 min', 
      author: 'Dr. Calma', 
      image: 'https://images.unsplash.com/photo-1478737270239-2fccd27ee10f?q=80&w=1000',
      description: 'Una guía diaria para reducir el estrés y encontrar paz mental en minutos.'
    },
    { 
      id: 'p2', 
      title: 'Wellness Diario', 
      duration: '15 min', 
      author: 'Ana Salud', 
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000',
      description: 'Pequeños consejos de salud mental para aplicar en tu rutina universitaria.'
    },
    { 
      id: 'p3', 
      title: 'Sonidos del Bosque', 
      duration: '45 min', 
      author: 'Naturaleza Viva', 
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000',
      description: 'Inmersión acústica total para concentrarte o dormir profundamente.'
    }
  ],
  books: [
    { 
      id: 'b1', 
      title: 'El Arte de Respirar', 
      author: 'James Nestor', 
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000',
      description: 'Explora cómo la forma en que respiras afecta cada aspecto de tu bienestar físico.' 
    },
    { 
      id: 'b2', 
      title: 'Hábitos Atómicos', 
      author: 'James Clear', 
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000',
      description: 'Aprende a construir rutinas que duren toda la vida con cambios minúsculos.' 
    },
    { 
      id: 'b3', 
      title: 'Minimalismo Digital', 
      author: 'Cal Newport', 
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000',
      description: 'Encuentra el equilibrio en un mundo lleno de distracciones tecnológicas.'
    }
  ]
};

export const HOBBIES_LIST = [
  'Yoga', 'Gimnasio', 'Ciclismo', 'Meditación', 'Lectura', 'Natación', 'Baile', 'Correr'
];

export const LEVELS = ['Nuevo', 'Medio', 'Avanzado', 'Experto'];
