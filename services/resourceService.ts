import type { Resource, Category } from '../types';
import {
  BedIcon,
  FoodIcon,
  HealthIcon,
  WorkIcon,
  MapIcon,
  InfoIcon,
  ShowerIcon,
  ClothesIcon,
  BookIcon,
  WomanIcon,
  CompassIcon,
  LegalIcon,
  OtherIcon,
  StreetIcon
} from '../components/icons/CategoryIcons'; // Asumo que tienes todos estos iconos

const categories: Category[] = [
  { 
    id: 'primeros-pasos', 
    name: { es: 'Primeros Pasos', en: 'First Steps', it: 'Primi Passi', ar: 'الخطوات الأولى', fr: 'Premiers Pas' },
    description: { es: 'Atención social y orientación inicial.', en: 'Social care and initial guidance.', it: 'Assistenza sociale e orientamento iniziale.', ar: 'الرعاية الاجتماعية والتوجيه الأولي', fr: 'Prise en charge sociale et orientation initiale.' },
    icon: InfoIcon 
  },
  { 
    id: 'albergues', 
    name: { es: 'Dormir', en: 'Sleep', it: 'Dormire', ar: 'النوم', fr: 'Dormir' },
    description: { es: 'Lugares para dormir y pasar la noche.', en: 'Places to sleep and spend the night.', it: 'Posti per dormire e passare la notte.', ar: 'أماكن للنوم وقضاء الليلة', fr: 'Lieux pour dormir et passer la nuit.' },
    icon: BedIcon 
  },
  { 
    id: 'comida', 
    name: { es: 'Comer', en: 'Food', it: 'Cibo', ar: 'الطعام', fr: 'Nourriture' },
    description: { es: 'Bancos de alimentos y comedores sociales.', en: 'Food banks and soup kitchens.', it: 'Banchi alimentari e mense sociali.', ar: 'بنوك الطعام والمطابخ الخيرية', fr: 'Banques alimentaires et soupes populaires.' },
    icon: FoodIcon 
  },
  { 
    id: 'higiene', 
    name: { es: 'Higiene', en: 'Hygiene', it: 'Igiene', ar: 'النظافة', fr: 'Hygiène' },
    description: { es: 'Duchas, lavandería y peluquería.', en: 'Showers, laundry, and grooming.', it: 'Docce, lavanderia e parrucchiere.', ar: 'الاستحمام، غسيل الملابس، والحلاقة', fr: 'Douches, blanchisserie et coiffure.' },
    icon: ShowerIcon 
  },
  { 
    id: 'salud', 
    name: { es: 'Salud', en: 'Health', it: 'Salute', ar: 'الصحة', fr: 'Santé' },
    description: { es: 'Clínicas y servicios médicos gratuitos.', en: 'Free clinics and medical services.', it: 'Cliniche e servizi medici gratuiti.', ar: 'العيادات والخدمات الطبية المجانية', fr: 'Cliniques et services médicaux gratuits.' },
    icon: HealthIcon 
  },
  { 
    id: 'ropa', 
    name: { es: 'Ropa', en: 'Clothing', it: 'Vestiario', ar: 'الملابس', fr: 'Vêtements' },
    description: { es: 'Roperos y entrega de mantas.', en: 'Clothing banks and blanket distribution.', it: 'Guardaroba e distribuzione di coperte.', ar: 'بنوك الملابس وتوزيع البطانيات', fr: 'Vestiaires et distribution de couvertures.' },
    icon: ClothesIcon 
  },
  { 
    id: 'empleo', 
    name: { es: 'Empleo', en: 'Employment', it: 'Lavoro', ar: 'العمل', fr: 'Emploi' },
    description: { es: 'Ayuda para encontrar trabajo y formación.', en: 'Help with job searching and training.', it: 'Aiuto per trovare lavoro e formazione.', ar: 'المساعدة في إيجاد عمل والتدريب', fr: 'Aide à la recherche d\'emploi et à la formation.' },
    icon: WorkIcon 
  },
  { 
    id: 'juridico', 
    name: { es: 'Asesoría Jurídica', en: 'Legal Aid', it: 'Assistenza Legale', ar: 'المساعدة القانونية', fr: 'Aide Juridique' },
    description: { es: 'Ayuda legal y de extranjería.', en: 'Legal and immigration assistance.', it: 'Assistenza legale e per l\'immigrazione.', ar: 'المساعدة القانونية وشؤون الهجرة', fr: 'Aide juridique et en matière d\'immigration.' },
    icon: LegalIcon 
  },
  { 
    id: 'clases', 
    name: { es: 'Clases', en: 'Classes', it: 'Corsi', ar: 'دروس', fr: 'Cours' },
    description: { es: 'Clases de español y otros idiomas.', en: 'Spanish and other language classes.', it: 'Corsi di spagnolo e altre lingue.', ar: 'دروس اللغة الإسبانية ولغات أخرى', fr: 'Cours d\'espagnol et d\'autres langues.' },
    icon: BookIcon 
  },
  { 
    id: 'mujer', 
    name: { es: 'Ayuda Mujer', en: 'Women\'s Aid', it: 'Aiuto Donne', ar: 'مساعدة المرأة', fr: 'Aide aux Femmes' },
    description: { es: 'Recursos específicos para mujeres.', en: 'Specific resources for women.', it: 'Risorse specifiche per le donne.', ar: 'موارد خاصة بالنساء', fr: 'Ressources spécifiques pour les femmes.' },
    icon: WomanIcon 
  },
  { 
    id: 'orientacion', 
    name: { es: 'Orientación', en: 'Guidance', it: 'Orientamento', ar: 'التوجيه', fr: 'Orientation' },
    description: { es: 'Ayuda con vivienda y otros trámites.', en: 'Help with housing and other procedures.', it: 'Aiuto con alloggio e altre procedure.', ar: 'المساعدة في الإسكان والإجراءات الأخرى', fr: 'Aide au logement et autres démarches.' },
    icon: CompassIcon 
  },
  { 
    id: 'calle', 
    name: { es: 'Equipos de Calle', en: 'Street Teams', it: 'Unità di Strada', ar: 'فرق الشوارع', fr: 'Équipes de Rue' },
    description: { es: 'Ayuda y comida en la calle.', en: 'Help and food on the street.', it: 'Aiuto e cibo in strada.', ar: 'المساعدة والطعام في الشارع', fr: 'Aide et nourriture dans la rue.' },
    icon: StreetIcon 
  },
  { 
    id: 'mapa', 
    name: { es: 'Mapa Albergues', en: 'Shelter Map', it: 'Mappa Rifugi', ar: 'خريطة الملاجئ', fr: 'Carte des Hébergements' },
    description: { es: 'Mapa de gestión de albergues.', en: 'Shelter management map.', it: 'Mappa di gestione dei rifugi.', ar: 'خريطة إدارة الملاجئ', fr: 'Carte de gestion des hébergements.' },
    icon: MapIcon 
  },
  { 
    id: 'otros', 
    name: { es: 'Otros Recursos', en: 'Other Resources', it: 'Altre Risorse', ar: 'موارد أخرى', fr: 'Autres Ressources' },
    description: { es: 'Otras ayudas y servicios.', en: 'Other aid and services.', it: 'Altri aiuti e servizi.', ar: 'مساعدات وخدمات أخرى', fr: 'Autres aides et services.' },
    icon: OtherIcon 
  },
];

