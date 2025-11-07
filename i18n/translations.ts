type TranslationKeys = {
  [key: string]: string;
};

type Translations = {
  es: TranslationKeys;
  en: TranslationKeys;
  it: TranslationKeys;
  ar: TranslationKeys;
  fr: TranslationKeys;
};

export const translations: Translations = {
  es: {
    // Navegación y Títulos
    home: 'Inicio',
    appName: 'Bokatas ONG',
    // Lista de recursos
    distanceUnit: 'km',
    noResources: 'No hay recursos disponibles en esta categoría.',
    // Detalles del recurso
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Email',
    hours: 'Horario',
    updated: 'Actualizado',
    // Geolocalización
    geolocationNotSupported: 'La geolocalización no es soportada por este navegador.',
    geolocationError: 'No se pudo obtener la ubicación.',
    // Mapa
    location: 'Ubicación',
    viewOnMap: 'Ver en Mapa',
    getDirections: 'Cómo llegar',
    userLocation: 'Tu ubicación',
    // FIX: Added new translation key for map info window button to avoid brittle string manipulation.
    viewDetails: 'Ver detalles',
    // FIX: Added missing translation keys for the Assistant component.
    assistantWelcome: 'Hola, soy tu asistente virtual. ¿Cómo puedo ayudarte hoy?',
    assistantPlaceholder: 'Escribe tu mensaje aquí...',
    assistantError: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.',
  },
  en: {
    // Navigation & Titles
    home: 'Home',
    appName: 'Bokatas ONG',
    // Resource List
    distanceUnit: 'km',
    noResources: 'No resources available in this category.',
    // Resource Detail
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Hours',
    updated: 'Updated',
    // Geolocation
    geolocationNotSupported: 'Geolocation is not supported by this browser.',
    geolocationError: 'Could not get location.',
    // Map
    location: 'Location',
    viewOnMap: 'View on Map',
    getDirections: 'Get Directions',
    userLocation: 'Your location',
    viewDetails: 'View details',
    assistantWelcome: 'Hello, I am your virtual assistant. How can I help you today?',
    assistantPlaceholder: 'Type your message here...',
    assistantError: 'I am sorry, an error has occurred. Please try again.',
  },
  it: {
    // Navigazione e Titoli
    home: 'Inizio',
    appName: 'Bokatas ONG',
    // Elenco Risorse
    distanceUnit: 'km',
    noResources: 'Nessuna risorsa disponibile in questa categoria.',
    // Dettaglio Risorsa
    address: 'Indirizzo',
    phone: 'Telefono',
    email: 'Email',
    hours: 'Orari',
    updated: 'Aggiornato',
    // Geolocalizzazione
    geolocationNotSupported: 'La geolocalizzazione non è supportata da questo browser.',
    geolocationError: 'Impossibile ottenere la posizione.',
    // Mappa
    location: 'Posizione',
    viewOnMap: 'Vedi sulla mappa',
    getDirections: 'Ottieni indicazioni',
    userLocation: 'La tua posizione',
    viewDetails: 'Vedi dettagli',
    assistantWelcome: 'Ciao, sono il tuo assistente virtuale. Come posso aiutarti oggi?',
    assistantPlaceholder: 'Scrivi qui il tuo messaggio...',
    assistantError: 'Mi dispiace, si è verificato un errore. Per favore, riprova.',
  },
  ar: {
    // التنقل والعناوين
    home: 'الرئيسية',
    appName: 'Bokatas ONG',
    // قائمة الموارد
    distanceUnit: 'كم',
    noResources: 'لا توجد موارد متاحة في هذه الفئة.',
    // تفاصيل المورد
    address: 'العنوان',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    hours: 'ساعات العمل',
    updated: 'محدث',
    // تحديد الموقع الجغرافي
    geolocationNotSupported: 'هذا المتصفح لا يدعم تحديد الموقع الجغرافي.',
    geolocationError: 'تعذر الحصول على الموقع.',
    // الخريطة
    location: 'الموقع',
    viewOnMap: 'عرض على الخريطة',
    getDirections: 'الحصول على الاتجاهات',
    userLocation: 'موقعك',
    viewDetails: 'عرض التفاصيل',
    assistantWelcome: 'مرحباً، أنا مساعدك الافتراضي. كيف يمكنني مساعدتك اليوم؟',
    assistantPlaceholder: 'اكتب رسالتك هنا...',
    assistantError: 'عذراً، لقد حدث خطأ. يرجى المحاولة مرة أخرى.',
  },
  fr: {
    // Navigation & Titres
    home: 'Accueil',
    appName: 'Bokatas ONG',
    // Liste des ressources
    distanceUnit: 'km',
    noResources: 'Aucune ressource disponible dans cette catégorie.',
    // Détails de la ressource
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    hours: 'Horaires',
    updated: 'Mis à jour',
    // Géolocalisation
    geolocationNotSupported: 'La géolocalisation n\'est pas prise en charge par ce navigateur.',
    geolocationError: 'Impossible d\'obtenir la localisation.',
    // Carte
    location: 'Emplacement',
    viewOnMap: 'Voir sur la carte',
    getDirections: 'Obtenir l\'itinéraire',
    userLocation: 'Votre emplacement',
    viewDetails: 'Voir les détails',
    assistantWelcome: 'Bonjour, je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
    assistantPlaceholder: 'Écrivez votre message ici...',
    assistantError: 'Désolé, une erreur est survenue. Veuillez réessayer.',
  },
};