const resources: Resource[] = [
  // --- PRIMEROS PASOS ---
  {
    id: 'pasos-1',
    categoryId: 'primeros-pasos',
    name: { es: 'CAST', en: 'CAST', it: 'CAST', ar: 'CAST', fr: 'CAST' },
    description: { 
      es: 'Atención social individualizada. Programas específicos para personas sin hogar. Atención sanitaria especializada.',
      en: 'Individualized social care. Specific programs for homeless people. Specialized health care.',
      it: 'Assistenza sociale individualizzata. Programmi specifici per persone senza fissa dimora. Assistenza sanitaria specializzata.',
      ar: 'رعاية اجتماعية فردية. برامج محددة للمشردين. رعاية صحية متخصصة.',
      fr: 'Prise en charge sociale individualisée. Programmes spécifiques pour les sans-abri. Soins de santé spécialisés.'
    },
    address: '',
    phone: '96-208-47-47',
    email: 'sast@valencia.es',
    hours: 'L-V (8:00 a 15:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.01.21'
  },
  {
    id: 'pasos-2',
    categoryId: 'primeros-pasos',
    name: { es: 'CAI', en: 'CAI', it: 'CAI', ar: 'CAI', fr: 'CAI' },
    description: { 
      es: 'Información, orientación y asesoramiento jurídico a personas inmigrantes.',
      en: 'Information, guidance, and legal advice for immigrants.',
      it: 'Informazione, orientamento e consulenza legale per immigrati.',
      ar: 'معلومات وتوجيه واستشارة قانونية للمهاجرين.',
      fr: 'Information, orientation et conseil juridique pour les immigrants.'
    },
    address: '',
    phone: '96 208 74 23',
    email: 'cai.amics@valencia.es',
    hours: 'L-V (8:00 a 20:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.01.21'
  },

  // --- MAPA ---
  {
    id: 'map-1',
    categoryId: 'mapa',
    name: { es: 'MAPA', en: 'MAP', it: 'MAPPA', ar: 'خريطة', fr: 'CARTE' },
    description: { 
      es: 'Gestión de albergues.',
      en: 'Shelter management.',
      it: 'Gestione dei rifugi.',
      ar: 'إدارة الملاجئ.',
      fr: 'Gestion des hébergements.'
    },
    address: '',
    phone: '',
    email: '',
    hours: 'L-V (8:00 a 15:00/16:00)',
    coordinates: { lat: 0, lng: 0 },
  },

  // --- HIGIENE ---
  {
    id: 'hig-1',
    categoryId: 'higiene',
    name: { es: 'KASA CARIDAD', en: 'KASA CARIDAD', it: 'KASA CARIDAD', ar: 'KASA CARIDAD', fr: 'KASA CARIDAD' },
    description: { 
      es: 'Peluquería, Duchas (solo usuarios). Funciona con cita previa. Contacto: Lorena.',
      en: 'Hairdressing, Showers (users only). By appointment. Contact: Lorena.',
      it: 'Parrucchiere, Docce (solo utenti). Funziona su appuntamento. Contatto: Lorena.',
      ar: 'حلاقة، حمامات (للمستخدمين فقط). تعمل بموعد مسبق. الاتصال: لورينا.',
      fr: 'Coiffure, Douches (utilisateurs uniquement). Sur rendez-vous. Contact : Lorena.'
    },
    address: 'Paseo de la Pechina',
    phone: '963 91 17 26',
    email: 'tsociallorena@casacaridad.com',
    hours: 'L-V (con cita previa)',
    coordinates: { lat: 39.4746, lng: -0.3934 },
    updated: '30.05.24'
  },
  {
    id: 'hig-2',
    categoryId: 'higiene',
    name: { es: 'PROYECTO REHOBOTH (Asociación Natania)', en: 'REHOBOTH PROJECT (Natania Assoc.)', it: 'PROGETTO REHOBOTH (Assoc. Natania)', ar: 'مشروع رحوبوت (جمعية نتانيا)', fr: 'PROJET REHOBOTH (Assoc. Natania)' },
    description: { 
      es: 'Duchas, lavandería, consigna y alimentación ligera. Mediante cita previa.',
      en: 'Showers, laundry, luggage storage, and light meals. By appointment.',
      it: 'Docce, lavanderia, deposito bagagli e pasti leggeri. Su appuntamento.',
      ar: 'حمامات، غسيل ملابس، تخزين أمتعة ووجبات خفيفة. بموعد مسبق.',
      fr: 'Douches, blanchisserie, consigne et repas légers. Sur rendez-vous.'
    },
    address: 'Estebanit S',
    phone: '685 86 52 51 / 691 79 84 63',
    email: 'info@natania.es',
    hours: 'L-V, 4 turnos (8:00-19:30)',
    coordinates: { lat: 39.4623, lng: -0.4042 },
    updated: '01.05.21'
  },
  {
    id: 'hig-3',
    categoryId: 'higiene',
    name: { es: 'MISION URBANA', en: 'MISION URBANA', it: 'MISION URBANA', ar: 'MISION URBANA', fr: 'MISION URBANA' },
    description: { 
      es: 'Higiene personal (duchas y ropa interior). Ropero condicionado a higiene. Peluquería: lunes. Funciona con cita previa.',
      en: 'Personal hygiene (showers and underwear). Clothing service conditioned on hygiene. Hairdressing: Monday. By appointment.',
      it: 'Igiene personale (docce e biancheria intima). Servizio guardaroba condizionato all\'igiene. Parrucchiere: lunedì. Su appuntamento.',
      ar: 'النظافة الشخصية (حمامات وملابس داخلية). خدمة الملابس مشروطة بالنظافة. حلاقة: الاثنين. تعمل بموعد مسبق.',
      fr: 'Hygiène personnelle (douches et sous-vêtements). Service de vêtements conditionné à l\'hygiène. Coiffure : lundi. Sur rendez-vous.'
    },
    address: 'Botzer de Floc 15',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'L, M y V (9:30-12:30), M (16:30-18:30)',
    coordinates: { lat: 39.4862, lng: -0.3976 },
    updated: '30.05.24'
  },
  {
    id: 'hig-4',
    categoryId: 'higiene',
    name: { es: 'ASED (MÉDICOS DEL MUNDO)', en: 'ASED (DOCTORS OF THE WORLD)', it: 'ASED (MEDICI DEL MONDO)', ar: 'أسيد (أطباء العالم)', fr: 'ASED (MÉDECINS DU MONDE)' },
    description: { 
      es: 'Duchas (sólo usuarios del centro mediante cita previa, excepto viernes que es solo para mujeres sin cita).',
      en: 'Showers (center users only by appointment, except Fridays for women without appointment).',
      it: 'Docce (solo utenti del centro su appuntamento, tranne il venerdì solo per donne senza appuntamento).',
      ar: 'حمامات (لمستخدمي المركز فقط بموعد مسبق، باستثناء أيام الجمعة للنساء فقط بدون موعد).',
      fr: 'Douches (utilisateurs du centre uniquement sur rendez-vous, sauf le vendredi pour les femmes sans rendez-vous).'
    },
    address: '',
    phone: '96 391 97 23',
    email: 'valencia@medicosdelmundo.org',
    hours: 'L-J (turnos 12:30-17:30 H/M), V (11h-13h solo mujeres)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.05.24'
  },
  {
    id: 'hig-5',
    categoryId: 'higiene',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Dirigido exclusivamente a drogodependientes en activo. VIH+/SIDA. Higiene, ropero y lavandería.',
      en: 'Exclusively for active drug users. HIV+/AIDS. Hygiene, clothing, and laundry.',
      it: 'Rivolto esclusivamente a tossicodipendenti attivi. HIV+/AIDS. Igiene, guardaroba e lavanderia.',
      ar: 'موجه حصريًا لمتعاطي المخدرات النشطين. فيروس نقص المناعة البشرية / الإيدز. النظافة، الملابس، وغسيل الملابس.',
      fr: 'Exclusivement pour les toxicomanes actifs. VIH+/SIDA. Hygiène, vêtements et blanchisserie.'
    },
    address: 'Comisario Cierco 39',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 39.4820, lng: -0.3475 },
    updated: '20.01.21'
  },
  {
    id: 'hig-6',
    categoryId: 'higiene',
    name: { es: 'Comité Antisida (MARITIM)', en: 'Anti-AIDS Committee (MARITIM)', it: 'Comitato Anti-AIDS (MARITIM)', ar: 'لجنة مكافحة الإيدز (ماريتيم)', fr: 'Comité Anti-SIDA (MARITIM)' },
    description: { 
      es: 'Centro de día que proporciona a sus usuarios (drogodependientes) alimentación, ducha y ropero.',
      en: 'Day center providing users (drug users) with food, shower, and clothing.',
      it: 'Centro diurno che fornisce ai suoi utenti (tossicodipendenti) cibo, doccia e guardaroba.',
      ar: 'مركز نهاري يوفر للمستخدمين (متعاطي المخدرات) الطعام، حمام، وملابس.',
      fr: 'Centre de jour fournissant aux utilisateurs (toxicomanes) nourriture, douche et vêtements.'
    },
    address: '',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:30)',
    coordinates: { lat: 0, lng: 0 },
    updated: '30.05.24'
  },
  {
    id: 'hig-7',
    categoryId: 'higiene',
    name: { es: 'ACCEM', en: 'ACCEM', it: 'ACCEM', ar: 'ACCEM', fr: 'ACCEM' },
    description: { 
      es: 'Lavadoras, duchas, peluquería. Funciona con cita previa (turnos se reparten a las 9am). Se recomienda llamar y derivar desde Bokatas.',
      en: 'Washing machines, showers, hairdressing. By appointment (slots given at 9am). Recommended to call and get referred from Bokatas.',
      it: 'Lavatrici, docce, parrucchiere. Su appuntamento (turni assegnati alle 9). Si consiglia di chiamare e farsi inviare da Bokatas.',
      ar: 'غسالات، حمامات، حلاقة. تعمل بموعد مسبق (تُوزع المواعيد الساعة 9 صباحًا). يوصى بالاتصال والحصول على إحالة من بوكاتاس.',
      fr: 'Machines à laver, douches, coiffure. Sur rendez-vous (créneaux distribués à 9h). Il est recommandé d\'appeler et d\'être référé par Bokatas.'
    },
    address: 'C/ Mestre Fenollar',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'vsimonm@accem.es',
    hours: 'L a V (9:00 a 13:00) M (solo mujeres)',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '30.05.24'
  },
  {
    id: 'hig-8',
    categoryId: 'higiene',
    name: { es: 'ACCEM (Centre de Nit)', en: 'ACCEM (Night Center)', it: 'ACCEM (Centro Notturno)', ar: 'ACCEM (المركز الليلي)', fr: 'ACCEM (Centre de Nuit)' },
    description: { 
      es: 'Desayunos/almuerzos. Funciona con cita previa (turnos se reparten a las 9am).',
      en: 'Breakfasts/lunches. By appointment (slots given at 9am).',
      it: 'Colazioni/pranzi. Su appuntamento (turni assegnati alle 9).',
      ar: 'وجبات إفطار / غداء. تعمل بموعد مسبق (تُوزع المواعيد الساعة 9 صباحًا).',
      fr: 'Petits-déjeuners/déjeuners. Sur rendez-vous (créneaux distribués à 9h).'
    },
    address: 'C/ Mestre Fenollar',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'vsimonm@accem.es',
    hours: 'L a V (9:00 a 13:00) M (solo mujeres)',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '30.05.24'
  },

  // --- COMER ---
  {
    id: 'com-1',
    categoryId: 'comida',
    name: { es: 'KASA CARIDAD', en: 'KASA CARIDAD', it: 'KASA CARIDAD', ar: 'KASA CARIDAD', fr: 'KASA CARIDAD' },
    description: { 
      es: 'Comedor. Funciona con cita previa, aforo limitado. Contacto: Lorena.',
      en: 'Dining hall. By appointment, limited capacity. Contact: Lorena.',
      it: 'Mensa. Su appuntamento, capacità limitata. Contatto: Lorena.',
      ar: 'قاعة طعام. تعمل بموعد مسبق، العدد محدود. الاتصال: لورينا.',
      fr: 'Réfectoire. Sur rendez-vous, capacité limitée. Contact : Lorena.'
    },
    address: 'Paseo de la Pechina',
    phone: '96 391 17 26',
    email: 'tsociallorena@casacaridad.com',
    hours: 'L a D (13:30 a 14:30)',
    coordinates: { lat: 39.4746, lng: -0.3934 },
    updated: '30.05.24'
  },
  {
    id: 'com-2',
    categoryId: 'comida',
    name: { es: 'MISION URBANA', en: 'MISION URBANA', it: 'MISION URBANA', ar: 'MISION URBANA', fr: 'MISION URBANA' },
    description: { 
      es: 'Desayuno. Contacto: Emilia.',
      en: 'Breakfast. Contact: Emilia.',
      it: 'Colazione. Contatto: Emilia.',
      ar: 'وجبة افطار. الاتصال: إميليا.',
      fr: 'Petit-déjeuner. Contact : Emilia.'
    },
    address: '',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'L, M y V (9:30 a 12:30)',
    coordinates: { lat: 0, lng: 0 },
    updated: '30.05.24'
  },
  {
    id: 'com-3',
    categoryId: 'comida',
    name: { es: 'MÉDICOS DEL MUNDO', en: 'DOCTORS OF THE WORLD', it: 'MEDICI DEL MONDO', ar: 'أطباء العالم', fr: 'MÉDECINS DU MONDE' },
    description: { 
      es: 'Usuarios del centro mediante cita previa, excepto los viernes que es solo para mujeres y se puede acudir sin cita.',
      en: 'Center users by appointment, except Fridays for women without appointment.',
      it: 'Utenti del centro su appuntamento, tranne il venerdì solo per donne senza appuntamento.',
      ar: 'لمستخدمي المركز بموعد مسبق، باستثناء أيام الجمعة للنساء فقط بدون موعد.',
      fr: 'Utilisateurs du centre sur rendez-vous, sauf le vendredi pour les femmes sans rendez-vous.'
    },
    address: '',
    phone: '96 391 97 24',
    email: '',
    hours: 'L-J (turnos 12:30-17:30 H/M), V (11h-13h solo mujeres)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.05.24'
  },
  {
    id: 'com-4',
    categoryId: 'comida',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Dirigido exclusivamente a drogodependientes en activo. VIH+/SIDA. Desayuno, comedor y comida para llevar.',
      en: 'Exclusively for active drug users. HIV+/AIDS. Breakfast, dining hall, and takeaway food.',
      it: 'Rivolto esclusivamente a tossicodipendenti attivi. HIV+/AIDS. Colazione, mensa e cibo da asporto.',
      ar: 'موجه حصريًا لمتعاطي المخدرات النشطين. فيروس نقص المناعة البشرية / الإيدز. إفطار، قاعة طعام، وطعام سفري.',
      fr: 'Exclusivement pour les toxicomanes actifs. VIH+/SIDA. Petit-déjeuner, réfectoire et plats à emporter.'
    },
    address: '',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  {
    id: 'com-5',
    categoryId: 'comida',
    name: { es: 'Comité Antisida (MARITIM)', en: 'Anti-AIDS Committee (MARITIM)', it: 'Comitato Anti-AIDS (MARITIM)', ar: 'لجنة مكافحة الإيدز (ماريتيم)', fr: 'Comité Anti-SIDA (MARITIM)' },
    description: { 
      es: 'Centro de día que proporciona a sus usuarios (drogodependientes) desayuno y comida.',
      en: 'Day center providing users (drug users) with breakfast and lunch.',
      it: 'Centro diurno che fornisce ai suoi utenti (tossicodipendenti) colazione e pranzo.',
      ar: 'مركز نهاري يوفر للمستخدمين (متعاطي المخدرات) الإفطار والغداء.',
      fr: 'Centre de jour fournissant aux utilisateurs (toxicomanes) petit-déjeuner et déjeuner.'
    },
    address: '',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:30)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.05.24'
  },
  {
    id: 'com-6',
    categoryId: 'comida',
    name: { es: 'AL TAFAR (COMEDOR SOCIAL)', en: 'AL TAFAR (SOUP KITCHEN)', it: 'AL TAFAR (MENSA SOCIALE)', ar: 'الطفر (مطبخ خيري)', fr: 'AL TAFAR (SOUPE POPULAIRE)' },
    description: { 
      es: 'Domingos dan bolsa con alimentos.',
      en: 'On Sundays, they give a bag with food.',
      it: 'La domenica danno un sacchetto con del cibo.',
      ar: 'في أيام الأحد، يقدمون حقيبة طعام.',
      fr: 'Le dimanche, ils donnent un sac avec de la nourriture.'
    },
    address: 'Calle Alboraya, 2 (Viveros)',
    phone: '96 369 36 62',
    email: '',
    hours: 'L a S (13:00 a 14:30), D (bolsa)',
    coordinates: { lat: 39.4800, lng: -0.3699 },
  },
  {
    id: 'com-7',
    categoryId: 'comida',
    name: { es: 'AL TAFAR (Literato Azorín)', en: 'AL TAFAR (Literato Azorín)', it: 'AL TAFAR (Literato Azorín)', ar: 'الطفر (ليتراتو أزورين)', fr: 'AL TAFAR (Literato Azorín)' },
    description: { 
      es: 'Personas mayores o jubiladas. Admisión a través de Servicios Sociales.',
      en: 'Elderly or retired people. Admission through Social Services.',
      it: 'Persone anziane o pensionate. Ammissione tramite i Servizi Sociali.',
      ar: 'كبار السن أو المتقاعدون. القبول عن طريق الخدمات الاجتماعية.',
      fr: 'Personnes âgées ou retraitées. Admission via les Services Sociaux.'
    },
    address: 'Calle Literato Azorín, 15 (Ruzafa)',
    phone: '96 374 39 18',
    email: '',
    hours: 'L a S (12:30 a 13:30)',
    coordinates: { lat: 39.4612, lng: -0.3732 },
  },
  {
    id: 'com-8',
    categoryId: 'comida',
    name: { es: 'COMEDOR (Nuestra Señora Desamparados)', en: 'SOUP KITCHEN (Our Lady of the Forsaken)', it: 'MENSA (Nostra Signora degli Abbandonati)', ar: 'مطبخ (سيدتنا العذراء للمعونة)', fr: 'SOUPE (Notre Dame des Désemparés)' },
    description: { 
      es: 'Desayuno y comida.',
      en: 'Breakfast and lunch.',
      it: 'Colazione e pranzo.',
      ar: 'وجبة إفطار وغداء.',
      fr: 'Petit-déjeuner et déjeuner.'
    },
    address: 'Calle Padre Antón Martín, 36-bajo',
    phone: '96 172 79 95',
    email: '',
    hours: 'L a S (9:30 desayuno, 13:00 comida)',
    coordinates: { lat: 39.4300, lng: -0.3937 },
  },
  {
    id: 'com-9',
    categoryId: 'comida',
    name: { es: 'BANCO DE ACCIÓN SOLIDARIA', en: 'SOLIDARITY ACTION BANK', it: 'BANCO DI AZIONE SOLIDALE', ar: 'بنك العمل التضامني', fr: 'BANQUE D\'ACTION SOLIDAIRE' },
    description: { 
      es: 'Reparto de comida en zonas específicas.',
      en: 'Food distribution in specific areas.',
      it: 'Distribuzione di cibo in aree specifiche.',
      ar: 'توزيع الطعام في مناطق محددة.',
      fr: 'Distribution de nourriture dans des zones spécifiques.'
    },
    address: 'Calle Providencia 5 (Pza Benimaclet)',
    phone: '96 193 18 63 / 651 46 39 35',
    email: '',
    hours: 'L a V (13:30-14:00), S y D (11:00-12:00)',
    coordinates: { lat: 39.4849, lng: -0.3619 },
  },

  // --- DORMIR (ALBERGUES) ---
  {
    id: 'alb-1',
    categoryId: 'albergues',
    name: { es: 'CENTRE D\'NIT SAN ESTEBAN (Cáritas)', en: 'SAN ESTEBAN NIGHT CENTER (Cáritas)', it: 'CENTRO NOTTURNO SAN ESTEBAN (Cáritas)', ar: 'مركز سان إستيبان الليلي (كاريتاس)', fr: 'CENTRE DE NUIT SAN ESTEBAN (Cáritas)' },
    description: { 
      es: 'Dirigido a inmigrantes recién llegados sin problemas de adicción (alcoholismo incluido) ni enfermedad mental diagnosticada. Corta estancia, 20 plazas.',
      en: 'For newly arrived immigrants without addiction problems (including alcoholism) or diagnosed mental illness. Short stay, 20 beds.',
      it: 'Rivolto a immigrati appena arrivati senza problemi di dipendenza (incluso alcolismo) né malattia mentale diagnosticata. Breve soggiorno, 20 posti.',
      ar: 'موجه للمهاجرين الوافدين حديثًا بدون مشاكل إدمان (بما في ذلك إدمان الكحول) أو مرض عقلي مشخص. إقامة قصيرة، 20 مكانًا.',
      fr: 'Destiné aux immigrants nouvellement arrivés sans problèmes de dépendance (y compris l\'alcoolisme) ni maladie mentale diagnostiquée. Court séjour, 20 places.'
    },
    address: 'Carrer del Pou, s/n 46003, València',
    phone: '96 208 74 23',
    email: 'cai.pangea@valencia.es',
    hours: 'Sin horario fijo',
    coordinates: { lat: 39.4770, lng: -0.3765 },
    updated: '30.05.24'
  },
  {
    id: 'alb-2',
    categoryId: 'albergues',
    name: { es: 'SAN JUAN DE DIOS', en: 'SAN JUAN DE DIOS', it: 'SAN JUAN DE DIOS', ar: 'سان خوان دي ديوس', fr: 'SAN JUAN DE DIOS' },
    description: { 
      es: 'Sólo hombres. Centro de alta exigencia. Derivaciones por CAST.',
      en: 'Men only. High-demand center. Referrals by CAST.',
      it: 'Solo uomini. Centro ad alta esigenza. Invii tramite CAST.',
      ar: 'للرجال فقط. مركز عالي المتطلبات. إحالات عن طريق CAST.',
      fr: 'Hommes uniquement. Centre à haute exigence. Références par CAST.'
    },
    address: 'C/ Luz Casanova, 8',
    phone: '96 366 50 70',
    email: 'manuel.rodilla@sjd.es',
    hours: '',
    coordinates: { lat: 39.4856, lng: -0.3895 },
    updated: '30.05.24'
  },
  {
    id: 'alb-3',
    categoryId: 'albergues',
    name: { es: 'SANTA CRUZ DE TENERIFE (CAES)', en: 'SANTA CRUZ DE TENERIFE (CAES)', it: 'SANTA CRUZ DE TENERIFE (CAES)', ar: 'سانتا كروز دي تينيريفي (CAES)', fr: 'SANTA CRUZ DE TENERIFE (CAES)' },
    description: { 
      es: '15 plazas. Gestionado por Cruz Roja.',
      en: '15 beds. Managed by Red Cross.',
      it: '15 posti. Gestito dalla Croce Rossa.',
      ar: '15 مكانًا. تديره الصليب الأحمر.',
      fr: '15 places. Géré par la Croix-Rouge.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'alb-4',
    categoryId: 'albergues',
    name: { es: 'ALBERGUE PETXINA (AVC)', en: 'ALBERGUE PETXINA (AVC)', it: 'ALBERGUE PETXINA (AVC)', ar: 'نزل بيتكسينا (AVC)', fr: 'AUBERGE PETXINA (AVC)' },
    description: { 
      es: 'Asociación Valenciana de la Caridad. 75 plazas. Derivaciones por CAST.',
      en: 'Valencian Charity Association. 75 beds. Referrals by CAST.',
      it: 'Associazione Valenciana della Carità. 75 posti. Invii tramite CAST.',
      ar: 'جمعية بلنسية الخيرية. 75 مكانًا. إحالات عن طريق CAST.',
      fr: 'Association Valencienne de la Charité. 75 places. Références par CAST.'
    },
    address: 'Paseo de la Pechina, 9',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 39.4741, lng: -0.3888 },
    updated: '30.05.24'
  },
  {
    id: 'alb-5',
    categoryId: 'albergues',
    name: { es: 'ALBERGUE BENICALAP (AVC)', en: 'ALBERGUE BENICALAP (AVC)', it: 'ALBERGUE BENICALAP (AVC)', ar: 'نزل بينيكالاب (AVC)', fr: 'AUBERGE BENICALAP (AVC)' },
    description: { 
      es: 'Asociación Valenciana de la Caridad. 65 plazas. Derivaciones por CAST.',
      en: 'Valencian Charity Association. 65 beds. Referrals by CAST.',
      it: 'Associazione Valenciana della Carità. 65 posti. Invii tramite CAST.',
      ar: 'جمعية بلنسية الخيرية. 65 مكانًا. إحالات عن طريق CAST.',
      fr: 'Association Valencienne de la Charité. 65 places. Références par CAST.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '30.05.24'
  },
  {
    id: 'alb-6',
    categoryId: 'albergues',
    name: { es: 'OBRA MERCEDARIA DE VALENCIA', en: 'OBRA MERCEDARIA DE VALENCIA', it: 'OBRA MERCEDARIA DE VALENCIA', ar: 'OBRA MERCEDARIA DE VALENCIA', fr: 'OBRA MERCEDARIA DE VALENCIA' },
    description: { 
      es: 'Derivadas desde prisión o desde UCA. También centro baja exigencia a personas sin hogar. Gestionado por CAST.',
      en: 'Referred from prison or UCA (Addiction Units). Also low-threshold center for homeless people. Managed by CAST.',
      it: 'Invii da prigione o UCA (Unità Dipendenze). Anche centro a bassa soglia per persone senza fissa dimora. Gestito da CAST.',
      ar: 'محالون من السجن أو وحدات علاج الإدمان. أيضًا مركز منخفض المتطلبات للمشردين. تديره CAST.',
      fr: 'Référés de prison ou des UCA (Unités de Dépendance). Également centre à bas seuil pour sans-abri. Géré par CAST.'
    },
    address: 'Calle Turia, 51 bajo',
    phone: '96 391 17 26 / 96 392 14 30',
    email: '',
    hours: '',
    coordinates: { lat: 39.4772, lng: -0.3861 },
    updated: '22.11.21'
  },
  {
    id: 'alb-7',
    categoryId: 'albergues',
    name: { es: 'CASAL DE LA PAU (EL CARME)', en: 'CASAL DE LA PAU (EL CARME)', it: 'CASAL DE LA PAU (EL CARME)', ar: 'كاسال دي لا باو (إل كارمي)', fr: 'CASAL DE LA PAU (EL CARME)' },
    description: { 
      es: 'Alojamiento por enfermedad en fase terminal de personas que están ex-reclusas. 10 plazas (8H/2M).',
      en: 'Housing for terminally ill ex-inmates. 10 beds (8M/2F).',
      it: 'Alloggio per ex detenuti con malattia terminale. 10 posti (8U/2D).',
      ar: 'سكن للسجناء السابقين المصابين بأمراض في مراحلها النهائية. 10 أماكن (8 رجال / 2 نساء).',
      fr: 'Logement pour ex-détenus en phase terminale. 10 places (8H/2F).'
    },
    address: 'C/ En Llopis 8',
    phone: '96 391 54 29',
    email: 'direccarme@fsyc.org',
    hours: '',
    coordinates: { lat: 39.4789, lng: -0.3794 },
    updated: '11.01.21'
  },
  {
    id: 'alb-8',
    categoryId: 'albergues',
    name: { es: 'EL MUSSOL (Fundación Salud y Comunidad)', en: 'EL MUSSOL (Health & Community Foundation)', it: 'EL MUSSOL (Fondazione Salute e Comunità)', ar: 'الموسول (مؤسسة الصحة والمجتمع)', fr: 'EL MUSSOL (Fondation Santé et Communauté)' },
    description: { 
      es: '15 plazas.',
      en: '15 beds.',
      it: '15 posti.',
      ar: '15 مكانًا.',
      fr: '15 places.'
    },
    address: '',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'alb-9',
    categoryId: 'albergues',
    name: { es: 'CONVENTO Y PISOS TORRENT (Fundación Amigó)', en: 'CONVENT & FLATS TORRENT (Amigó Foundation)', it: 'CONVENTO E APPARTAMENTI TORRENT (Fondazione Amigó)', ar: 'دير وشقق تورينت (مؤسسة أميغو)', fr: 'COUVENT ET APPARTEMENTS TORRENT (Fondation Amigó)' },
    description: { 
      es: '24 y 22 plazas.',
      en: '24 and 22 beds.',
      it: '24 e 22 posti.',
      ar: '24 و 22 مكانًا.',
      fr: '24 et 22 places.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'alb-10',
    categoryId: 'albergues',
    name: { es: 'CASA PETER MALU', en: 'CASA PETER MALU', it: 'CASA PETER MALU', ar: 'كاسا بيتر مالو', fr: 'CASA PETER MALU' },
    description: { 
      es: 'Casa de Acogida para Trabajadores Inmigrantes (subsaharianos). Derivaciones por CAST.',
      en: 'Host Home for Immigrant Workers (Sub-Saharan). Referrals by CAST.',
      it: 'Casa di accoglienza per lavoratori immigrati (subsahariani). Invii tramite CAST.',
      ar: 'بيت استقبال للعمال المهاجرين (من جنوب الصحراء). إحالات عن طريق CAST.',
      fr: 'Maison d\'accueil pour travailleurs immigrés (subsahariens). Références par CAST.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'alb-11',
    categoryId: 'albergues',
    name: { es: 'CASA DOROTHY DAY', en: 'DOROTHY DAY HOUSE', it: 'CASA DOROTHY DAY', ar: 'بيت دوروثي داي', fr: 'MAISON DOROTHY DAY' },
    description: { 
      es: 'Casa de Acogida para Mujeres Inmigrantes. Derivaciones por CAST.',
      en: 'Host Home for Immigrant Women. Referrals by CAST.',
      it: 'Casa di accoglienza per donne immigrate. Invii tramite CAST.',
      ar: 'بيت استقبال للنساء المهاجرات. إحالات عن طريق CAST.',
      fr: 'Maison d\'accueil pour femmes immigrées. Références par CAST.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'alb-12',
    categoryId: 'albergues',
    name: { es: 'RESIDENCIA "JUANA MARÍA"', en: '"JUANA MARÍA" RESIDENCE', it: 'RESIDENZA "JUANA MARÍA"', ar: 'إقامة "خوانا ماريا"', fr: 'RÉSIDENCE "JUANA MARÍA"' },
    description: { 
      es: 'Casa de Acogida para Mujeres. Derivaciones por CAST.',
      en: 'Host Home for Women. Referrals by CAST.',
      it: 'Casa di accoglienza per donne. Invii tramite CAST.',
      ar: 'بيت استقبال للنساء. إحالات عن طريق CAST.',
      fr: 'Maison d\'accueil pour femmes. Références par CAST.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'alb-13',
    categoryId: 'albergues',
    name: { es: 'CEPAIM', en: 'CEPAIM', it: 'CEPAIM', ar: 'CEPAIM', fr: 'CEPAIM' },
    description: { 
      es: 'Ayudas de alojamiento temporal (máximo 2 meses).',
      en: 'Temporary housing aid (max 2 months).',
      it: 'Aiuti per alloggio temporaneo (max 2 mesi).',
      ar: 'مساعدات سكن مؤقتة (بحد أقصى شهرين).',
      fr: 'Aides au logement temporaire (max 2 mois).'
    },
    address: '',
    phone: '963 92 53 02',
    email: 'gorettiruiz@cepaim.org',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '05.12.22'
  },

  // --- ROPA ---
  {
    id: 'ropa-1',
    categoryId: 'ropa',
    name: { es: 'CÁRITAS', en: 'CÁRITAS', it: 'CÁRITAS', ar: 'كاريتاس', fr: 'CÁRITAS' },
    description: { 
      es: 'Al contactarlos te derivan a una parroquia a la que poder acudir, según la zona, o a su sede.',
      en: 'When contacted, they refer you to a parish in your area or to their headquarters.',
      it: 'Contattandoli, ti indirizzano a una parrocchia della tua zona o alla loro sede.',
      ar: 'عند الاتصال بهم، يحيلونك إلى أبرشية في منطقتك أو إلى مقرهم.',
      fr: 'Lorsqu\'on les contacte, ils vous orientent vers une paroisse de votre quartier ou vers leur siège.'
    },
    address: 'Sede: (Torres de Serranos), Centro Mambre: Alfabahuir 57',
    phone: 'Sede: 96 391 92 05 / Mambre: 96 366 64 92',
    email: 'caritasvalencia@caritas.es',
    hours: 'L-V (9-14h y 16-19:30h)',
    coordinates: { lat: 39.4792, lng: -0.3761 },
    updated: '30.05.24'
  },
  {
    id: 'ropa-2',
    categoryId: 'ropa',
    name: { es: 'MISION URBANA', en: 'MISION URBANA', it: 'MISION URBANA', ar: 'MISION URBANA', fr: 'MISION URBANA' },
    description: { 
      es: 'Ropero y mantas (condicionadas al servicio de higiene personal). Funciona con cita previa.',
      en: 'Clothing and blankets (conditioned on personal hygiene service). By appointment.',
      it: 'Vestiario e coperte (condizionato al servizio di igiene personale). Su appuntamento.',
      ar: 'ملابس وبطانيات (مشروطة بخدمة النظافة الشخصية). تعمل بموعد مسبق.',
      fr: 'Vêtements et couvertures (conditionnés au service d\'hygiène personnelle). Sur rendez-vous.'
    },
    address: '',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'L, M y V (9:30-12:30), M (16:30-18:30)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.05.24'
  },
  {
    id: 'ropa-3',
    categoryId: 'ropa',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Ropero. Dirigido exclusivamente a drogodependientes en activo VIH+/SIDA.',
      en: 'Clothing. Exclusively for active drug users HIV+/AIDS.',
      it: 'Vestiario. Rivolto esclusivamente a tossicodipendenti attivi HIV+/AIDS.',
      ar: 'ملابس. موجه حصريًا لمتعاطي المخدرات النشطين المصابين بفيروس نقص المناعة البشرية / الإيدز.',
      fr: 'Vêtements. Exclusivement pour les toxicomanes actifs VIH+/SIDA.'
    },
    address: '',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  {
    id: 'ropa-4',
    categoryId: 'ropa',
    name: { es: 'MARITIM (Comité Antisida)', en: 'MARITIM (Anti-AIDS Committee)', it: 'MARITIM (Comitato Anti-AIDS)', ar: 'ماريتيم (لجنة مكافحة الإيدز)', fr: 'MARITIM (Comité Anti-SIDA)' },
    description: { 
      es: 'Ropero. Centro de día que proporciona a sus usuarios alimentación, ducha y ropero. Dirigido exclusivamente a drogodependientes en activo.',
      en: 'Clothing. Day center providing users with food, shower, and clothing. Exclusively for active drug users.',
      it: 'Vestiario. Centro diurno che fornisce ai suoi utenti cibo, doccia e guardaroba. Rivolto esclusivamente a tossicodipendenti attivi.',
      ar: 'ملابس. مركز نهاري يوفر للمستخدمين الطعام، حمام، وملابس. موجه حصريًا لمتعاطي المخدرات النشطين.',
      fr: 'Vêtements. Centre de jour fournissant aux utilisateurs nourriture, douche et vêtements. Exclusivement pour les toxicomanes actifs.'
    },
    address: '',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:30)',
    coordinates: { lat: 0, lng: 0 },
    updated: '30.05.24'
  },
  {
    id: 'ropa-5',
    categoryId: 'ropa',
    name: { es: 'OTROS', en: 'OTHERS', it: 'ALTRI', ar: 'آخرون', fr: 'AUTRES' },
    description: { 
      es: 'Otras entidades también proporcionan ropa y otros suministros, pero solo a usuarios que sean parte de algún programa: CEPAIM; Casal de la Pau; Natania (Rehoboth); Casa Caridad.',
      en: 'Other entities also provide clothing and supplies, but only to users who are part of a program: CEPAIM; Casal de la Pau; Natania (Rehoboth); Casa Caridad.',
      it: 'Altre entità forniscono anche vestiti e altre forniture, ma solo agli utenti che fanno parte di un programma: CEPAIM; Casal de la Pau; Natania (Rehoboth); Casa Caridad.',
      ar: 'كيانات أخرى توفر أيضًا ملابس وإمدادات أخرى، ولكن فقط للمستخدمين الذين هم جزء من برنامج: CEPAIM؛ Casal de la Pau؛ Natania (Rehoboth)؛ Casa Caridad.',
      fr: 'D\'autres entités fournissent également des vêtements et des fournitures, mais uniquement aux utilisateurs faisant partie d\'un programme : CEPAIM ; Casal de la Pau ; Natania (Rehoboth) ; Casa Caridad.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '24.05.21'
  },

  // --- CLASES ---
  {
    id: 'clases-1',
    categoryId: 'clases',
    name: { es: 'Sankofa espaintercultural', en: 'Sankofa espaintercultural', it: 'Sankofa espaintercultural', ar: 'سانكوفا الإسبانية الثقافية', fr: 'Sankofa espaintercultural' },
    description: { 
      es: 'Clases de español.',
      en: 'Spanish classes.',
      it: 'Classi di spagnolo.',
      ar: 'دروس اللغة الإسبانية.',
      fr: 'Cours d\'espagnol.'
    },
    address: 'C/ Beata Inés, 10',
    phone: '641 997 713',
    email: 'supervivientesaquarius@gmail.com',
    hours: 'M y Mx 16:00, V 10:15',
    coordinates: { lat: 39.4777, lng: -0.3789 },
    updated: '12.01.21'
  },
  {
    id: 'clases-2',
    categoryId: 'clases',
    name: { es: 'ACCEM', en: 'ACCEM', it: 'ACCEM', ar: 'ACCEM', fr: 'ACCEM' },
    description: { 
      es: 'Alfabetización, Español e Inglés.',
      en: 'Literacy, Spanish, and English.',
      it: 'Alfabetizzazione, spagnolo e inglese.',
      ar: 'محو الأمية، الإسبانية، والإنجليزية.',
      fr: 'Alphabétisation, espagnol et anglais.'
    },
    address: '',
    phone: '96 367 35 54',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '30.05.24'
  },
  {
    id: 'clases-3',
    categoryId: 'clases',
    name: { es: 'FUNDACIÓN MAÍN', en: 'MAÍN FOUNDATION', it: 'FONDAZIONE MAÍN', ar: 'مؤسسة ماين', fr: 'FONDATION MAÍN' },
    description: { 
      es: 'Clases de español.',
      en: 'Spanish classes.',
      it: 'Classi di spagnolo.',
      ar: 'دروس اللغة الإسبانية.',
      fr: 'Cours d\'espagnol.'
    },
    address: 'C/ de l\'Arquitecte Tolsá, 9',
    phone: '96 366 36 16',
    email: '',
    hours: '',
    coordinates: { lat: 39.4938, lng: -0.3845 },
  },
  {
    id: 'clases-4',
    categoryId: 'clases',
    name: { es: 'JARIT', en: 'JARIT', it: 'JARIT', ar: 'جاريت', fr: 'JARIT' },
    description: { 
      es: 'Clases de castellano, valenciano, alfabetización, informática, servicio jurídico, inserción socio-laboral.',
      en: 'Spanish, Valencian, literacy, IT classes, legal service, socio-labor insertion.',
      it: 'Classi di spagnolo, valenciano, alfabetizzazione, informatica, servizio legale, inserimento socio-lavorativo.',
      ar: 'دروس اللغة الإسبانية، الفالنسية، محو الأمية، الحاسوب، خدمة قانونية، إدماج اجتماعي ومهني.',
      fr: 'Cours d\'espagnol, valencien, alphabétisation, informatique, service juridique, insertion socio-professionnelle.'
    },
    address: 'C/ Buenos Aires, 10',
    phone: '96 380 50 76',
    email: '',
    hours: '',
    coordinates: { lat: 39.4614, lng: -0.3697 },
    updated: '02.04.21'
  },
  {
    id: 'clases-5',
    categoryId: 'clases',
    name: { es: 'ÍTACA', en: 'ÍTACA', it: 'ÍTACA', ar: 'إيثاكا', fr: 'ÍTACA' },
    description: { 
      es: 'Cursos de español mañanas y tardes, distintos niveles.',
      en: 'Spanish courses morning and afternoon, different levels.',
      it: 'Corsi di spagnolo mattina e pomeriggio, diversi livelli.',
      ar: 'دورات اللغة الإسبانية صباحًا ومساءً، مستويات مختلفة.',
      fr: 'Cours d\'espagnol matin et après-midi, différents niveaux.'
    },
    address: 'C/ Conde Montornés, 20',
    phone: '96 351 59 93',
    email: '',
    hours: '',
    coordinates: { lat: 39.4729, lng: -0.3725 },
  },
  {
    id: 'clases-6',
    categoryId: 'clases',
    name: { es: 'VALENCIA ACOGE', en: 'VALENCIA ACOGE', it: 'VALENCIA ACOGE', ar: 'فالنسيا أكوخي', fr: 'VALENCIA ACOGE' },
    description: { 
      es: 'Clases de idiomas a consultar según la demanda.',
      en: 'Language classes available upon demand.',
      it: 'Classi di lingua da consultare su richiesta.',
      ar: 'دروس لغات للاستفسار حسب الطلب.',
      fr: 'Cours de langues à consulter selon la demande.'
    },
    address: 'C/ San Juan Bosco, 10',
    phone: '96 366 01 68',
    email: '',
    hours: '',
    coordinates: { lat: 39.4947, lng: -0.3789 },
    updated: '24.05.21'
  },
  {
    id: 'clases-7',
    categoryId: 'clases',
    name: { es: 'CENTRO CULTURAL ISLÁMICO', en: 'ISLAMIC CULTURAL CENTER', it: 'CENTRO CULTURALE ISLAMICO', ar: 'المركز الثقافي الإسلامي', fr: 'CENTRE CULTUREL ISLAMIQUE' },
    description: { 
      es: 'Clases de idiomas.',
      en: 'Language classes.',
      it: 'Classi di lingua.',
      ar: 'دروس لغات.',
      fr: 'Cours de langues.'
    },
    address: 'C/ Arquitecto Rodríguez 21',
    phone: '96 360 33 30',
    email: '',
    hours: '',
    coordinates: { lat: 39.4912, lng: -0.3804 },
  },
  {
    id: 'clases-8',
    categoryId: 'clases',
    name: { es: 'Comisión Española Ayuda al Refugiado', en: 'Spanish Commission for Refugee Aid', it: 'Commissione Spagnola per l\'Aiuto ai Rifugiati', ar: 'اللجنة الإسبانية لمساعدة اللاجئين', fr: 'Commission Espagnole d\'Aide aux Réfugiés' },
    description: { 
      es: 'Clases de idiomas a consultar según la demanda.',
      en: 'Language classes available upon demand.',
      it: 'Classi di lingua da consultare su richiesta.',
      ar: 'دروس لغات للاستفسار حسب الطلب.',
      fr: 'Cours de langues à consulter selon la demande.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '24.05.21'
  },

  // --- SALUD ---
  {
    id: 'salud-1',
    categoryId: 'salud',
    name: { es: 'MÉDICOS DEL MUNDO', en: 'DOCTORS OF THE WORLD', it: 'MEDICI DEL MONDO', ar: 'أطباء العالم', fr: 'MÉDECINS DU MONDE' },
    description: { 
      es: 'Atención sanitaria básica. Personal de psicología y psiquiatría. SIP (Derivación para ambulatorio). Todos los servicios se gestionan por turnos.',
      en: 'Basic health care. Psychology and psychiatry staff. SIP (Referral to outpatient clinic). All services managed by turns.',
      it: 'Assistenza sanitaria di base. Personale di psicologia e psichiatria. SIP (Invio ambulatoriale). Tutti i servizi gestiti a turni.',
      ar: 'رعاية صحية أساسية. طاقم علم نفس وطب نفسي. بطاقة صحية (إحالة للعيادات الخارجية). جميع الخدمات تُدار بنظام الأدوار.',
      fr: 'Soins de santé de base. Personnel de psychologie et de psychiatrie. SIP (Référence pour consultation externe). Tous les services gérés par tours.'
    },
    address: 'C/ del doctor Monserrat',
    phone: '96 391 97 23',
    email: 'valencia@medicosdelmundo.org',
    hours: 'L-J (turnos 12:30-17:30 H/M), V (11h-13h solo mujeres)',
    coordinates: { lat: 39.4665, lng: -0.3887 },
    updated: '10.05.24'
  },
  {
    id: 'salud-2',
    categoryId: 'salud',
    name: { es: 'MARITIM (Comité Antisida)', en: 'MARITIM (Anti-AIDS Committee)', it: 'MARITIM (Comitato Anti-AIDS)', ar: 'ماريتيم (لجنة مكافحة الإيدز)', fr: 'MARITIM (Comité Anti-SIDA)' },
    description: { 
      es: 'Atención psico-sanitaria. Diagnóstico de VIH, Hepatitis C y Sífilis. Programas de tratamiento de metadona. Actividades ocupacionales.',
      en: 'Psycho-health care. HIV, Hepatitis C, and Syphilis diagnosis. Methadone treatment programs. Occupational activities.',
      it: 'Assistenza psico-sanitaria. Diagnosi di HIV, Epatite C e Sifilide. Programmi di trattamento con metadone. Attività occupazionali.',
      ar: 'رعاية نفسية وصحية. تشخيص فيروس نقص المناعة البشرية، التهاب الكبد C، والزهري. برامج علاج بالميثادون. أنشطة مهنية.',
      fr: 'Soins psycho-sanitaires. Diagnostic VIH, Hépatite C et Syphilis. Programmes de traitement à la méthadone. Activités occupationnelles.'
    },
    address: '',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:30)',
    coordinates: { lat: 0, lng: 0 },
    updated: '30.05.24'
  },
  {
    id: 'salud-3',
    categoryId: 'salud',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Dirigido a drogodependientes en activo. VIH+/SIDA. Atención médica, de trabajo social y psicológica.',
      en: 'For active drug users. HIV+/AIDS. Medical, social work, and psychological care.',
      it: 'Rivolto a tossicodipendenti attivi. HIV+/AIDS. Assistenza medica, sociale e psicologica.',
      ar: 'موجه لمتعاطي المخدرات النشطين. فيروس نقص المناعة البشرية / الإيدز. رعاية طبية، اجتماعية، ونفسية.',
      fr: 'Destiné aux toxicomanes actifs. VIH+/SIDA. Prise en charge médicale, sociale et psychologique.'
    },
    address: 'C/ Menéndez Pidal',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 39.4819, lng: -0.3854 },
    updated: '20.01.21'
  },
  {
    id: 'salud-4',
    categoryId: 'salud',
    name: { es: 'URGENCIAS', en: 'EMERGENCIES', it: 'EMERGENZE', ar: 'الطوارئ', fr: 'URGENCES' },
    description: { 
      es: 'Teléfonos de urgencias generales. 112 (Emergencias), 016 (Violencia de género), 061 (Emergencia sanitaria)',
      en: 'General emergency numbers. 112 (Emergencies), 016 (Gender Violence), 061 (Health Emergency)',
      it: 'Numeri di emergenza generali. 112 (Emergenze), 016 (Violenza di genere), 061 (Emergenza sanitaria)',
      ar: 'أرقام الطوارئ العامة. 112 (الطوارئ)، 016 (العنف الجنسي)، 061 (الطوارئ الصحية)',
      fr: 'Numéros d\'urgence généraux. 112 (Urgences), 016 (Violence de genre), 061 (Urgence sanitaire)'
    },
    address: '',
    phone: '112 / 016 / 061',
    email: '',
    hours: '24h',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'salud-5',
    categoryId: 'salud',
    name: { es: 'UCAs (Unitats de Conductes Adictives)', en: 'UCAs (Addictive Behaviors Units)', it: 'UCAs (Unità Comportamenti Additivi)', ar: 'UCAs (وحدات السلوكيات الإدمانية)', fr: 'UCAs (Unités de Comportements Addictifs)' },
    description: { 
      es: 'Por derivación a través del trabajador social del hospital.',
      en: 'By referral from the hospital social worker.',
      it: 'Tramite invio dell\'assistente sociale dell\'ospedale.',
      ar: 'عن طريق الإحالة من الأخصائي الاجتماعي في المستشفى.',
      fr: 'Sur orientation de l\'assistant social de l\'hôpital.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'salud-6',
    categoryId: 'salud',
    name: { es: 'Asociación AVANT', en: 'AVANT Association', it: 'Associazione AVANT', ar: 'جمعية أفانت', fr: 'Association AVANT' },
    description: { 
      es: 'Grupos de terapias (derivados por UCAs) a personas con conductas adictivas. Orientación telefónica a familias.',
      en: 'Therapy groups (referred by UCAs) for people with addictive behaviors. Phone guidance for families.',
      it: 'Gruppi di terapia (inviati da UCAs) per persone con comportamenti di dipendenza. Orientamento telefonico per famiglie.',
      ar: 'مجموعات علاجية (محالة من UCAs) للأشخاص ذوي السلوكيات الإدمانية. توجيه هاتفي للعائلات.',
      fr: 'Groupes de thérapie (référés par UCAs) pour personnes ayant des comportements addictifs. Orientation téléphonique pour les familles.'
    },
    address: '',
    phone: '96 346 29 67',
    email: 'avant@asocavant.org',
    hours: 'L a V (19:00 a 20:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  {
    id: 'salud-7',
    categoryId: 'salud',
    name: { es: 'FUNDACIÓN ODONTOLOGÍA SOLIDARIA', en: 'SOLIDARITY DENTISTRY FOUNDATION', it: 'FONDAZIONE ODONTOIATRIA SOLIDALE', ar: 'مؤسسة طب الأسنان التضامني', fr: 'FONDATION DENTISTERIE SOLIDAIRE' },
    description: { 
      es: 'Higiene bucal, obturaciones, endodoncias, prótesis. No urgencias, no estética. Derivación mediante S.S. Se paga cantidad simbólica 15€/visita.',
      en: 'Dental hygiene, fillings, root canals, dentures. No emergencies, no aesthetics. Referral by Social Security. Symbolic fee of 15€/visit.',
      it: 'Igiene orale, otturazioni, endodonzia, protesi. Non urgenze, non estetica. Invio tramite S.S. Si paga una quota simbolica di 15€/visita.',
      ar: 'نظافة الفم، حشوات، علاج جذور، أطقم أسنان. لا طوارئ، لا تجميل. إحالة عن طريق الضمان الاجتماعي. يتم دفع مبلغ رمزي 15 يورو / زيارة.',
      fr: 'Hygiène bucco-dentaire, plombages, endodontie, prothèses. Pas d\'urgences, pas d\'esthétique. Référence via la Sécurité Sociale. Paiement symbolique de 15€/visite.'
    },
    address: 'Calle Micer Mascó 28',
    phone: '96 315 46 09',
    email: 'odtvalencia@odsolidaria.org',
    hours: '',
    coordinates: { lat: 39.4781, lng: -0.3639 },
    updated: '20.03.21'
  },
  {
    id: 'salud-8',
    categoryId: 'salud',
    name: { es: 'Clínica Universitaria Odontológica', en: 'University Dental Clinic', it: 'Clinica Odontoiatrica Universitaria', ar: 'عيادة طب الأسنان الجامعية', fr: 'Clinique Dentaire Universitaire' },
    description: { 
      es: 'Por derivación del CAI, el tratamiento lo cubre la seguridad social.',
      en: 'By referral from CAI, treatment is covered by social security.',
      it: 'Su invio del CAI, il trattamento è coperto dalla sicurezza sociale.',
      ar: 'عن طريق الإحالة من CAI، العلاج يغطيه الضمان الاجتماعي.',
      fr: 'Sur orientation du CAI, le traitement est couvert par la sécurité sociale.'
    },
    address: 'C/ Altimir',
    phone: '96 347 32 52',
    email: 'clinicaodontologica.valencia@universidadeuropea.es',
    hours: 'L-V (8:00-22:00), S (8:00-15:00)',
    coordinates: { lat: 39.4724, lng: -0.3619 },
  },

  // --- MUJER ---
  {
    id: 'mujer-1',
    categoryId: 'mujer',
    name: { es: 'VILLA TERESITA', en: 'VILLA TERESITA', it: 'VILLA TERESITA', ar: 'فيلا تيريسيتا', fr: 'VILLA TERESITA' },
    description: { 
      es: 'Específico para mujeres y familias. Especialistas en violencia de género y prostitución.',
      en: 'Specific for women and families. Specialists in gender-based violence and prostitution.',
      it: 'Specifico per donne e famiglie. Specialisti in violenza di genere e prostituzione.',
      ar: 'خاص بالنساء والعائلات. متخصصون في العنف الجنسي والبغاء.',
      fr: 'Spécifique pour les femmes et les familles. Spécialistes de la violence de genre et de la prostitution.'
    },
    address: '',
    phone: '',
    email: '',
    hours: 'L-J (merienda)',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'mujer-2',
    categoryId: 'mujer',
    name: { es: 'CENTRO 24H', en: '24H CENTER', it: 'CENTRO 24H', ar: 'مركز 24 ساعة', fr: 'CENTRE 24H' },
    description: { 
      es: 'Atención a mujeres víctimas de malos tratos físicos y/o psíquicos, agresiones y abusos sexuales. Atención integral (social, psicológica y jurídica).',
      en: 'Care for women victims of physical and/or psychological abuse, assault, and sexual abuse. Comprehensive care (social, psychological, and legal).',
      it: 'Assistenza a donne vittime di maltrattamenti fisici e/o psicologici, aggressioni e abusi sessuali. Assistenza completa (sociale, psicologica e legale).',
      ar: 'رعاية النساء ضحايا سوء المعاملة الجسدية و / أو النفسية، والاعتداءات والانتهاكات الجنسية. رعاية شاملة (اجتماعية، نفسية، وقانونية).',
      fr: 'Prise en charge des femmes victimes de violences physiques et/ou psychologiques, d\'agressions et d\'abus sexuels. Prise en charge globale (sociale, psychologique et juridique).'
    },
    address: 'C/ Altimir',
    phone: '900 58 08 88',
    email: '',
    hours: '24h/365 (psicóloga y trabajadora social)',
    coordinates: { lat: 39.4735, lng: -0.3745 },
  },
  {
    id: 'mujer-3',
    categoryId: 'mujer',
    name: { es: 'RELIGIOSAS DE MARÍA INMACULADA', en: 'RELIGIOUS OF MARY IMMACULATE', it: 'RELIGIOSE DI MARIA IMMACOLATA', ar: 'راهبات مريم الطاهرة', fr: 'RELIGIEUSES DE MARIE IMMACULÉE' },
    description: { 
      es: 'Inserción en servicio doméstico de mujeres inmigrantes en edad laboral.',
      en: 'Job placement in domestic service for immigrant women of working age.',
      it: 'Inserimento nel servizio domestico di donne immigrate in età lavorativa.',
      ar: 'إدماج النساء المهاجرات في سن العمل في الخدمة المنزلية.',
      fr: 'Insertion dans le service domestique des femmes immigrées en âge de travailler.'
    },
    address: 'Trinquete de Caballeros 10',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 39.4751, lng: -0.3731 },
  },
  {
    id: 'mujer-4',
    categoryId: 'mujer',
    name: { es: 'AVANT', en: 'AVANT', it: 'AVANT', ar: 'أفانت', fr: 'AVANT' },
    description: { 
      es: 'Atención a mujeres víctimas de violencia de género y conductas adictivas. Orientación psico-educativa y social.',
      en: 'Care for women victims of gender-based violence and addictive behaviors. Psycho-educational and social guidance.',
      it: 'Assistenza a donne vittime di violenza di genere e comportamenti di dipendenza. Orientamento psico-educativo e sociale.',
      ar: 'رعاية النساء ضحايا العنف الجنسي والسلوكيات الإدمانية. توجيه نفسي تربوي واجتماعي.',
      fr: 'Prise en charge des femmes victimes de violence de genre et de comportements addictifs. Orientation psycho-éducative et sociale.'
    },
    address: '',
    phone: '96 346 29 67',
    email: 'avant@asocavant.org',
    hours: 'L a V (19:00 a 20:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  {
    id: 'mujer-5',
    categoryId: 'mujer',
    name: { es: 'MÉDICOS DEL MUNDO (Solo Mujeres)', en: 'DOCTORS OF THE WORLD (Women Only)', it: 'MEDICI DEL MONDO (Solo Donne)', ar: 'أطباء العالم (للنساء فقط)', fr: 'MÉDECINS DU MONDE (Femmes Uniquement)' },
    description: { 
      es: 'Viernes exclusivo mujeres, sin necesidad de cita previa. Comida, duchas, tramitación del SIP, acompañamiento, atención sanitaria básica, psicología y psiquiatría.',
      en: 'Friday exclusively for women, no appointment needed. Food, showers, SIP card processing, support, basic health care, psychology, and psychiatry.',
      it: 'Venerdì esclusivamente per donne, senza appuntamento. Cibo, docce, elaborazione della tessera SIP, supporto, assistenza sanitaria di base, psicologia e psichiatria.',
      ar: 'يوم الجمعة مخصص للنساء حصريًا، لا حاجة لموعد. طعام، حمامات، معالجة بطاقة SIP، دعم، رعاية صحية أساسية، علم نفس، وطب نفسي.',
      fr: 'Vendredi exclusivement réservé aux femmes, sans rendez-vous. Nourriture, douches, traitement de la carte SIP, soutien, soins de santé de base, psychologie et psychiatrie.'
    },
    address: '',
    phone: '96 391 97 23',
    email: '',
    hours: 'V de 11h a 13h (solo mujeres)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.05.24'
  },
  {
    id: 'mujer-6',
    categoryId: 'mujer',
    name: { es: 'ACCEM (Solo Mujeres)', en: 'ACCEM (Women Only)', it: 'ACCEM (Solo Donne)', ar: 'ACCEM (للنساء فقط)', fr: 'ACCEM (Femmes Uniquement)' },
    description: { 
      es: 'Miércoles exclusivo para mujeres. Lavadoras, duchas, peluquería. Funciona con cita previa (turnos a las 9am).',
      en: 'Wednesday exclusively for women. Washing machines, showers, hairdressing. By appointment (slots at 9am).',
      it: 'Mercoledì esclusivamente per donne. Lavatrici, docce, parrucchiere. Su appuntamento (turni alle 9).',
      ar: 'يوم الأربعاء مخصص للنساء حصريًا. غسالات، حمامات، حلاقة. تعمل بموعد مسبق (المواعيد الساعة 9 صباحًا).',
      fr: 'Mercredi exclusivement réservé aux femmes. Machines à laver, douches, coiffure. Sur rendez-vous (créneaux à 9h).'
    },
    address: 'C/ Mestre Fenollar',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'vsimonm@accem.es',
    hours: 'Miércoles (9:00-13:00)',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '30.05.24'
  },
  {
    id: 'mujer-7',
    categoryId: 'mujer',
    name: { es: 'OTROS (Mujer)', en: 'OTHERS (Women)', it: 'ALTRI (Donne)', ar: 'أخرى (للنساء)', fr: 'AUTRES (Femmes)' },
    description: { 
      es: 'Otras entidades: Jere-Jere, Proyecto Vivir, Alanna, Por ti mujer, Malva, CAVAS, Xarxa (mujeres con diversidad cultural), CEPAIM (mujeres migrantes).',
      en: 'Other entities: Jere-Jere, Proyecto Vivir, Alanna, Por ti mujer, Malva, CAVAS, Xarxa (women with cultural diversity), CEPAIM (migrant women).',
      it: 'Altre entità: Jere-Jere, Proyecto Vivir, Alanna, Por ti mujer, Malva, CAVAS, Xarxa (donne con diversità culturale), CEPAIM (donne migranti).',
      ar: 'كيانات أخرى: Jere-Jere, Proyecto Vivir, Alanna, Por ti mujer, Malva, CAVAS, Xarxa (نساء من خلفيات ثقافية متنوعة), CEPAIM (نساء مهاجرات).',
      fr: 'Autres entités : Jere-Jere, Proyecto Vivir, Alanna, Por ti mujer, Malva, CAVAS, Xarxa (femmes issues de la diversité culturelle), CEPAIM (femmes migrantes).'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
  },

  // --- EMPLEO (SOCIOLABORAL) ---
  {
    id: 'emp-1',
    categoryId: 'empleo',
    name: { es: 'CÁRITAS (Empleo)', en: 'CÁRITAS (Employment)', it: 'CÁRITAS (Lavoro)', ar: 'كاريتاس (التوظيف)', fr: 'CÁRITAS (Emploi)' },
    description: { 
      es: 'Para PSH en situación de regularidad y con interés en comenzar un proceso de búsqueda de empleo. Podemos derivar desde Bokatas.',
      en: 'For homeless people with legal status interested in starting a job search. Can be referred from Bokatas.',
      it: 'Per PSH in situazione regolare e interessati a iniziare un processo di ricerca di lavoro. Possiamo inviare da Bokatas.',
      ar: 'للمشردين ذوي الوضع القانوني المهتمين ببدء عملية البحث عن عمل. يمكن الإحالة من بوكاتاس.',
      fr: 'Pour PSH en situation régulière et intéressés à démarrer un processus de recherche d\'emploi. Peut être référé depuis Bokatas.'
    },
    address: '',
    phone: '96 315 38 10 / 637 274 201',
    email: 'empleo.valencia@hogaresi.org',
    hours: 'Llamar para concretar cita',
    coordinates: { lat: 0, lng: 0 },
    updated: '07.11.22'
  },
  {
    id: 'emp-2',
    categoryId: 'empleo',
    name: { es: 'CÁRITAS (Talleres)', en: 'CÁRITAS (Workshops)', it: 'CÁRITAS (Laboratori)', ar: 'كاريتاس (ورش عمل)', fr: 'CÁRITAS (Ateliers)' },
    description: { 
      es: 'Talleres ocupacionales. Consultar.',
      en: 'Occupational workshops. Inquire.',
      it: 'Laboratori occupazionali. Informarsi.',
      ar: 'ورش عمل مهنية. استفسر.',
      fr: 'Ateliers occupationnels. Se renseigner.'
    },
    address: 'Sede: (Torres Serranos), Mambre: Alfabahuir 57',
    phone: 'Sede: 96 391 92 05 / Mambre: 96 366 64 92',
    email: 'caritasvalencia@caritas.es',
    hours: 'Sin horario fijo',
    coordinates: { lat: 39.4792, lng: -0.3761 },
    updated: '30.05.24'
  },
  {
    id: 'emp-3',
    categoryId: 'empleo',
    name: { es: 'MISION URBANA', en: 'MISION URBANA', it: 'MISION URBANA', ar: 'MISION URBANA', fr: 'MISION URBANA' },
    description: { 
      es: 'Sin cita previa. Imprescindible permiso de trabajo.',
      en: 'No appointment needed. Work permit required.',
      it: 'Nessun appuntamento richiesto. Permesso di lavoro indispensabile.',
      ar: 'لا حاجة لموعد. تصريح العمل ضروري.',
      fr: 'Sans rendez-vous. Permis de travail indispensable.'
    },
    address: 'Botzer de Floc',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'L-V (9:30 a 12:30)',
    coordinates: { lat: 39.4862, lng: -0.3976 },
    updated: '05.11.22'
  },
  {
    id: 'emp-4',
    categoryId: 'empleo',
    name: { es: 'CEPAIM', en: 'CEPAIM', it: 'CEPAIM', ar: 'CEPAIM', fr: 'CEPAIM' },
    description: { 
      es: 'Programa de inserción sociolaboral en medio rural y programa laboral exclusivo para mujeres. (Específico personas migrantes).',
      en: 'Socio-laboral insertion program in rural areas and exclusive employment program for women. (Specific for migrants).',
      it: 'Programma di inserimento socio-lavorativo in aree rurali e programma di lavoro esclusivo per donne. (Specifico per migranti).',
      ar: 'برنامج إدماج اجتماعي ومهني في المناطق الريفية وبرنامج عمل حصري للنساء. (خاص بالمهاجرين).',
      fr: 'Programme d\'insertion socio-professionnelle en milieu rural et programme d\'emploi exclusif pour les femmes. (Spécifique pour les migrants).'
    },
    address: '',
    phone: '96 392 53 02',
    email: 'gorettiruiz@cepaim.org',
    hours: 'L-J (9:00-14:00 / 16:00-18:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '05.12.22'
  },
  {
    id: 'emp-5',
    categoryId: 'empleo',
    name: { es: 'ACCEM (Centre de dia)', en: 'ACCEM (Day Center)', it: 'ACCEM (Centro Diurno)', ar: 'ACCEM (المركز النهاري)', fr: 'ACCEM (Centre de Jour)' },
    description: { 
      es: 'Inserción laboral y asesoramiento. Funciona con cita previa (turnos a las 9am) o mediante derivación desde Bokatas.',
      en: 'Job placement and counseling. By appointment (slots at 9am) or by referral from Bokatas.',
      it: 'Inserimento lavorativo e consulenza. Su appuntamento (turni alle 9) o tramite invio da Bokatas.',
      ar: 'إدماج مهني واستشارة. تعمل بموعد مسبق (المواعيد الساعة 9 صباحًا) أو عن طريق الإحالة من بوكاتاس.',
      fr: 'Insertion professionnelle et conseil. Sur rendez-vous (créneaux à 9h) ou sur orientation de Bokatas.'
    },
    address: 'C/ Mestre Fenollar',
    phone: '96 367 39 94 / 96 349 69 77',
    email: '',
    hours: 'L a V (9:00 a 13:00)',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '05.11.22'
  },
  {
    id: 'emp-6',
    categoryId: 'empleo',
    name: { es: 'ASOCIACIÓN ALANNA', en: 'ALANNA ASSOCIATION', it: 'ASSOCIAZIONE ALANNA', ar: 'جمعية ألانا', fr: 'ASSOCIATION ALANNA' },
    description: { 
      es: 'Específico para mujeres en situación de exclusión social. Integración laboral (limpieza, conserjería, restauración, administrativas...).',
      en: 'Specific for women in social exclusion. Job integration (cleaning, caretaking, catering, administrative...).',
      it: 'Specifico per donne in situazione di esclusione sociale. Integrazione lavorativa (pulizie, portineria, ristorazione, amministrative...).',
      ar: 'خاص بالنساء في وضع الإقصاء الاجتماعي. إدماج مهني (تنظيف، بوابات، مطاعم، إداريات...).',
      fr: 'Spécifique pour les femmes en situation d\'exclusion sociale. Intégration professionnelle (nettoyage, conciergerie, restauration, administration...).'
    },
    address: 'Plaza Fray Luis Colomer, 3',
    phone: '96 339 38 77',
    email: '',
    hours: '',
    coordinates: { lat: 39.4741, lng: -0.3524 },
  },
  {
    id: 'emp-7',
    categoryId: 'empleo',
    name: { es: 'Asociación para la Promoción', en: 'Association for Promotion', it: 'Associazione per la Promozione', ar: 'جمعية الترقية', fr: 'Association pour la Promotion' },
    description: { 
      es: 'Programas de cualificación profesional inicial.',
      en: 'Initial professional qualification programs.',
      it: 'Programmi di qualificazione professionale iniziale.',
      ar: 'برامج التأهيل المهني الأولي.',
      fr: 'Programmes de qualification professionnelle initiale.'
    },
    address: '',
    phone: '96 392 41 56',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'emp-8',
    categoryId: 'empleo',
    name: { es: 'RELIGIOSAS DE MARÍA INMACULADA', en: 'RELIGIOUS OF MARY IMMACULATE', it: 'RELIGIOSE DI MARIA IMMACOLATA', ar: 'راهبات مريم الطاهرة', fr: 'RELIGIEUSES DE MARIE IMMACULÉE' },
    description: { 
      es: 'Inserción en servicio doméstico de mujeres inmigrantes en edad laboral (fundamentalmente Latam).',
      en: 'Job placement in domestic service for immigrant women of working age (mainly Latin America).',
      it: 'Inserimento nel servizio domestico di donne immigrate in età lavorativa (principalmente America Latina).',
      ar: 'إدماج النساء المهاجرات في سن العمل في الخدمة المنزلية (بشكل أساسي من أمريكا اللاتينية).',
      fr: 'Insertion dans le service domestique des femmes immigrées en âge de travailler (principalement d\'Amérique latine).'
    },
    address: 'Trinquete de Caballeros, 10',
    phone: '96 391 50 82',
    email: '',
    hours: '',
    coordinates: { lat: 39.4751, lng: -0.3731 },
  },
  {
    id: 'emp-9',
    categoryId: 'empleo',
    name: { es: 'SERVEF', en: 'SERVEF', it: 'SERVEF', ar: 'SERVEF', fr: 'SERVEF' },
    description: { 
      es: 'Teléfono de información gratuita.',
      en: 'Free information hotline.',
      it: 'Numero verde informativo.',
      ar: 'هاتف معلومات مجاني.',
      fr: 'Ligne d\'information gratuite.'
    },
    address: '',
    phone: '900 100 785',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
  },

  // --- ORIENTACIÓN ---
  {
    id: 'ori-1',
    categoryId: 'orientacion',
    name: { es: 'Oficina Municipal INFOVIVIENDA', en: 'Municipal INFOVIVIENDA Office', it: 'Ufficio Municipale INFOVIVIENDA', ar: 'مكتب INFOVIVIENDA البلدي', fr: 'Bureau Municipal INFOVIVIENDA' },
    description: { 
      es: 'Búsqueda de vivienda a personas con especiales dificultades. Información sobre ayudas para viviendas de alquiler. Servicio público.',
      en: 'Housing search for people with special difficulties. Information on rental housing aid. Public service.',
      it: 'Ricerca di alloggio per persone con particolari difficoltà. Informazioni sugli aiuti per l\'affitto. Servizio pubblico.',
      ar: 'البحث عن سكن للأشخاص الذين يواجهون صعوبات خاصة. معلومات حول مساعدات استئجار السكن. خدمة عامة.',
      fr: 'Recherche de logement pour les personnes ayant des difficultés particulières. Informations sur les aides au logement locatif. Service public.'
    },
    address: 'C/ Amadeo de Saboya, 11',
    phone: '96 208 24 40',
    email: 'infoviviendasolidaria@valencia.es',
    hours: 'L-V (9:30 a 13:30)',
    coordinates: { lat: 39.4761, lng: -0.3615 },
    updated: '22.11.21'
  },
  {
    id: 'ori-2',
    categoryId: 'orientacion',
    name: { es: 'Centros municipales servicios sociales', en: 'Municipal social services centers', it: 'Centri municipali di servizi sociali', ar: 'مراكز الخدمات الاجتماعية البلدية', fr: 'Centres municipaux de services sociaux' },
    description: { 
      es: 'Información sobre ayudas y servicios para personas residentes en la ciudad de València.',
      en: 'Information on aid and services for residents of the city of Valencia.',
      it: 'Informazioni su aiuti e servizi per i residenti nella città di Valencia.',
      ar: 'معلومات حول المساعدات والخدمات للمقيمين في مدينة بلنسية.',
      fr: 'Informations sur les aides et services pour les résidents de la ville de Valence.'
    },
    address: '',
    phone: '626 028 169 (Asistente virtual)',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '15.01.21'
  },

  // --- ASESORÍA JURÍDICA ---
  {
    id: 'jur-1',
    categoryId: 'juridico',
    name: { es: 'MARITIM (Comité Antisida)', en: 'MARITIM (Anti-AIDS Committee)', it: 'MARITIM (Comitato Anti-AIDS)', ar: 'ماريتيم (لجنة مكافحة الإيدز)', fr: 'MARITIM (Comité Anti-SIDA)' },
    description: { 
      es: 'Atención social y jurídica a los usuarios del centro. Dirigido exclusivamente a drogodependientes en activo.',
      en: 'Social and legal care for center users. Exclusively for active drug users.',
      it: 'Assistenza sociale e legale per gli utenti del centro. Rivolto esclusivamente a tossicodipendenti attivi.',
      ar: 'رعاية اجتماعية وقانونية لمستخدمي المركز. موجه حصريًا لمتعاطي المخدرات النشطين.',
      fr: 'Prise en charge sociale et juridique pour les utilisateurs du centre. Exclusivement pour les toxicomanes actifs.'
    },
    address: '',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:30)',
    coordinates: { lat: 0, lng: 0 },
    updated: '10.05.24'
  },
  {
    id: 'jur-2',
    categoryId: 'juridico',
    name: { es: 'CEPAIM', en: 'CEPAIM', it: 'CEPAIM', ar: 'CEPAIM', fr: 'CEPAIM' },
    description: { 
      es: 'Retorno voluntario a país de origen, previa evaluación del caso.',
      en: 'Voluntary return to country of origin, after case evaluation.',
      it: 'Ritorno volontario al paese di origine, previa valutazione del caso.',
      ar: 'العودة الطوعية إلى بلد المنشأ، بعد تقييم الحالة.',
      fr: 'Retour volontaire au pays d\'origine, après évaluation du cas.'
    },
    address: '',
    phone: '96 392 53 02',
    email: 'gorettiruiz@cepaim.org',
    hours: 'L-J (9:00-14:00 / 16:00-18:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '30.05.24'
  },
  {
    id: 'jur-3',
    categoryId: 'juridico',
    name: { es: 'Aguante Social B', en: 'Aguante Social B', it: 'Aguante Social B', ar: 'Aguante Social B', fr: 'Aguante Social B' },
    description: { 
      es: 'Asesoría jurídica gratuita en materia de extranjería: padrón, arraigo, SIP, Renta Valenciana de Inclusión...',
      en: 'Free legal advice on immigration: registration (padrón), residency (arraigo), SIP, Valencian Inclusion Income...',
      it: 'Consulenza legale gratuita in materia di immigrazione: registrazione (padrón), residenza (arraigo), SIP, Reddito Valenciano di Inclusione...',
      ar: 'استشارة قانونية مجانية في شؤون الهجرة: تسجيل السكن (padrón)، الإقامة (arraigo)، بطاقة SIP، دخل فالنسيا للإدماج...',
      fr: 'Conseil juridique gratuit en matière d\'immigration : enregistrement (padrón), résidence (arraigo), SIP, Revenu Valencien d\'Inclusion...'
    },
    address: 'C/ Marqués de Campo 16',
    phone: '900 404 405 (gratuito)',
    email: 'aguantesocial21@gmail.com',
    hours: 'L-V (10:00-14:00), M y Mx (19:00)',
    coordinates: { lat: 39.4665, lng: -0.3802 },
    updated: '13.04.21'
  },
  {
    id: 'jur-4',
    categoryId: 'juridico',
    name: { es: 'ATLAS (Migración y Refugio)', en: 'ATLAS (Migration and Refuge)', it: 'ATLAS (Migrazione e Rifugio)', ar: 'أطلس (الهجرة واللجوء)', fr: 'ATLAS (Migration et Refuge)' },
    description: { 
      es: 'Abogados, trabajadores sociales y orientadores laborales especializados en extranjería y asilo.',
      en: 'Lawyers, social workers, and job counselors specialized in immigration and asylum.',
      it: 'Avvocati, assistenti sociali e consulenti del lavoro specializzati in immigrazione e asilo.',
      ar: 'محامون، أخصائيون اجتماعيون، ومستشارو توظيف متخصصون في شؤون الهجرة واللجوء.',
      fr: 'Avocats, travailleurs sociaux et conseillers d\'emploi spécialisés en immigration et asile.'
    },
    address: 'C/ Marqués de Montortal 65',
    phone: '612 401 848',
    email: 'atlas_sic@cv.gva.es',
    hours: '15:00',
    coordinates: { lat: 39.4891, lng: -0.3820 },
    updated: '03.03.22'
  },
  {
    id: 'jur-5',
    categoryId: 'juridico',
    name: { es: 'NOMADAS (Extranjería)', en: 'NOMADAS (Immigration)', it: 'NOMADAS (Immigrazione)', ar: 'NOMADAS (شؤون الهجرة)', fr: 'NOMADAS (Immigration)' },
    description: { 
      es: 'Asesoría jurídica Gratuita en materia de extranjería (prioridad a personas migrantes lgtbiq+ y trabajadoras sexuales). Abogada Carmen Cabrera.',
      en: 'Free legal advice on immigration (priority for lgtbiq+ migrants and sex workers). Lawyer Carmen Cabrera.',
      it: 'Consulenza legale gratuita in materia di immigrazione (priorità a migranti lgtbiq+ e sex workers). Avvocato Carmen Cabrera.',
      ar: 'استشارة قانونية مجانية في شؤون الهجرة (أولوية للمهاجرين من مجتمع الميم والعاملات في الجنس). المحامية كارمن كابريرا.',
      fr: 'Conseil juridique gratuit en matière d\'immigration (priorité aux migrants lgtbiq+ et aux travailleuses du sexe). Avocate Carmen Cabrera.'
    },
    address: 'C/ Rodríguez de Cepeda, 15 (Amistad)',
    phone: '',
    email: 'oficina.nomadasvlc@gmail.com',
    hours: '2do y 4to Mx de cada mes (17:00-20:00)',
    coordinates: { lat: 39.4691, lng: -0.3541 },
    updated: '01.07.21'
  },
  {
    id: 'jur-6',
    categoryId: 'juridico',
    name: { es: 'AVANT', en: 'AVANT', it: 'AVANT', ar: 'أفانت', fr: 'AVANT' },
    description: { 
      es: 'Orientación jurídica gratuita, a personas que han cometido delitos asociados al consumo de drogas o como consecuencia de su adicción.',
      en: 'Free legal guidance for people who have committed crimes related to drug use or as a result of their addiction.',
      it: 'Orientamento legale gratuito per persone che hanno commesso reati legati al consumo di droga o come conseguenza della loro dipendenza.',
      ar: 'توجيه قانوني مجاني للأشخاص الذين ارتكبوا جرائم مرتبطة بتعاطي المخدرات أو نتيجة لإدمانهم.',
      fr: 'Orientation juridique gratuite pour les personnes ayant commis des délits liés à la consommation de drogues ou à leur dépendance.'
    },
    address: '',
    phone: '96 346 29 67',
    email: 'avant@asocavant.org',
    hours: 'L a V (19:00 a 20:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  {
    id: 'jur-7',
    categoryId: 'juridico',
    name: { es: 'Movimiento por la Paz (MPDL)', en: 'Movement for Peace (MPDL)', it: 'Movimento per la Pace (MPDL)', ar: 'الحركة من أجل السلام (MPDL)', fr: 'Mouvement pour la Paix (MPDL)' },
    description: { 
      es: 'Asesoría jurídica gratuita en materia de extranjería, nacionalidad, procedimientos administrativos, asesoramiento en prestaciones, ayudas sociales, derechos laborales.',
      en: 'Free legal advice on immigration, nationality, administrative procedures, counseling on benefits, social aid, labor rights.',
      it: 'Consulenza legale gratuita in materia di immigrazione, nazionalità, procedure amministrative, consulenza su prestazioni, aiuti sociali, diritti del lavoro.',
      ar: 'استشارة قانونية مجانية في شؤون الهجرة، الجنسية، الإجراءات الإدارية، استشارة حول الإعانات، المساعدات الاجتماعية، حقوق العمل.',
      fr: 'Conseil juridique gratuit en matière d\'immigration, nationalité, procédures administratives, conseil sur les prestations, aides sociales, droits du travail.'
    },
    address: 'C/ Artifices 24',
    phone: '96 382 15 31',
    email: 'val.juridica@mpdl.org',
    hours: 'L a V (9:30 a 13:30)',
    coordinates: { lat: 39.4630, lng: -0.4005 },
    updated: '20.01.21'
  },
  {
    id: 'jur-8',
    categoryId: 'juridico',
    name: { es: 'Centro Islámico de Valencia', en: 'Islamic Center of Valencia', it: 'Centro Islamico di Valencia', ar: 'المركز الإسلامي في بلنسية', fr: 'Centre Islamique de Valence' },
    description: { 
      es: 'Dirigido a miembros de la comunidad musulmana.',
      en: 'For members of the Muslim community.',
      it: 'Rivolto ai membri della comunità musulmana.',
      ar: 'موجه لأعضاء الجالية المسلمة.',
      fr: 'Destiné aux membres de la communauté musulmane.'
    },
    address: 'C/ Arquitecto Rodríguez, 17, 19 y 21',
    phone: '96 360 33 30',
    email: '',
    hours: '',
    coordinates: { lat: 39.4912, lng: -0.3804 },
    updated: '20.01.21'
  },

  // --- OTROS RECURSOS ---
  {
    id: 'otr-1',
    categoryId: 'otros',
    name: { es: 'Asociación Pali', en: 'Pali Association', it: 'Associazione Pali', ar: 'جمعية بالي', fr: 'Association Pali' },
    description: { 
      es: 'Primera atención (alimentación, ropa, alojamiento, ayudas de farmacia). Actividades culturales y religiosas. Información y apoyo al retorno.',
      en: 'First assistance (food, clothing, housing, pharmacy aid). Cultural and religious activities. Information and support for return.',
      it: 'Prima assistenza (cibo, vestiti, alloggio, aiuti farmaceutici). Attività culturali e religiose. Informazione e sostegno al ritorno.',
      ar: 'المساعدة الأولية (طعام، ملابس، سكن، مساعدات صيدلانية). أنشطة ثقافية ودينية. معلومات ودعم للعودة.',
      fr: 'Première assistance (nourriture, vêtements, logement, aide pharmaceutique). Activités culturelles et religieuses. Information et soutien au retour.'
    },
    address: '',
    phone: '632 999 279',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  {
    id: 'otr-2',
    categoryId: 'otros',
    name: { es: 'Rumiñahui', en: 'Rumiñahui', it: 'Rumiñahui', ar: 'رومينياوي', fr: 'Rumiñahui' },
    description: { 
      es: 'Atención, información y orientación jurídica de manera presencial y telefónica.',
      en: 'In-person and telephone attention, information, and legal guidance.',
      it: 'Assistenza, informazione e orientamento legale di persona e telefonicamente.',
      ar: 'رعاية، معلومات، وتوجيه قانوني شخصيًا وهاتفيًا.',
      fr: 'Attention, information et orientation juridique en personne et par téléphone.'
    },
    address: 'C/ Maximiliano Giner 9, Bajo Izquierda',
    phone: '96 070 37 52',
    email: 'educacionvalencia@ruminahui.org',
    hours: '',
    coordinates: { lat: 39.4800, lng: -0.3670 },
    updated: '05.11.22'
  },
  {
    id: 'otr-3',
    categoryId: 'otros',
    name: { es: 'Gestión cuenta bancaria', en: 'Bank Account Management', it: 'Gestione Conto Bancario', ar: 'إدارة حساب بنكي', fr: 'Gestion de Compte Bancaire' },
    description: { 
      es: 'Gestión para apertura de cuenta bancaria.',
      en: 'Management for opening a bank account.',
      it: 'Gestione per l\'apertura di un conto bancario.',
      ar: 'إدارة لفتح حساب بنكي.',
      fr: 'Gestion pour l\'ouverture d\'un compte bancaire.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'otr-4',
    categoryId: 'otros',
    name: { es: 'Bicis para todas', en: 'Bikes for all', it: 'Bici per tutte', ar: 'دراجات للجميع', fr: 'Vélos pour tous' },
    description: { 
      es: 'Reparto de bicis destinadas a personas en riesgo de exclusión. Hay que rellenar un formulario web para obtenerlas.',
      en: 'Distribution of bikes for people at risk of exclusion. A web form must be filled out to get them.',
      it: 'Distribuzione di bici destinate a persone a rischio di esclusione. Bisogna compilare un modulo web per ottenerle.',
      ar: 'توزيع الدراجات للأشخاص المعرضين لخطر الإقصاء. يجب ملء استمارة ويب للحصول عليها.',
      fr: 'Distribution de vélos destinés aux personnes à risque d\'exclusion. Il faut remplir un formulaire web pour les obtenir.'
    },
    address: '',
    phone: '667 676 104',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '11.01.22'
  },

  // --- EQUIPOS DE CALLE ---
  {
    id: 'calle-1',
    categoryId: 'calle',
    name: { es: 'BOKATAS', en: 'BOKATAS', it: 'BOKATAS', ar: 'بوكاتاس', fr: 'BOKATAS' },
    description: { 
      es: 'Reparto de comida y acompañamiento. Zonas: El Pilar (19:45-20:45), Botánico (21:00-21:15).',
      en: 'Food distribution and support. Areas: El Pilar (19:45-20:45), Botánico (21:00-21:15).',
      it: 'Distribuzione di cibo e supporto. Zone: El Pilar (19:45-20:45), Botánico (21:00-21:15).',
      ar: 'توزيع الطعام والدعم. المناطق: إل بيلار (19:45-20:45)، بوتانيكو (21:00-21:15).',
      fr: 'Distribution de nourriture et accompagnement. Zones : El Pilar (19:45-20:45), Botánico (21:00-21:15).'
    },
    address: 'El Pilar, Plaça de la Botja, Botánico (Interior)',
    phone: '',
    email: '',
    hours: 'M (20:30-23:00)',
    coordinates: { lat: 39.4746, lng: -0.3805 },
  },
  {
    id: 'calle-2',
    categoryId: 'calle',
    name: { es: 'SALUD Y COMUNIDAD (Calle)', en: 'HEALTH AND COMMUNITY (Street)', it: 'SALUTE E COMUNITÀ (Strada)', ar: 'الصحة والمجتمع (الشارع)', fr: 'SANTÉ ET COMMUNAUTÉ (Rue)' },
    description: { 
      es: 'Reparto de preservativos y jeringuillas, elementos que permitan consumir de forma segura. Atención sanitaria. Reparto de comida.',
      en: 'Distribution of condoms and syringes, items for safe consumption. Health care. Food distribution.',
      it: 'Distribuzione di preservativi e siringhe, elementi per un consumo sicuro. Assistenza sanitaria. Distribuzione di cibo.',
      ar: 'توزيع الواقيات الذكرية والحقن، وعناصر تتيح الاستهلاك الآمن. رعاية صحية. توزيع الطعام.',
      fr: 'Distribution de préservatifs et de seringues, éléments permettant une consommation sécurisée. Soins de santé. Distribution de nourriture.'
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  {
    id: 'calle-3',
    categoryId: 'calle',
    name: { es: 'INVISIBLES', en: 'INVISIBLES', it: 'INVISIBLES', ar: 'الخفيون', fr: 'INVISIBLES' },
    description: { 
      es: 'Reparto de comida y acompañamiento.',
      en: 'Food distribution and support.',
      it: 'Distribuzione di cibo e supporto.',
      ar: 'توزيع الطعام والدعم.',
      fr: 'Distribution de nourriture et accompagnement.'
    },
    address: '',
    phone: '',
    email: '',
    hours: 'M',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'calle-4',
    categoryId: 'calle',
    name: { es: 'ANANDA', en: 'ANANDA', it: 'ANANDA', ar: 'أناند', fr: 'ANANDA' },
    description: { 
      es: 'Reparto de comida y acompañamiento.',
      en: 'Food distribution and support.',
      it: 'Distribuzione di cibo e supporto.',
      ar: 'توزيع الطعام والدعم.',
      fr: 'Distribution de nourriture et accompagnement.'
    },
    address: '',
    phone: '',
    email: '',
    hours: 'J (20:00-23:00)',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'calle-5',
    categoryId: 'calle',
    name: { es: 'AMIGOS DE LA CALLE', en: 'FRIENDS OF THE STREET', it: 'AMICI DELLA STRADA', ar: 'أصدقاء الشارع', fr: 'AMIS DE LA RUE' },
    description: { 
      es: 'Reparto de comida y acompañamiento.',
      en: 'Food distribution and support.',
      it: 'Distribuzione di cibo e supporto.',
      ar: 'توزيع الطعام والدعم.',
      fr: 'Distribution de nourriture et accompagnement.'
    },
    address: '',
    phone: '',
    email: '',
    hours: 'V (20:00-21:30)',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'calle-6',
    categoryId: 'calle',
    name: { es: 'COLECTIVO LA TRIBU', en: 'LA TRIBU COLLECTIVE', it: 'COLLETTIVO LA TRIBU', ar: 'جماعة لا تريبو', fr: 'COLLECTIF LA TRIBU' },
    description: { 
      es: 'Reparto de comida y acompañamiento.',
      en: 'Food distribution and support.',
      it: 'Distribuzione di cibo e supporto.',
      ar: 'توزيع الطعام والدعم.',
      fr: 'Distribution de nourriture et accompagnement.'
    },
    address: '',
    phone: '',
    email: '',
    hours: 'D (19:30-00:00)',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'calle-7',
    categoryId: 'calle',
    name: { es: 'MISIÓN EUCARÍSTICA VOZ DE LOS POBRES', en: 'EUCHARISTIC MISSION VOICE OF THE POOR', it: 'MISSIONE EUCARISTICA VOCE DEI POVERI', ar: 'الرسالة الإفخارستية صوت الفقراء', fr: 'MISSION EUCHARISTIQUE VOIX DES PAUVRES' },
    description: { 
      es: 'Reparto de comida y acompañamiento.',
      en: 'Food distribution and support.',
      it: 'Distribuzione di cibo e supporto.',
      ar: 'توزيع الطعام والدعم.',
      fr: 'Distribution de nourriture et accompagnement.'
    },
    address: '',
    phone: '',
    email: '',
    hours: 'L, M y V (21:00)',
    coordinates: { lat: 0, lng: 0 },
  },
  {
    id: 'calle-8',
    categoryId: 'calle',
    name: { es: 'BUS DE LA SOLIDARITAT', en: 'SOLIDARITY BUS', it: 'BUS DELLA SOLIDARIETÀ', ar: 'حافلة التضامن', fr: 'BUS DE LA SOLIDARITÉ' },
    description: { 
      es: 'Servicios básicos de higiene y aseo personal, peluquería o dentista. Colaboración de la EMT y el Ayuntamiento de Valencia.',
      en: 'Basic hygiene and personal grooming services, hairdressing, or dentist. Collaboration of EMT and Valencia City Council.',
      it: 'Servizi di base di igiene e cura personale, parrucchiere o dentista. Collaborazione di EMT e Comune di Valencia.',
      ar: 'خدمات النظافة الشخصية الأساسية، حلاقة، أو طبيب أسنان. بالتعاون مع EMT وبلدية بلنسية.',
      fr: 'Services d\'hygiène et de soins personnels de base, coiffure ou dentiste. Collaboration de l\'EMT et de la mairie de Valence.'
    },
    address: 'Paradas: Antiguo Hospital, Puente de las Artes',
    phone: '',
    email: '',
    hours: 'L y M (20:00-00:00)',
    coordinates: { lat: 39.4705, lng: -0.3813 },
    updated: '01.01.23'
  },
];

export const getCategories = (): Category[] => categories;
export const getResources = (): Resource[] => resources;