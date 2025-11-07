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
} from '../components/icons/CategoryIcons';

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
    id: 'primeros-pasos-1',
    categoryId: 'primeros-pasos',
    name: { 
      es: 'CAST (Centro municipal de Asistencia a personas Sin Techo)', 
      en: 'CAST (Municipal Assistance Center for the Homeless)', 
      it: 'CAST (Centro municipale di assistenza per persone senza fissa dimora)', 
      ar: 'CAST (المركز البلدي لمساعدة المشردين)', 
      fr: 'CAST (Centre municipal d\'assistance aux sans-abri)' 
    },
    description: { 
      es: 'Gestión de albergues. Atención social individualizada. Programas específicos para personas sin hogar. Atención sanitaria especializada.', 
      en: 'Shelter management. Individualized social assistance. Specific programs for homeless people. Specialized health care.', 
      it: 'Gestione dei rifugi. Assistenza sociale individualizzata. Programmi specifici per persone senza fissa dimora. Assistenza sanitaria specializzata.', 
      ar: 'إدارة المآوي. مساعدة اجتماعية فردية. برامج محددة للمشردين. رعاية صحية متخصصة.', 
      fr: 'Gestion des hébergements. Aide sociale individualisée. Programmes spécifiques pour les sans-abri. Soins de santé spécialisés.' 
    },
    address: 'C/ Jardines, 3 (Esquina Sogueros)',
    phone: '96 208 47 47',
    email: 'cast@valencia.es',
    hours: 'L a J (8:00 a 15:00 / 16:00 a 20:00), V (8:00 a 15:00). *se pide turno a partir de las 8:00',
    coordinates: { lat: 39.4774, lng: -0.3775 },
    updated: '10.01.21'
  },
  {
    id: 'primeros-pasos-2',
    categoryId: 'primeros-pasos',
    name: { 
      es: 'CAI (Centro de Apoyo a la Inmigración)', 
      en: 'CAI (Immigration Support Center)', 
      it: 'CAI (Centro di supporto all\'immigrazione)', 
      ar: 'CAI (مركز دعم الهجرة)', 
      fr: 'CAI (Centre de soutien à l\'immigration)' 
    },
    description: { 
      es: 'Información, orientación y asesoramiento jurídico a personas inmigrantes.', 
      en: 'Information, guidance and legal advice for immigrants.', 
      it: 'Informazione, orientamento e consulenza legale per gli immigrati.', 
      ar: 'معلومات وتوجيه واستشارات قانونية للمهاجرين.', 
      fr: 'Information, orientation et conseil juridique pour les immigrés.' 
    },
    address: 'Calle Pozo S/n',
    phone: '96 208 74 23',
    email: 'cai.amics@valencia.es',
    hours: 'L a J (8:00 a 20:00), V (8:00 a 15:00)',
    coordinates: { lat: 39.4769, lng: -0.3764 },
    updated: '10.01.21'
  },
  // --- HIGIENE ---
  {
    id: 'higiene-1',
    categoryId: 'higiene',
    name: { es: 'CASA CARIDAD', en: 'CASA CARIDAD', it: 'CASA CARIDAD', ar: 'كاسا كاريداد', fr: 'CASA CARIDAD' },
    description: { 
      es: 'Peluquería. Duchas (usuarios*). *funciona con cita previa', 
      en: 'Hairdressing. Showers (users*). *by appointment only', 
      it: 'Parrucchiere. Docce (utenti*). *funziona su appuntamento', 
      ar: 'تصفيف الشعر. حمامات (للمستخدمين*). *يعمل بنظام المواعيد المسبقة فقط', 
      fr: 'Coiffure. Douches (utilisateurs*). *sur rendez-vous uniquement' 
    },
    address: 'Passeig de la Petxina, 9',
    phone: '96 391 17 26',
    email: 'tsociallorena@casacaridad.com',
    hours: 'L a V',
    coordinates: { lat: 39.4746, lng: -0.3934 },
    updated: '30.05.24'
  },
  {
    id: 'higiene-2',
    categoryId: 'higiene',
    name: { es: 'PROYECTO REHOBOTH (Asociación Natania)', en: 'REHOBOTH PROJECT (Natania Association)', it: 'PROGETTO REHOBOTH (Associazione Natania)', ar: 'مشروع رحوبوت (جمعية نتانيا)', fr: 'PROJET REHOBOTH (Association Natania)' },
    description: { 
      es: 'Duchas, lavandería, consigna y alimentación ligera. *Mediante cita previa, obtenidas los J (por tel. y presencial) y V (sólo por tel.) de 10 a 13', 
      en: 'Showers, laundry, luggage storage and light food. *By appointment, obtained on Thursdays (by phone and in person) and Fridays (by phone only) from 10 am to 1 pm', 
      it: 'Docce, lavanderia, deposito bagagli e cibo leggero. *Su appuntamento, ottenuto il giovedì (per telefono e di persona) and venerdì (solo per telefono) dalle 10 alle 13', 
      ar: 'حمامات، مغسلة، تخزين أمتعة وطعام خفيف. *عن طريق موعد مسبق، يتم الحصول عليه يوم الخميس (عبر الهاتف وحضورياً) والجمعة (عبر الهاتف فقط) من الساعة 10 صباحاً حتى 1 ظهراً', 
      fr: 'Douches, blanchisserie, consigne et nourriture légère. *Sur rendez-vous, obtenu le jeudi (par téléphone et en personne) et le vendredi (par téléphone uniquement) de 10h à 13h' 
    },
    address: 'C/ Lepanto, 5',
    phone: '685 86 52 51 / 691 79 84 63',
    email: 'info@natania.es',
    hours: 'S y D, 4 turnos (8:00 a 19:30)',
    coordinates: { lat: 39.4704, lng: -0.3719 },
    updated: '03.05.21'
  },
  {
    id: 'higiene-3',
    categoryId: 'higiene',
    name: { es: 'MISIÓN URBANA', en: 'URBAN MISSION', it: 'MISSIONE URBANA', ar: 'البعثة الحضرية', fr: 'MISSION URBAINE' },
    description: { 
      es: 'Higiene personal (duchas y ropa interior): 12 personas al día. Ropero: servicio condicionado al servicio de higiene personal. Peluquería: lunes. *funciona con cita previa', 
      en: 'Personal hygiene (showers and underwear): 12 people per day. Wardrobe: service conditioned on personal hygiene service. Hairdressing: Monday. *by appointment only', 
      it: 'Igiene personale (docce e biancheria intima): 12 persone al giorno. Guardaroba: servizio condizionato al servizio di igiene personale. Parrucchiere: lunedì. *funziona su appuntamento', 
      ar: 'النظافة الشخصية (حمامات وملابس داخلية): 12 شخصًا في اليوم. خزانة الملابس: الخدمة مشروطة بخدمة النظافة الشخصية. تصفيف الشعر: الاثنين. *يعمل بنظام المواعيد المسبقة فقط', 
      fr: 'Hygiène personnelle (douches et sous-vêtements) : 12 personnes par jour. Garde-robe : service conditionné au service d\'hygiène personnelle. Coiffure : lundi. *sur rendez-vous uniquement' 
    },
    address: 'C/ Roger de Flor, 15',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'L, Mx y V (9:30 a 12:30), M (16:30 a 18:30)',
    coordinates: { lat: 39.4715, lng: -0.3809 },
    updated: '30.05.24'
  },
  {
    id: 'higiene-4',
    categoryId: 'higiene',
    name: { es: 'MÉDICOS DEL MUNDO', en: 'DOCTORS OF THE WORLD', it: 'MEDICI DEL MONDO', ar: 'أطباء العالم', fr: 'MÉDECINS DU MONDE' },
    description: { 
      es: 'Duchas (sólo usuarios del centro mediante cita previa, excepto los viernes que es solo para mujeres y se puede acudir sin cita)', 
      en: 'Showers (center users only by appointment, except on Fridays which is only for women and you can go without an appointment)', 
      it: 'Docce (solo utenti del centro su appuntamento, tranne il venerdì che è solo per donne e si può andare senza appuntamento)', 
      ar: 'حمامات (لمستخدمي المركز فقط عن طريق موعد مسبق، باستثناء أيام الجمعة المخصصة للنساء فقط ويمكن الحضور بدون موعد)', 
      fr: 'Douches (utilisateurs du centre uniquement sur rendez-vous, sauf le vendredi qui est réservé aux femmes et où vous pouvez vous présenter sans rendez-vous)' 
    },
    address: 'C/ del doctor Monserrat nº1',
    phone: '96 391 97 23',
    email: 'valencia@medicosdelmundo.org',
    hours: 'L a J (12:30, 14:00, 16:00, 17:30), V de 11h a 13h (solo mujeres)',
    coordinates: { lat: 39.4665, lng: -0.3887 },
    updated: '30.05.24'
  },
  {
    id: 'higiene-5',
    categoryId: 'higiene',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Dirigido exclusivamente a drogodependientes en activo. VIH+/SIDA. Higiene, ropero y lavandería.', 
      en: 'Exclusively for active drug addicts. HIV+/AIDS. Hygiene, wardrobe and laundry.', 
      it: 'Esclusivamente per tossicodipendenti attivi. HIV+/AIDS. Igiene, guardaroba e lavanderia.', 
      ar: 'حصرياً للمدمنين النشطين. فيروس نقص المناعة البشرية / الإيدز. النظافة وخزانة الملابس والمغسلة.', 
      fr: 'Exclusivement pour les toxicomanes actifs. VIH+/SIDA. Hygiène, garde-robe et blanchisserie.' 
    },
    address: 'C/ Campos Crespo, 39',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 39.4475, lng: -0.3888 },
    updated: '20.01.21'
  },
  {
    id: 'higiene-6',
    categoryId: 'higiene',
    name: { es: 'Comité Ciudadano Antisida - CIBE MARÍTIM', en: 'Anti-AIDS Citizens\' Committee - CIBE MARÍTIM', it: 'Comitato cittadino anti-AIDS - CIBE MARÍTIM', ar: 'لجنة المواطنين لمكافحة الإيدز - CIBE MARÍTIM', fr: 'Comité citoyen anti-SIDA - CIBE MARÍTIM' },
    description: { 
      es: 'Centro de día que proporciona a sus usuarios (drogodependientes) alimentación, ducha y ropero.', 
      en: 'Day center that provides its users (drug addicts) with food, showers and a wardrobe.', 
      it: 'Centro diurno che fornisce ai suoi utenti (tossicodipendenti) cibo, docce e un guardaroba.', 
      ar: 'مركز نهاري يوفر لمستخدميه (المدمنين) الطعام والاستحمام وخزانة ملابس.', 
      fr: 'Centre de jour qui fournit à ses usagers (toxicomanes) de la nourriture, des douches et une garde-robe.' 
    },
    address: 'Calle Barraca, 290 (Malvarrosa)',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:30)',
    coordinates: { lat: 39.4754, lng: -0.3299 },
    updated: '30.05.24'
  },
  {
    id: 'higiene-7',
    categoryId: 'higiene',
    name: { es: 'ACCEM "Centro de día Blanquita"', en: 'ACCEM "Blanquita Day Center"', it: 'ACCEM "Centro diurno Blanquita"', ar: 'ACCEM "مركز بلانكيتا النهاري"', fr: 'ACCEM "Centre de jour Blanquita"' },
    description: { 
      es: 'Lavadoras, duchas, peluquería. *funciona con cita previa (los turnos se reparten a las 8am.) *se recomienda llamar y derivar desde Bokatas', 
      en: 'Washing machines, showers, hairdressing. *by appointment (shifts are distributed at 8am.) *it is recommended to call and refer from Bokatas', 
      it: 'Lavatrici, docce, parrucchiere. *su appuntamento (i turni sono distribuiti alle 8 del mattino.) *si consiglia di chiamare e fare riferimento da Bokatas', 
      ar: 'غسالات، حمامات، تصفيف الشعر. *عن طريق موعد (يتم توزيع المناوبات في الساعة 8 صباحًا.) *يوصى بالاتصال والإحالة من بوكاتاس', 
      fr: 'Machines à laver, douches, coiffure. *sur rendez-vous (les quarts de travail sont distribués à 8h du matin.) *il est recommandé d\'appeler et de se référer à Bokatas' 
    },
    address: 'C/ Mossen Fenollar, 9',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'vsimonm@accem.es',
    hours: 'L a V (9:00 a 13:00) - Mx solo mujeres',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '30.05.24'
  },
  // --- COMER ---
  {
    id: 'comida-1',
    categoryId: 'comida',
    name: { es: 'ACCEM "Centro de día Blanquita"', en: 'ACCEM "Blanquita Day Center"', it: 'ACCEM "Centro diurno Blanquita"', ar: 'ACCEM "مركز بلانكيتا النهاري"', fr: 'ACCEM "Centre de jour Blanquita"' },
    description: { 
      es: 'Desayunos/almuerzos. *funciona con cita previa (los turnos se reparten a las 8am.) *se recomienda llamar y derivar desde Bokatas', 
      en: 'Breakfasts/lunches. *by appointment (shifts are distributed at 8am.) *it is recommended to call and refer from Bokatas', 
      it: 'Colazioni/pranzi. *su appuntamento (i turni sono distribuiti alle 8 del mattino.) *si consiglia di chiamare e fare riferimento da Bokatas', 
      ar: 'وجبات إفطار/غداء. *عن طريق موعد (يتم توزيع المناوبات في الساعة 8 صباحًا.) *يوصى بالاتصال والإحالة من بوكاتاس', 
      fr: 'Petits-déjeuners/déjeuners. *sur rendez-vous (les quarts de travail sont distribués à 8h du matin.) *il est recommandé d\'appeler et de se référer à Bokatas' 
    },
    address: 'C/ Mossen Fenollar, 9',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'vsimonm@accem.es',
    hours: 'L a V (9:00 a 13:00) - Mx solo mujeres',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '30.05.24'
  },
  {
    id: 'comida-2',
    categoryId: 'comida',
    name: { es: 'CASA CARIDAD', en: 'CASA CARIDAD', it: 'CASA CARIDAD', ar: 'كاسا كاريداد', fr: 'CASA CARIDAD' },
    description: { 
      es: 'Comedor social Petxina (cita previa, aforo limitado)', 
      en: 'Petxina soup kitchen (appointment required, limited capacity)', 
      it: 'Mensa sociale Petxina (appuntamento obbligatorio, capacità limitata)', 
      ar: 'مطبخ بتشينا الخيري (الحجز المسبق مطلوب، السعة محدودة)', 
      fr: 'Soupe populaire Petxina (rendez-vous obligatoire, capacité limitée)' 
    },
    address: 'Passeig de la Petxina, 9',
    phone: '96 391 17 26',
    email: 'tsociallorena@casacaridad.com',
    hours: 'L a D (13:30 a 14:30)',
    coordinates: { lat: 39.4746, lng: -0.3934 },
    updated: '30.05.24'
  },
  {
    id: 'comida-3',
    categoryId: 'comida',
    name: { es: 'MISIÓN URBANA', en: 'URBAN MISSION', it: 'MISSIONE URBANA', ar: 'البعثة الحضرية', fr: 'MISSION URBAINE' },
    description: { 
      es: 'Desayuno', 
      en: 'Breakfast', 
      it: 'Colazione', 
      ar: 'وجبة افطار', 
      fr: 'Petit-déjeuner' 
    },
    address: 'C/ Roger de Flor, 15',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'Desayuno',
    coordinates: { lat: 39.4715, lng: -0.3809 },
    updated: '30.05.24'
  },
  {
    id: 'comida-4',
    categoryId: 'comida',
    name: { es: 'MÉDICOS DEL MUNDO', en: 'DOCTORS OF THE WORLD', it: 'MEDICI DEL MONDO', ar: 'أطباء العالم', fr: 'MÉDECINS DU MONDE' },
    description: { 
      es: 'Usuarios del centro mediante cita previa, excepto los viernes que es solo para mujeres y se puede acudir sin cita', 
      en: 'Center users by appointment, except on Fridays which is only for women and you can go without an appointment', 
      it: 'Utenti del centro su appuntamento, tranne il venerdì che è solo per donne e si può andare senza appuntamento', 
      ar: 'مستخدمو المركز عن طريق موعد مسبق، باستثناء أيام الجمعة المخصصة للنساء فقط ويمكن الحضور بدون موعد', 
      fr: 'Utilisateurs du centre sur rendez-vous, sauf le vendredi qui est réservé aux femmes et où vous pouvez vous présenter sans rendez-vous' 
    },
    address: 'C/ del doctor Monserrat nº1',
    phone: '96 391 97 23',
    email: 'valencia@medicosdelmundo.org',
    hours: 'L a J (12:30, 14:00, 16:00, 17:30), V de 11h a 13h (solo mujeres)',
    coordinates: { lat: 39.4665, lng: -0.3887 },
    updated: '30.05.24'
  },
  {
    id: 'comida-5',
    categoryId: 'comida',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Dirigido exclusivamente a drogodependientes en activo. VIH+/SIDA. Desayuno, comedor y comida para llevar', 
      en: 'Exclusively for active drug addicts. HIV+/AIDS. Breakfast, dining room and take-away food', 
      it: 'Esclusivamente per tossicodipendenti attivi. HIV+/AIDS. Colazione, sala da pranzo e cibo da asporto', 
      ar: 'حصرياً للمدمنين النشطين. فيروس نقص المناعة البشرية / الإيدز. الإفطار وغرفة الطعام والطعام الجاهز', 
      fr: 'Exclusivement pour les toxicomanes actifs. VIH+/SIDA. Petit-déjeuner, salle à manger et plats à emporter' 
    },
    address: 'C/ Campos Crespo, 39',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 39.4475, lng: -0.3888 },
    updated: '20.01.21'
  },
  {
    id: 'comida-6',
    categoryId: 'comida',
    name: { es: 'Comité Ciudadano Antisida - CIBE MARÍTIM', en: 'Anti-AIDS Citizens\' Committee - CIBE MARÍTIM', it: 'Comitato cittadino anti-AIDS - CIBE MARÍTIM', ar: 'لجنة المواطنين لمكافحة الإيدز - CIBE MARÍTIM', fr: 'Comité citoyen anti-SIDA - CIBE MARÍTIM' },
    description: { 
      es: 'Centro de día que proporciona a sus usuarios (drogodependientes) desayuno y comida.', 
      en: 'Day center that provides its users (drug addicts) with breakfast and lunch.', 
      it: 'Centro diurno che fornisce ai suoi utenti (tossicodipendenti) colazione e pranzo.', 
      ar: 'مركز نهاري يوفر لمستخدميه (المدمنين) وجبتي الإفطار والغداء.', 
      fr: 'Centre de jour qui fournit à ses usagers (toxicomanes) le petit-déjeuner et le déjeuner.' 
    },
    address: 'Calle Barraca, 290 (Malvarrosa)',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:00)',
    coordinates: { lat: 39.4754, lng: -0.3299 },
    updated: '30.05.24'
  },
  {
    id: 'comida-7',
    categoryId: 'comida',
    name: { es: 'COMEDOR SOCIAL ABEJUELA', en: 'ABEJUELA SOUP KITCHEN', it: 'MENSA SOCIALE ABEJUELA', ar: 'مطبخ أبيخويلا الخيري', fr: 'SOUPE POPULAIRE ABEJUELA' },
    description: { 
      es: 'Personas mayores o jubiladas. Admisión a través de Servicios Sociales', 
      en: 'Elderly or retired people. Admission through Social Services', 
      it: 'Anziani o pensionati. Ammissione tramite i Servizi Sociali', 
      ar: 'كبار السن أو المتقاعدون. القبول عن طريق الخدمات الاجتماعية', 
      fr: 'Personnes âgées ou retraitées. Admission par les services sociaux' 
    },
    address: 'Calle Abejuela, 2 (Viveros)',
    phone: '96 369 56 62',
    email: '',
    hours: 'L a S (13:00 a 14:30), D (bolsa con alimentos)',
    coordinates: { lat: 39.4800, lng: -0.3699 },
    updated: 'por confirmar'
  },
  {
    id: 'comida-8',
    categoryId: 'comida',
    name: { es: 'COMEDOR SOCIAL Literato Azorín', en: 'Literato Azorín SOUP KITCHEN', it: 'MENSA SOCIALE Literato Azorín', ar: 'مطبخ ليتيراتو أزورين الخيري', fr: 'SOUPE POPULAIRE Literato Azorín' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: 'Calle Literato Azorín, 15 (Ruzafa)',
    phone: '96 374 39 18',
    email: '',
    hours: 'L a S (12:30 a 13:30)',
    coordinates: { lat: 39.4612, lng: -0.3732 },
    updated: 'por confirmar'
  },
  {
    id: 'comida-9',
    categoryId: 'comida',
    name: { es: 'COMEDOR SOCIAL Malvarrosa', en: 'Malvarrosa SOUP KITCHEN', it: 'MENSA SOCIALE Malvarrosa', ar: 'مطبخ مالفاروسا الخيري', fr: 'SOUPE POPULAIRE Malvarrosa' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: 'Calle Padre Antón Martín, 36-bajo',
    phone: '96 372 79 95',
    email: '',
    hours: 'L a S (9:30) desayuno, comida (13:00)',
    coordinates: { lat: 39.4749, lng: -0.3290 },
    updated: 'por confirmar'
  },
  {
    id: 'comida-10',
    categoryId: 'comida',
    name: { es: 'COMEDOR SOCIAL Nuestra Sra de la Asunción', en: 'Nuestra Sra de la Asunción SOUP KITCHEN', it: 'MENSA SOCIALE Nuestra Sra de la Asunción', ar: 'مطبخ نويسترا سينورا دي لا أسونسيون الخيري', fr: 'SOUPE POPULAIRE Nuestra Sra de la Asunción' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: 'Calle Providencia, 5 (Pza. Benimaclet)',
    phone: '96 193 18 61',
    email: '',
    hours: 'L a V (13:30 a 14:00), S y D (11:00 a 12:00)',
    coordinates: { lat: 39.4849, lng: -0.3619 },
    updated: 'por confirmar'
  },
  {
    id: 'comida-11',
    categoryId: 'comida',
    name: { es: 'BANCO DE ACCIÓN SOLIDARIA (Banco de alimentos)', en: 'SOLIDARITY ACTION BANK (Food bank)', it: 'BANCO DI AZIONE SOLIDALE (Banco alimentare)', ar: 'بنك العمل التضامني (بنك الطعام)', fr: 'BANQUE D\'ACTION SOLIDAIRE (Banque alimentaire)' },
    description: { 
      es: 'Reparto de comida en zonas específicas', 
      en: 'Food distribution in specific areas', 
      it: 'Distribuzione di cibo in aree specifiche', 
      ar: 'توزيع الطعام في مناطق محددة', 
      fr: 'Distribution de nourriture dans des zones spécifiques' 
    },
    address: '',
    phone: '651 46 39 35',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  // --- DORMIR ---
  {
    id: 'albergues-1',
    categoryId: 'albergues',
    name: { es: 'CIDES', en: 'CIDES', it: 'CIDES', ar: 'سيدس', fr: 'CIDES' },
    description: { 
      es: 'Dirigido a inmigrantes recién llegados sin problemas de adicción (incluido alcoholismo) ni enfermedad mental diagnosticada (en caso contrario se los deriva al CAST). Gestionado por Servicio de primera acogida a personas inmigrantes (SPAI).', 
      en: 'Aimed at newly arrived immigrants without addiction problems (including alcoholism) or diagnosed mental illness (otherwise they are referred to CAST). Managed by the First Reception Service for Immigrants (SPAI).', 
      it: 'Rivolto a immigrati appena arrivati senza problemi di dipendenza (compreso l\'alcolismo) o malattia mentale diagnosticata (altrimenti vengono indirizzati al CAST). Gestito dal Servizio di Prima Accoglienza per Immigrati (SPAI).', 
      ar: 'موجه للمهاجرين الوافدين حديثًا الذين لا يعانون من مشاكل إدمان (بما في ذلك إدمان الكحول) أو أمراض عقلية مشخصة (وإلا يتم إحالتهم إلى CAST). تديره خدمة الاستقبال الأول للمهاجرين (SPAI).', 
      fr: 'Destiné aux immigrants nouvellement arrivés sans problèmes de dépendance (y compris l\'alcoolisme) ni de maladie mentale diagnostiquée (sinon ils sont orientés vers le CAST). Géré par le Service de premier accueil pour les immigrants (SPAI).' 
    },
    address: 'Carrer del Pou, s/n 46008, València',
    phone: '962 08 74 23',
    email: 'cai.pangea.spai@valencia.es',
    hours: '',
    coordinates: { lat: 39.4769, lng: -0.3764 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-2',
    categoryId: 'albergues',
    name: { es: 'CENTRE DE NIT SAN ESTEBAN', en: 'SAN ESTEBAN NIGHT CENTER', it: 'CENTRO NOTTURNO SAN ESTEBAN', ar: 'مركز سان إستيبان الليلي', fr: 'CENTRE DE NUIT SAN ESTEBAN' },
    description: { 
      es: 'Corta estancia. 20 plazas. Gestionado por Cáritas.', 
      en: 'Short stay. 20 places. Managed by Cáritas.', 
      it: 'Soggiorno breve. 20 posti. Gestito da Cáritas.', 
      ar: 'إقامة قصيرة. 20 مكانًا. تديره كاريتاس.', 
      fr: 'Court séjour. 20 places. Géré par Cáritas.' 
    },
    address: 'Sede: Plaza Cisneros, 5 (Torres de Serranos), Centro Mambre: C/ Alcañiz 57',
    phone: '',
    email: 'caritasvalencia@caritas.es',
    hours: 'Sin horario fijo',
    coordinates: { lat: 39.4792, lng: -0.3761 },
    updated: '30.05.24'
  },
  {
    id: 'albergues-3',
    categoryId: 'albergues',
    name: { es: 'SAN JUAN DE DIOS', en: 'SAN JUAN DE DIOS', it: 'SAN JUAN DE DIOS', ar: 'سان خوان دي ديوس', fr: 'SAINT JEAN DE DIEU' },
    description: { 
      es: 'Sólo hombres. Centro de alta exigencia. Derivaciones por CAST. Gestionado por San juan de Dios.', 
      en: 'Men only. High-demand center. Referrals by CAST. Managed by San Juan de Dios.', 
      it: 'Solo uomini. Centro ad alta richiesta. Invii tramite CAST. Gestito da San Juan de Dios.', 
      ar: 'للرجال فقط. مركز عالي المتطلبات. إحالات من CAST. تديره سان خوان دي ديوس.', 
      fr: 'Hommes seulement. Centre à haute exigence. Références par CAST. Géré par San Juan de Dios.' 
    },
    address: 'C/Luz Casanova, 8',
    phone: '96 366 50 70',
    email: 'manuel.rodilla@sjd.es',
    hours: '',
    coordinates: { lat: 39.4856, lng: -0.3895 },
    updated: '30.05.24'
  },
  {
    id: 'albergues-4',
    categoryId: 'albergues',
    name: { es: 'CAES de SANTA CRUZ DE TENERIFE', en: 'CAES of SANTA CRUZ DE TENERIFE', it: 'CAES di SANTA CRUZ DE TENERIFE', ar: 'CAES de SANTA CRUZ DE TENERIFE', fr: 'CAES de SANTA CRUZ DE TENERIFE' },
    description: { 
      es: '15 plazas. Gestionado por Cruz Roja.', 
      en: '15 places. Managed by Red Cross.', 
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
    id: 'albergues-5',
    categoryId: 'albergues',
    name: { es: 'ALBERGUE PETXINA (Casa Caridad)', en: 'PETXINA HOSTEL (Casa Caridad)', it: 'OSTELLO PETXINA (Casa Caridad)', ar: 'نزل بيتكسينا (كاسا كاريداد)', fr: 'AUBERGE PETXINA (Casa Caridad)' },
    description: { 
      es: '75 plazas. Derivaciones por CAST. Gestionado por Asociación Valenciana de la Caridad (AVC).', 
      en: '75 places. Referrals by CAST. Managed by Valencian Charity Association (AVC).', 
      it: '75 posti. Invii tramite CAST. Gestito dall\'Associazione Valenciana della Carità (AVC).', 
      ar: '75 مكانًا. إحالات من CAST. تديره جمعية بلنسية الخيرية (AVC).', 
      fr: '75 places. Références par CAST. Géré par l\'Association Valencienne de la Charité (AVC).' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'albergues-6',
    categoryId: 'albergues',
    name: { es: 'ALBERGUE BENICALAP', en: 'BENICALAP HOSTEL', it: 'OSTELLO BENICALAP', ar: 'نزل بنيكلاب', fr: 'AUBERGE BENICALAP' },
    description: { 
      es: '65 plazas. Derivaciones por CAST. Gestionado por Asociación Valenciana de la Caridad (AVC).', 
      en: '65 places. Referrals by CAST. Managed by Valencian Charity Association (AVC).', 
      it: '65 posti. Invii tramite CAST. Gestito dall\'Associazione Valenciana della Carità (AVC).', 
      ar: '65 مكانًا. إحالات من CAST. تديره جمعية بلنسية الخيرية (AVC).', 
      fr: '65 places. Références par CAST. Géré par l\'Association Valencienne de la Charité (AVC).' 
    },
    address: 'Paseo de la Pechina, 9.',
    phone: '96 391 17 26 / 96 392 14 30',
    email: '',
    hours: '',
    coordinates: { lat: 39.4746, lng: -0.3934 },
    updated: '30.05.24'
  },
  {
    id: 'albergues-7',
    categoryId: 'albergues',
    name: { es: 'OBRA MERCEDARIA DE VALENCIA', en: 'MERCEDARIAN WORK OF VALENCIA', it: 'OPERA MERCEDARIA DI VALENCIA', ar: 'عمل مرسيدس فالنسيا', fr: 'ŒUVRE MERCÉDAIRE DE VALENCE' },
    description: { 
      es: 'Derivados desde prisión o desde las Unidades y Centros de Asistencia a drogodependencias. También centro baja exigencia a personas sin hogar.', 
      en: 'Referred from prison or from Drug Addiction Assistance Units and Centers. Also a low-demand center for homeless people.', 
      it: 'Indirizzati dal carcere o dalle Unità e Centri di Assistenza per le tossicodipendenze. Anche un centro a bassa soglia per persone senza fissa dimora.', 
      ar: 'محالون من السجن أو من وحدات ومراكز المساعدة في إدمان المخدرات. وهو أيضًا مركز منخفض المتطلبات للمشردين.', 
      fr: 'Référés de prison ou des Unités et Centres d\'Assistance aux toxicomanes. Également un centre à bas seuil pour les sans-abri.' 
    },
    address: 'Calle Turia, 58 bajo.',
    phone: '96 392 49 02',
    email: '',
    hours: '',
    coordinates: { lat: 39.4772, lng: -0.3861 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-8',
    categoryId: 'albergues',
    name: { es: 'CASAL DE LA PAU/DOMUS PACIS', en: 'CASAL DE LA PAU/DOMUS PACIS', it: 'CASAL DE LA PAU/DOMUS PACIS', ar: 'كاسال دي لا باو/دوموس باسيس', fr: 'CASAL DE LA PAU/DOMUS PACIS' },
    description: { 
      es: 'Gestionado por CAST. Alojamiento por enfermedad en fase terminal de personas que están en Centros Penitenciarios o son ex-reclusas.', 
      en: 'Managed by CAST. Accommodation for terminally ill people who are in prisons or are ex-inmates.', 
      it: 'Gestito da CAST. Alloggio per malati terminali che si trovano in istituti penitenziari o sono ex detenuti.', 
      ar: 'تديره CAST. سكن للمرضى الميؤوس من شفائهم الذين يقيمون في السجون أو هم سجناء سابقون.', 
      fr: 'Géré par le CAST. Hébergement pour les personnes en phase terminale de maladie qui sont en prison ou sont d\'anciens détenus.' 
    },
    address: 'C/ En Llopis, 4',
    phone: '96 391 54 29',
    email: '',
    hours: '',
    coordinates: { lat: 39.4789, lng: -0.3794 },
    updated: '11.01.21'
  },
  {
    id: 'albergues-9',
    categoryId: 'albergues',
    name: { es: 'EL CARME', en: 'EL CARME', it: 'EL CARME', ar: 'الكارمي', fr: 'EL CARME' },
    description: { 
      es: '10 plazas (8 de hombre y 2 de mujer). Gestionado por Fundación Salud y Comunidad (FSyC).', 
      en: '10 places (8 for men and 2 for women). Managed by Health and Community Foundation (FSyC).', 
      it: '10 posti (8 per uomini e 2 for donne). Gestito dalla Fondazione Salute e Comunità (FSyC).', 
      ar: '10 أماكن (8 للرجال و 2 للنساء). تديره مؤسسة الصحة والمجتمع (FSyC).', 
      fr: '10 places (8 pour hommes et 2 pour femmes). Géré par la Fondation Santé et Communauté (FSyC).' 
    },
    address: 'Junto al CAST',
    phone: '962 082 766',
    email: 'dir.elcarme@fsyc.org',
    hours: '',
    coordinates: { lat: 39.4774, lng: -0.3775 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-10',
    categoryId: 'albergues',
    name: { es: 'EL MUSSOL', en: 'EL MUSSOL', it: 'EL MUSSOL', ar: 'الموسول', fr: 'EL MUSSOL' },
    description: { 
      es: '15 plazas. Gestionado por Fundación Salud y Comunidad (FSyC).', 
      en: '15 places. Managed by Health and Community Foundation (FSyC).', 
      it: '15 posti. Gestito dalla Fondazione Salute e Comunità (FSyC).', 
      ar: '15 مكانًا. تديره مؤسسة الصحة والمجتمع (FSyC).', 
      fr: '15 places. Géré par la Fondation Santé et Communauté (FSyC).' 
    },
    address: '',
    phone: '963 777 390',
    email: 'valencia@fsyc.org',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-11',
    categoryId: 'albergues',
    name: { es: 'CONVENTO Y PISOS TORRENT', en: 'CONVENT AND FLATS TORRENT', it: 'CONVENTO E APPARTAMENTI TORRENT', ar: 'دير وشقق تورنت', fr: 'COUVENT ET APPARTEMENTS TORRENT' },
    description: { 
      es: '24 y 22 plazas. Gestionado por Fundación Amigó.', 
      en: '24 and 22 places. Managed by Amigó Foundation.', 
      it: '24 e 22 posti. Gestito dalla Fondazione Amigó.', 
      ar: '24 و 22 مكانًا. تديره مؤسسة أميغو.', 
      fr: '24 et 22 places. Géré par la Fondation Amigó.' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-12',
    categoryId: 'albergues',
    name: { es: 'CASA PETER MAURIN', en: 'PETER MAURIN HOUSE', it: 'CASA PETER MAURIN', ar: 'منزل بيتر مورين', fr: 'MAISON PETER MAURIN' },
    description: { 
      es: 'Casa de Acogida para Trabajadores Inmigrantes (subsaharianos). Derivaciones por CAST. Gestionado por ISO.', 
      en: 'Shelter for Immigrant Workers (sub-Saharan). Referrals by CAST. Managed by ISO.', 
      it: 'Casa di accoglienza per lavoratori immigrati (subsahariani). Invii da parte del CAST. Gestito da ISO.', 
      ar: 'مأوى للعمال المهاجرين (من جنوب الصحراء الكبرى). إحالات من CAST. تديره ISO.', 
      fr: 'Foyer pour travailleurs immigrés (subsahariens). Références par le CAST. Géré par ISO.' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-13',
    categoryId: 'albergues',
    name: { es: 'CASA DOROTHY DAY', en: 'DOROTHY DAY HOUSE', it: 'CASA DOROTHY DAY', ar: 'منزل دوروثي داي', fr: 'MAISON DOROTHY DAY' },
    description: { 
      es: 'Casa de Acogida para Mujeres Inmigrantes. Derivaciones por CAST. Gestionado por ISO.', 
      en: 'Shelter for Immigrant Women. Referrals by CAST. Managed by ISO.', 
      it: 'Casa di accoglienza per donne immigrate. Invii da parte del CAST. Gestito da ISO.', 
      ar: 'مأوى للنساء المهاجرات. إحالات من CAST. تديره ISO.', 
      fr: 'Foyer pour femmes immigrées. Références par le CAST. Géré par ISO.' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-14',
    categoryId: 'albergues',
    name: { es: 'RESIDENCIA "JUANA MARÍA"', en: '"JUANA MARÍA" RESIDENCE', it: 'RESIDENZA "JUANA MARÍA"', ar: 'سكن "خوانا ماريا"', fr: 'RÉSIDENCE "JUANA MARÍA"' },
    description: { 
      es: 'Casa de Acogida para Mujeres. Derivaciones por CAST. Gestionado por Esclavas de María.', 
      en: 'Shelter for Women. Referrals by CAST. Managed by Esclavas de María.', 
      it: 'Casa di accoglienza per donne. Invii da parte del CAST. Gestito da Esclavas de María.', 
      ar: 'مأوى للنساء. إحالات من CAST. تديره Esclavas de María.', 
      fr: 'Foyer pour femmes. Références par le CAST. Géré par Esclavas de María.' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '22.11.21'
  },
  {
    id: 'albergues-15',
    categoryId: 'albergues',
    name: { es: 'CEPAIM', en: 'CEPAIM', it: 'CEPAIM', ar: 'سيبايم', fr: 'CEPAIM' },
    description: { 
      es: 'Ayudas de alojamiento temporal (máximo 2 meses).', 
      en: 'Temporary accommodation aid (maximum 2 months).', 
      it: 'Aiuti per l\'alloggio temporaneo (massimo 2 mesi).', 
      ar: 'مساعدات سكن مؤقت (بحد أقصى شهرين).', 
      fr: 'Aide au logement temporaire (maximum 2 mois).' 
    },
    address: 'C/ Marqués de Campo, 16, Bajo izq.',
    phone: '963 92 53 02',
    email: 'gorettiruiz@cepaim.org',
    hours: '',
    coordinates: { lat: 39.4665, lng: -0.3802 },
    updated: '05.12.22'
  },
  // --- ROPA ---
  {
    id: 'ropa-1',
    categoryId: 'ropa',
    name: { es: 'CÁRITAS', en: 'CÁRITAS', it: 'CÁRITAS', ar: 'كاريتاس', fr: 'CÁRITAS' },
    description: { 
      es: 'Al contactarlos te derivan a una parroquia a la que poder acudir, según la zona, o a su sede de la Plaza Cisneros.', 
      en: 'When you contact them, they will refer you to a parish you can go to, depending on the area, or to their headquarters in Plaza Cisneros.', 
      it: 'Quando li contatti, ti indirizzeranno a una parrocchia a cui puoi rivolgerti, a seconda della zona, o alla loro sede in Plaza Cisneros.', 
      ar: 'عند الاتصال بهم، سيحيلونك إلى أبرشية يمكنك الذهاب إليها، حسب المنطقة، أو إلى مقرهم الرئيسي في بلازا سيسنيروس.', 
      fr: 'Lorsque vous les contactez, ils vous orienteront vers une paroisse où vous pourrez vous rendre, en fonction du quartier, ou vers leur siège sur la Plaza Cisneros.' 
    },
    address: 'Sede: Plaza Cisneros, 5 (Torres de Serranos), Centro Mambre: C/ Alcañiz 57',
    phone: 'Sede: 96 391 92 05, Centro Mambre: 963 66 64 92',
    email: 'caritasvalencia@caritas.es',
    hours: 'L a V (9:00 a 14:00 y de 16:00 a 19:30)',
    coordinates: { lat: 39.4792, lng: -0.3761 },
    updated: '30.05.24'
  },
  {
    id: 'ropa-2',
    categoryId: 'ropa',
    name: { es: 'MISIÓN URBANA', en: 'URBAN MISSION', it: 'MISSIONE URBANA', ar: 'البعثة الحضرية', fr: 'MISSION URBAINE' },
    description: { 
      es: 'Ropero y mantas (condicionadas al servicio de higiene personal). *funciona con cita previa (pero se puede llamar desde Bokatas y dar el nombre de la persona que acudirá)', 
      en: 'Wardrobe and blankets (conditional on personal hygiene service). *by appointment (but you can call from Bokatas and give the name of the person who will attend)', 
      it: 'Guardaroba e coperte (subordinato al servizio di igiene personale). *su appuntamento (ma si può chiamare da Bokatas e dare il nome della persona che parteciperà)', 
      ar: 'خزانة ملابس وبطانيات (مشروطة بخدمة النظافة الشخصية). *عن طريق موعد (ولكن يمكنك الاتصال من بوكاتاس وإعطاء اسم الشخص الذي سيحضر)', 
      fr: 'Garde-robe et couvertures (conditionnelles au service d\'hygiène personnelle). *sur rendez-vous (mais vous pouvez appeler de Bokatas et donner le nom de la personne qui se présentera)' 
    },
    address: 'C/ Roger de Flor, 15',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'L, Mx y V (9:30 a 12:30), M (16:30 a 18:30)',
    coordinates: { lat: 39.4715, lng: -0.3809 },
    updated: '30.05.24'
  },
  {
    id: 'ropa-3',
    categoryId: 'ropa',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Dirigido exclusivamente a drogodependientes en activo. VIH+/SIDA.', 
      en: 'Exclusively for active drug addicts. HIV+/AIDS.', 
      it: 'Esclusivamente per tossicodipendenti attivi. HIV+/AIDS.', 
      ar: 'حصرياً للمدمنين النشطين. فيروس نقص المناعة البشرية / الإيدز.', 
      fr: 'Exclusivement pour les toxicomanes actifs. VIH+/SIDA.' 
    },
    address: 'C/ Campos Crespo, 39',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 39.4475, lng: -0.3888 },
    updated: '20.01.21'
  },
  {
    id: 'ropa-4',
    categoryId: 'ropa',
    name: { es: 'Comité Ciudadano Antisida - CIBE MARÍTIM', en: 'Anti-AIDS Citizens\' Committee - CIBE MARÍTIM', it: 'Comitato cittadino anti-AIDS - CIBE MARÍTIM', ar: 'لجنة المواطنين لمكافحة الإيدز - CIBE MARÍTIM', fr: 'Comité citoyen anti-SIDA - CIBE MARÍTIM' },
    description: { 
      es: 'Centro de día que proporciona a sus usuarios alimentación, ducha y ropero. Dirigido exclusivamente a drogodependientes en activo.', 
      en: 'Day center that provides its users with food, showers and a wardrobe. Exclusively for active drug addicts.', 
      it: 'Centro diurno che fornisce ai suoi utenti cibo, docce e un guardaroba. Esclusivamente per tossicodipendenti attivi.', 
      ar: 'مركز نهاري يوفر لمستخدميه الطعام والاستحمام وخزانة ملابس. حصرياً للمدمنين النشطين.', 
      fr: 'Centre de jour qui fournit à ses usagers de la nourriture, des douches et une garde-robe. Exclusivement pour les toxicomanes actifs.' 
    },
    address: 'Calle Barraca, 290 (Malvarrosa)',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:00)',
    coordinates: { lat: 39.4754, lng: -0.3299 },
    updated: '30.05.24'
  },
  {
    id: 'ropa-5',
    categoryId: 'ropa',
    name: { es: 'OTROS', en: 'OTHERS', it: 'ALTRI', ar: 'آخرون', fr: 'AUTRES' },
    description: { 
      es: 'Otras entidades también propocionan ropa y otros suministros, pero solo a usuarios que sean parte de algún programa: CEPAIM; Casal de la Pau; Asociación Natania (Rehoboth); Casa Caridad...', 
      en: 'Other entities also provide clothing and other supplies, but only to users who are part of a program: CEPAIM; Casal de la Pau; Natania Association (Rehoboth); Casa Caridad...', 
      it: 'Altre entità forniscono anche abbigliamento e altre forniture, ma solo agli utenti che fanno parte di un programma: CEPAIM; Casal de la Pau; Associazione Natania (Rehoboth); Casa Caridad...', 
      ar: 'تقدم كيانات أخرى أيضًا ملابس وإمدادات أخرى، ولكن فقط للمستخدمين الذين هم جزء من برنامج: CEPAIM؛ كاسال دي لا باو؛ جمعية ناتانيا (رحوبوت)؛ كاسا كاريداد...', 
      fr: 'D\'autres entités fournissent également des vêtements et d\'autres fournitures, mais uniquement aux utilisateurs faisant partie d\'un programme : CEPAIM ; Casal de la Pau ; Association Natania (Rehoboth) ; Casa Caridad...' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '*Consultar los datos de cada entidad en el resto de apartados',
    coordinates: { lat: 0, lng: 0 },
    updated: '24.05.21'
  },
  // --- SALUD ---
  {
    id: 'salud-1',
    categoryId: 'salud',
    name: { es: 'MÉDICOS DEL MUNDO', en: 'DOCTORS OF THE WORLD', it: 'MEDICI DEL MONDO', ar: 'أطباء العالم', fr: 'MÉDECINS DU MONDE' },
    description: { 
      es: 'Atención sanitaria básica. Personal de psicología y psiquiatría. SIP (Derivación para ambulatorio correspondiente). Todos los servicios se gestionan por turnos y se dan de forma integral (comida, duchas, consigna de medicamentos...)', 
      en: 'Basic health care. Psychology and psychiatry staff. SIP (Referral to corresponding outpatient clinic). All services are managed in shifts and are provided comprehensively (food, showers, medication storage...)', 
      it: 'Assistenza sanitaria di base. Personale di psicologia e psichiatria. SIP (Rinvio all\'ambulatorio corrispondente). Tutti i servizi sono gestiti a turni e vengono forniti in modo completo (cibo, docce, deposito farmaci...)', 
      ar: 'رعاية صحية أساسية. طاقم علم نفس وطب نفسي. SIP (إحالة إلى العيادة الخارجية المقابلة). تتم إدارة جميع الخدمات بنظام المناوبات ويتم توفيرها بشكل شامل (طعام، حمامات، تخزين أدوية...)', 
      fr: 'Soins de santé de base. Personnel de psychologie et de psychiatrie. SIP (Orientation vers la clinique externe correspondante). Tous les services sont gérés par quarts de travail et sont fournis de manière complète (nourriture, douches, stockage de médicaments...)' 
    },
    address: 'C/ del doctor Monserrat nº1',
    phone: '96 391 97 23',
    email: 'valencia@medicosdelmundo.org',
    hours: 'L a J (12:30, 14:00, 16:00, 17:30), V de 11h a 13h (solo mujeres)',
    coordinates: { lat: 39.4665, lng: -0.3887 },
    updated: '30.05.24'
  },
  {
    id: 'salud-2',
    categoryId: 'salud',
    name: { es: 'Comité Ciudadano Antisida - CIBE MARÍTIM', en: 'Anti-AIDS Citizens\' Committee - CIBE MARÍTIM', it: 'Comitato cittadino anti-AIDS - CIBE MARÍTIM', ar: 'لجنة المواطنين لمكافحة الإيدز - CIBE MARÍTIM', fr: 'Comité citoyen anti-SIDA - CIBE MARÍTIM' },
    description: { 
      es: 'Atención psico-sanitaria (consultar ficha). Diagnóstico de VIH, Hepatitis C y Sífilis. Programas de tratamiento de metadona. Actividades ocupacionales y de ocio.', 
      en: 'Psycho-sanitary care (see file). Diagnosis of HIV, Hepatitis C and Syphilis. Methadone treatment programs. Occupational and leisure activities.', 
      it: 'Assistenza psico-sanitaria (vedi scheda). Diagnosi di HIV, Epatite C e Sifilide. Programmi di trattamento con metadone. Attività occupazionali e ricreative.', 
      ar: 'رعاية نفسية صحية (انظر الملف). تشخيص فيروس نقص المناعة البشرية والتهاب الكبد C والزهري. برامج علاج الميثادون. أنشطة مهنية وترفيهية.', 
      fr: 'Soins psycho-sanitaires (voir fiche). Diagnostic du VIH, de l\'hépatite C et de la syphilis. Programmes de traitement à la méthadone. Activités professionnelles et de loisirs.' 
    },
    address: 'Calle Barraca, 290 (Malvarrosa)',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:00)',
    coordinates: { lat: 39.4754, lng: -0.3299 },
    updated: '30.05.24'
  },
  {
    id: 'salud-3',
    categoryId: 'salud',
    name: { es: 'SALUD Y COMUNIDAD', en: 'HEALTH AND COMMUNITY', it: 'SALUTE E COMUNITÀ', ar: 'الصحة والمجتمع', fr: 'SANTÉ ET COMMUNAUTÉ' },
    description: { 
      es: 'Dirigido a drogodependientes en activo. VIH+/SIDA. Atención médica, de trabajo social y psicológica.', 
      en: 'Aimed at active drug addicts. HIV+/AIDS. Medical, social work and psychological care.', 
      it: 'Rivolto a tossicodipendenti attivi. HIV+/AIDS. Assistenza medica, sociale e psicologica.', 
      ar: 'موجه للمدمنين النشطين. فيروس نقص المناعة البشرية / الإيدز. رعاية طبية واجتماعية ونفسية.', 
      fr: 'Destiné aux toxicomanes actifs. VIH+/SIDA. Soins médicaux, travail social et psychologique.' 
    },
    address: 'C/ Campos Crespo, 39',
    phone: '96 377 73 90',
    email: 'valencia@fsyc.org',
    hours: 'L a V (10:00 a 16:00)',
    coordinates: { lat: 39.4475, lng: -0.3888 },
    updated: '20.01.21'
  },
  {
    id: 'salud-4',
    categoryId: 'salud',
    name: { es: 'URGENCIAS', en: 'EMERGENCIES', it: 'EMERGENZE', ar: 'الطوارئ', fr: 'URGENCES' },
    description: { es: '112 (Emergencias), 016 (Violencia de género), 061 (Emergencia sanitaria)', en: '112 (Emergencies), 016 (Gender violence), 061 (Health emergency)', it: '112 (Emergenze), 016 (Violenza di genere), 061 (Emergenza sanitaria)', ar: '112 (الطوارئ)، 016 (العنف ضد المرأة)، 061 (الطوارئ الصحية)', fr: '112 (Urgences), 016 (Violence de genre), 061 (Urgence sanitaire)' },
    address: '',
    phone: '112 / 016 / 061',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'salud-5',
    categoryId: 'salud',
    name: { es: 'UCAs (Unidades de Conductas Adictivas)', en: 'UCAs (Addictive Behavior Units)', it: 'UCAs (Unità di Comportamento Addittivo)', ar: 'UCAs (وحدات السلوك الإدماني)', fr: 'UCAs (Unités de comportements addictifs)' },
    description: { 
      es: 'Por derivación a través del trabajador social del hospital.', 
      en: 'By referral through the hospital social worker.', 
      it: 'Su segnalazione dell\'assistente sociale dell\'ospedale.', 
      ar: 'عن طريق الإحالة من خلال الأخصائي الاجتماعي في المستشفى.', 
      fr: 'Sur recommandation de l\'assistant social de l\'hôpital.' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'salud-6',
    categoryId: 'salud',
    name: { es: 'Asociación AVANT', en: 'AVANT Association', it: 'Associazione AVANT', ar: 'جمعية أفانت', fr: 'Association AVANT' },
    description: { 
      es: 'Grupos de terapias (derivados por UCAs) a personas con conductas adictivas. Orientación telefónica a familias (y/o personas allegadas).', 
      en: 'Therapy groups (referred by UCAs) for people with addictive behaviors. Telephone counseling for families (and/or close friends).', 
      it: 'Gruppi di terapia (segnalati da UCAs) per persone con comportamenti di dipendenza. Consulenza telefonica per le famiglie (e/o persone care).', 
      ar: 'مجموعات علاجية (محالة من قبل UCAs) للأشخاص الذين يعانون من سلوكيات إدمانية. إرشاد هاتفي للعائلات (و/أو المقربين).', 
      fr: 'Groupes de thérapie (référés par les UCA) pour les personnes ayant des comportements addictifs. Conseil téléphonique pour les familles (et/ou les proches).' 
    },
    address: 'C/ Artes Gráficas, nº 25, pta 2. 4',
    phone: '96 346 29 67',
    email: 'avant@asocavant.org',
    hours: 'L a V (9:00 a 20:00)',
    coordinates: { lat: 39.4728, lng: -0.3540 },
    updated: '20.01.21'
  },
  {
    id: 'salud-7',
    categoryId: 'salud',
    name: { es: 'FUNDACIÓN ODONTOLOGIA SOLIDARIA', en: 'SOLIDARITY DENTISTRY FOUNDATION', it: 'FONDAZIONE ODONTOIATRIA SOLIDALE', ar: 'مؤسسة طب الأسنان التضامنية', fr: 'FONDATION DENTISTERIE SOLIDAIRE' },
    description: { 
      es: 'Higiene bucal, obturaciones, endodoncias, prótesis removibles... No se atienden urgencias, derivación mediante la Seguridad Social. No realiza tratamientos estéticos, ortodónticos ni implantes. Se paga una cantidad simbólica de 15€ por visita.', 
      en: 'Oral hygiene, fillings, endodontics, removable prostheses... Emergencies are not treated, referral through Social Security. Does not perform aesthetic, orthodontic or implant treatments. A symbolic amount of €15 per visit is paid.', 
      it: 'Igiene orale, otturazioni, endodonzia, protesi rimovibili... Le emergenze non vengono trattate, rinvio tramite la Sicurezza Sociale. Non esegue trattamenti estetici, ortodontici o implantari. Si paga un importo simbolico di 15 € a visita.', 
      ar: 'نظافة الفم، حشوات، علاج جذور الأسنان، أطقم أسنان قابلة للإزالة... لا يتم علاج حالات الطوارئ، الإحالة عن طريق الضمان الاجتماعي. لا يتم إجراء علاجات تجميلية أو تقويمية أو زراعة أسنان. يتم دفع مبلغ رمزي قدره 15 يورو لكل زيارة.', 
      fr: 'Hygiène bucco-dentaire, obturations, endodontie, prothèses amovibles... Les urgences ne sont pas traitées, orientation par la Sécurité Sociale. Ne réalise pas de traitements esthétiques, orthodontiques ou implantaires. Un montant symbolique de 15 € par visite est payé.' 
    },
    address: 'Calle Balmes, 23',
    phone: '96 315 46 09',
    email: 'odvalencia@odsolidaria.org',
    hours: '',
    coordinates: { lat: 39.4735, lng: -0.3794 },
    updated: '20.03.21'
  },
  {
    id: 'salud-8',
    categoryId: 'salud',
    name: { es: 'Clínica Universitaria Odontológica', en: 'University Dental Clinic', it: 'Clinica Odontoiatrica Universitaria', ar: 'عيادة طب الأسنان الجامعية', fr: 'Clinique Dentaire Universitaire' },
    description: { 
      es: 'Por derivación del CAI y el tratamiento lo cubre la seguridad social. Rais puede derivar al CAI.', 
      en: 'By referral from the CAI and the treatment is covered by social security. Rais can refer to the CAI.', 
      it: 'Su segnalazione del CAI e il trattamento è coperto dalla sicurezza sociale. Rais può segnalare al CAI.', 
      ar: 'عن طريق الإحالة من CAI ويتم تغطية العلاج من قبل الضمان الاجتماعي. يمكن لـ Rais الإحالة إلى CAI.', 
      fr: 'Sur recommandation du CAI et le traitement est couvert par la sécurité sociale. Rais peut orienter vers le CAI.' 
    },
    address: 'C/Alfambra, 4',
    phone: '96 347 32 52',
    email: 'clinicaodontologica.valencia@universidadeuropea.es',
    hours: 'L a V (8:00 a 22:00) S (8:00 a 15:00)',
    coordinates: { lat: 39.4724, lng: -0.3619 },
    updated: '28.03.21'
  },
  // --- CLASES ESPAÑOL ---
  {
    id: 'clases-1',
    categoryId: 'clases',
    name: { es: 'ACCEM "Centro de día Blanquita"', en: 'ACCEM "Blanquita Day Center"', it: 'ACCEM "Centro diurno Blanquita"', ar: 'ACCEM "مركز بلانكيتا النهاري"', fr: 'ACCEM "Centre de jour Blanquita"' },
    description: { 
      es: 'Alfabetización, Español e Inglés. *específico usuarios del centro', 
      en: 'Literacy, Spanish and English. *specific to center users', 
      it: 'Alfabetizzazione, spagnolo e inglese. *specifico per gli utenti del centro', 
      ar: 'محو الأمية والإسبانية والإنجليزية. *خاص بمستخدمي المركز', 
      fr: 'Alphabétisation, espagnol et anglais. *spécifique aux utilisateurs du centre' 
    },
    address: 'C/Mossen Fenollar, 9',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'www.accem.es',
    hours: '',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '30.05.24'
  },
  {
    id: 'clases-2',
    categoryId: 'clases',
    name: { es: 'Sankofa - espai intercultural', en: 'Sankofa - intercultural space', it: 'Sankofa - spazio interculturale', ar: 'سانكوفا - مساحة بين الثقافات', fr: 'Sankofa - espace interculturel' },
    description: { es: 'Clases de español', en: 'Spanish classes', it: 'Corsi di spagnolo', ar: 'دروس اللغة الإسبانية', fr: 'Cours d\'espagnol' },
    address: 'C/ Beata Inés, 10',
    phone: '641 997 713',
    email: 'supervivientesaquarius@gmail.com',
    hours: 'M y Mx 16:00, V 10:15',
    coordinates: { lat: 39.4777, lng: -0.3789 },
    updated: '12.01.21'
  },
  {
    id: 'clases-3',
    categoryId: 'clases',
    name: { es: 'FUNDACIÓN MANO AMIGA', en: 'MANO AMIGA FOUNDATION', it: 'FONDAZIONE MANO AMIGA', ar: 'مؤسسة مانو أميغا', fr: 'FONDATION MANO AMIGA' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: 'C/ de l’arquitecte Tolsà, 9',
    phone: '96 366 36 16',
    email: '',
    hours: '',
    coordinates: { lat: 39.4938, lng: -0.3845 },
    updated: 'por confirmar'
  },
  {
    id: 'clases-4',
    categoryId: 'clases',
    name: { es: 'JARIT', en: 'JARIT', it: 'JARIT', ar: 'جاريت', fr: 'JARIT' },
    description: { 
      es: 'Clases de castellano, valenciano, alfabetización, informática, servicio jurídico, inserción socio-laboral.', 
      en: 'Spanish, Valencian, literacy, computer, legal service, socio-labor integration classes.', 
      it: 'Corsi di spagnolo, valenciano, alfabetizzazione, informatica, servizio legale, integrazione socio-lavorativa.', 
      ar: 'دروس اللغة الإسبانية، الفالنسية، محو الأمية، الكمبيوتر، الخدمات القانونية، الإدماج الاجتماعي والمهني.', 
      fr: 'Cours d\'espagnol, de valencien, d\'alphabétisation, d\'informatique, de service juridique, d\'insertion socio-professionnelle.' 
    },
    address: 'C/ Buenos aires, 10',
    phone: '96 380 50 76',
    email: 'https://www.facebook.com/asoc.jarit',
    hours: '',
    coordinates: { lat: 39.4614, lng: -0.3697 },
    updated: '02.04.21'
  },
  {
    id: 'clases-5',
    categoryId: 'clases',
    name: { es: 'TYRIUS', en: 'TYRIUS', it: 'TYRIUS', ar: 'تيريوس', fr: 'TYRIUS' },
    description: { 
      es: 'Cursos de español mañanas y tardes, distintos niveles.', 
      en: 'Spanish courses in the morning and afternoon, different levels.', 
      it: 'Corsi di spagnolo mattina e pomeriggio, diversi livelli.', 
      ar: 'دورات اللغة الإسبانية في الصباح وبعد الظهر، مستويات مختلفة.', 
      fr: 'Cours d\'espagnol le matin et l\'après-midi, différents niveaux.' 
    },
    address: 'C/ Conde Montornés, 20',
    phone: '96 351 59 93',
    email: '',
    hours: '',
    coordinates: { lat: 39.4729, lng: -0.3725 },
    updated: 'por confirmar'
  },
  {
    id: 'clases-6',
    categoryId: 'clases',
    name: { es: 'VALENCIA ACOGE', en: 'VALENCIA ACOGE', it: 'VALENCIA ACOGE', ar: 'فالنسيا أكوخي', fr: 'VALENCIA ACOGE' },
    description: { 
      es: 'Clases de idiomas a consultar según la demanda.', 
      en: 'Language classes available upon request.', 
      it: 'Corsi di lingua disponibili su richiesta.', 
      ar: 'دروس لغات متاحة عند الطلب.', 
      fr: 'Cours de langues disponibles sur demande.' 
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
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: 'C/ Arquitecto Rodríguez 21',
    phone: '96 360 33 30',
    email: '',
    hours: '',
    coordinates: { lat: 39.4912, lng: -0.3804 },
    updated: 'por confirmar'
  },
  {
    id: 'clases-8',
    categoryId: 'clases',
    name: { es: 'Comisión Española de Ayuda al Refugiado (CEAR)', en: 'Spanish Commission for Refugee Aid (CEAR)', it: 'Commissione Spagnola per l\'Aiuto ai Rifugiati (CEAR)', ar: 'اللجنة الإسبانية لمساعدة اللاجئين (CEAR)', fr: 'Commission Espagnole d\'Aide aux Réfugiés (CEAR)' },
    description: { 
      es: 'Clases de idiomas a consultar según la demanda.', 
      en: 'Language classes available upon request.', 
      it: 'Corsi di lingua disponibili su richiesta.', 
      ar: 'دروس لغات متاحة عند الطلب.', 
      fr: 'Cours de langues disponibles sur demande.' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '24.05.21'
  },
  // --- MUJER ---
  {
    id: 'mujer-1',
    categoryId: 'mujer',
    name: { es: 'VILLA TERESITA', en: 'VILLA TERESITA', it: 'VILLA TERESITA', ar: 'فيلا تيريسيتا', fr: 'VILLA TERESITA' },
    description: { 
      es: 'Específico para mujeres y familias. Especialistas en violencia de género y prostitución.', 
      en: 'Specifically for women and families. Specialists in gender violence and prostitution.', 
      it: 'Specifico per donne e famiglie. Specialisti in violenza di genere e prostituzione.', 
      ar: 'خاص بالنساء والعائلات. متخصصون في العنف ضد المرأة والبغاء.', 
      fr: 'Spécifique pour les femmes et les familles. Spécialistes de la violence de genre et de la prostitution.' 
    },
    address: 'C/ Balmes, 14',
    phone: '',
    email: 'https://villateresita.org/',
    hours: 'L a J (merienda)',
    coordinates: { lat: 39.4735, lng: -0.3794 },
    updated: ''
  },
  {
    id: 'mujer-2',
    categoryId: 'mujer',
    name: { es: 'CENTRO MUJER 24H', en: '24H WOMEN\'S CENTER', it: 'CENTRO DONNA 24H', ar: 'مركز المرأة 24 ساعة', fr: 'CENTRE FEMMES 24H' },
    description: { 
      es: 'Atención a mujeres víctimas de malos tratos físicos y/o psíquicos, agresiones y abusos sexuales. Atención integral (social, psicológica y jurídica).', 
      en: 'Care for women victims of physical and/or psychological abuse, sexual assault and abuse. Comprehensive care (social, psychological and legal).', 
      it: 'Assistenza alle donne vittime di abusi fisici e/o psicologici, aggressioni e abusi sessuali. Assistenza completa (sociale, psicologica e legale).', 
      ar: 'رعاية النساء ضحايا سوء المعاملة الجسدية و/أو النفسية والاعتداء والانتهاك الجنسي. رعاية شاملة (اجتماعية ونفسية وقانونية).', 
      fr: 'Prise en charge des femmes victimes de violences physiques et/ou psychologiques, d\'agressions et d\'abus sexuels. Prise en charge globale (sociale, psychologique et juridique).' 
    },
    address: 'C/ Guardia civil, 21',
    phone: '900 58 08 88',
    email: '',
    hours: '24h/365',
    coordinates: { lat: 39.4842, lng: -0.3621 },
    updated: ''
  },
  {
    id: 'mujer-3',
    categoryId: 'mujer',
    name: { es: 'RELIGIOSAS DE MARÍA INMACULADA', en: 'RELIGIOUS SISTERS OF MARY IMMACULATE', it: 'RELIGIOSE DI MARIA IMMACOLATA', ar: 'راهبات مريم الطاهرة', fr: 'RELIGIEUSES DE MARIE IMMACULÉE' },
    description: { 
      es: 'Inserción en servicio doméstico de mujeres inmigrantes en edad laboral.', 
      en: 'Integration into domestic service for immigrant women of working age.', 
      it: 'Integrazione nel servizio domestico per le donne immigrate in età lavorativa.', 
      ar: 'الاندماج في الخدمة المنزلية للنساء المهاجرات في سن العمل.', 
      fr: 'Intégration dans le service domestique des femmes immigrées en âge de travailler.' 
    },
    address: 'C/ Trinquete de Caballeros, 10',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 39.4751, lng: -0.3731 },
    updated: ''
  },
  {
    id: 'mujer-4',
    categoryId: 'mujer',
    name: { es: 'Asociación AVANT', en: 'AVANT Association', it: 'Associazione AVANT', ar: 'جمعية أفانت', fr: 'Association AVANT' },
    description: { 
      es: 'Atención a mujeres víctimas de violencia de género y conductas adictivas. Orientación psico-educativa y social.', 
      en: 'Care for women victims of gender violence and addictive behaviors. Psycho-educational and social guidance.', 
      it: 'Assistenza alle donne vittime di violenza di genere e comportamenti di dipendenza. Orientamento psico-educativo e sociale.', 
      ar: 'رعاية النساء ضحايا العنف ضد المرأة والسلوكيات الإدمانية. إرشاد نفسي تربوي واجتماعي.', 
      fr: 'Prise en charge des femmes victimes de violence de genre et de comportements addictifs. Orientation psycho-éducative et sociale.' 
    },
    address: 'C/ Artes Gráficas, nº 25, pta 2. 4',
    phone: '96 346 29 67',
    email: 'avant@asocavant.org',
    hours: 'L a V (9:00 a 20:00)',
    coordinates: { lat: 39.4728, lng: -0.3540 },
    updated: '20.01.21'
  },
  {
    id: 'mujer-5',
    categoryId: 'mujer',
    name: { es: 'MÉDICOS DEL MUNDO', en: 'DOCTORS OF THE WORLD', it: 'MEDICI DEL MONDO', ar: 'أطباء العالم', fr: 'MÉDECINS DU MONDE' },
    description: { 
      es: 'Viernes: exlusivo mujeres, sin necesidad de cita previa. Comida, duchas, tramitación del SIP, acompañamiento, atención sanitaria básica, personal psicología y psiquiatría.', 
      en: 'Friday: exclusively for women, no appointment necessary. Food, showers, SIP processing, accompaniment, basic health care, psychology and psychiatry staff.', 
      it: 'Venerdì: esclusivamente per donne, senza bisogno di appuntamento. Cibo, docce, elaborazione SIP, accompagnamento, assistenza sanitaria di base, personale di psicologia e psichiatria.', 
      ar: 'الجمعة: حصرياً للنساء، لا حاجة لموعد. طعام، حمامات، معالجة SIP، مرافقة، رعاية صحية أساسية، طاقم علم نفس وطب نفسي.', 
      fr: 'Vendredi : exclusivement pour les femmes, sans rendez-vous. Nourriture, douches, traitement SIP, accompagnement, soins de santé de base, personnel de psychologie et de psychiatrie.' 
    },
    address: 'C/ del doctor Monserrat nº1',
    phone: '96 391 97 23',
    email: 'valencia@medicosdelmundo.org',
    hours: 'V de 11h a 13h (solo mujeres)',
    coordinates: { lat: 39.4665, lng: -0.3887 },
    updated: '30.05.24'
  },
  {
    id: 'mujer-6',
    categoryId: 'mujer',
    name: { es: 'ACCEM "Centro de día Blanquita"', en: 'ACCEM "Blanquita Day Center"', it: 'ACCEM "Centro diurno Blanquita"', ar: 'ACCEM "مركز بلانكيتا النهاري"', fr: 'ACCEM "Centre de jour Blanquita"' },
    description: { 
      es: 'Miércoles: exclusivo para mujeres. Lavadoras, duchas, peluquería. *funciona con cita previa (los turnos se reparten a las 8am.) *se recomienda llamar y derivar desde Bokatas', 
      en: 'Wednesday: exclusively for women. Washing machines, showers, hairdressing. *by appointment (shifts are distributed at 8am.) *it is recommended to call and refer from Bokatas', 
      it: 'Mercoledì: esclusivamente per donne. Lavatrici, docce, parrucchiere. *su appuntamento (i turni sono distribuiti alle 8 del mattino.) *si consiglia di chiamare e fare riferimento da Bokatas', 
      ar: 'الأربعاء: حصرياً للنساء. غسالات، حمامات، تصفيف الشعر. *عن طريق موعد (يتم توزيع المناوبات في الساعة 8 صباحًا.) *يوصى بالاتصال والإحالة من بوكاتاس', 
      fr: 'Mercredi : exclusivement pour les femmes. Machines à laver, douches, coiffure. *sur rendez-vous (les quarts de travail sont distribués à 8h du matin.) *il est recommandé d\'appeler et de se référer à Bokatas' 
    },
    address: 'C/Mossen Fenollar, 9',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'vsimonm@accem.es',
    hours: 'L a V (9:00 a 13:00) Miércoles: exclusivo para mujeres',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '30.05.24'
  },
  {
    id: 'mujer-7',
    categoryId: 'mujer',
    name: { es: 'OTROS', en: 'OTHERS', it: 'ALTRI', ar: 'آخرون', fr: 'AUTRES' },
    description: { 
      es: 'Cruz roja, Proyecto Vivir, Alanna, Por ti mujer, Afavir, CAVAS, Xarxa (mujeres con diversidad cultural), CEPAIM (mujeres migrantes)', 
      en: 'Red Cross, Proyecto Vivir, Alanna, Por ti mujer, Afavir, CAVAS, Xarxa (women with cultural diversity), CEPAIM (migrant women)', 
      it: 'Croce Rossa, Proyecto Vivir, Alanna, Por ti mujer, Afavir, CAVAS, Xarxa (donne con diversità culturale), CEPAIM (donne migranti)', 
      ar: 'الصليب الأحمر، برويكتو فيفير، ألانا، بور تي موخير، أفافير، كافاس، زاركا (نساء من خلفيات ثقافية متنوعة)، سيبايم (نساء مهاجرات)', 
      fr: 'Croix-Rouge, Proyecto Vivir, Alanna, Por ti mujer, Afavir, CAVAS, Xarxa (femmes issues de la diversité culturelle), CEPAIM (femmes migrantes)' 
    },
    address: '',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  // --- ORIENTACIÓN SOCIOLABORAL ---
  {
    id: 'empleo-1',
    categoryId: 'empleo',
    name: { es: 'HOGAR SÍ', en: 'HOGAR SÍ', it: 'HOGAR SÍ', ar: 'هوغار سي', fr: 'HOGAR SÍ' },
    description: { 
      es: 'Para PSH en situación de regularidad y con interés en comenzar un proceso de búsqueda de empleo. Podemos derivar desde Bokatas y hacer acompañamiento.', 
      en: 'For homeless people in a regular situation and interested in starting a job search process. We can refer from Bokatas and provide support.', 
      it: 'Per le persone senza fissa dimora in situazione regolare e interessate ad avviare un processo di ricerca di lavoro. Possiamo fare riferimento da Bokatas e fornire supporto.', 
      ar: 'للمشردين في وضع نظامي والمهتمين ببدء عملية البحث عن عمل. يمكننا الإحالة من بوكاتاس وتقديم الدعم.', 
      fr: 'Pour les personnes sans-abri en situation régulière et intéressées à entamer un processus de recherche d\'emploi. Nous pouvons référer depuis Bokatas et fournir un soutien.' 
    },
    address: 'C/ Conde Trenor, 2',
    phone: '96 315 38 10 / 637 274 201',
    email: 'empleo.valencia@hogarsi.org',
    hours: 'Llamar para concretar cita',
    coordinates: { lat: 39.4795, lng: -0.3758 },
    updated: '07.11.22'
  },
  {
    id: 'empleo-2',
    categoryId: 'empleo',
    name: { es: 'CÁRITAS', en: 'CÁRITAS', it: 'CÁRITAS', ar: 'كاريتاس', fr: 'CÁRITAS' },
    description: { 
      es: 'Talleres ocupacionales. Consultar → ficha', 
      en: 'Occupational workshops. Consult → file', 
      it: 'Laboratori professionali. Consultare → scheda', 
      ar: 'ورش عمل مهنية. استشر → ملف', 
      fr: 'Ateliers professionnels. Consulter → fiche' 
    },
    address: 'Sede: Plaza Cisneros, 5 (Torres de Serranos), Centro Mambre: C/ Alcañiz 57',
    phone: 'Sede: 96 391 92 05, Centro Mambre: 963 66 64 92',
    email: 'caritasvalencia@caritas.es',
    hours: 'Sin horario fijo',
    coordinates: { lat: 39.4792, lng: -0.3761 },
    updated: '30.05.24'
  },
  {
    id: 'empleo-3',
    categoryId: 'empleo',
    name: { es: 'MISIÓN URBANA', en: 'URBAN MISSION', it: 'MISSIONE URBANA', ar: 'البعثة الحضرية', fr: 'MISSION URBAINE' },
    description: { 
      es: 'Sin cita previa. Imprescindible permiso de trabajo.', 
      en: 'No appointment necessary. Work permit required.', 
      it: 'Nessun appuntamento necessario. Permesso di lavoro richiesto.', 
      ar: 'لا حاجة لموعد. تصريح العمل مطلوب.', 
      fr: 'Aucun rendez-vous nécessaire. Permis de travail requis.' 
    },
    address: 'C/ Roger de Flor, 15',
    phone: '96 392 48 49 / 656 94 07 11',
    email: 'direccion@misionurbanavalencia.org',
    hours: 'J (9:30 a 12:30)',
    coordinates: { lat: 39.4715, lng: -0.3809 },
    updated: '05.11.22'
  },
  {
    id: 'empleo-4',
    categoryId: 'empleo',
    name: { es: 'CEPAIM', en: 'CEPAIM', it: 'CEPAIM', ar: 'سيبايم', fr: 'CEPAIM' },
    description: { 
      es: 'Programa de inserción sociolaboral en medio rural y programa laboral exclusivo para mujeres. (específico personas migrantes)', 
      en: 'Socio-laboral integration program in rural areas and exclusive labor program for women. (specific for migrants)', 
      it: 'Programma di integrazione socio-lavorativa in aree rurali e programma di lavoro esclusivo per le donne. (specifico per i migranti)', 
      ar: 'برنامج الإدماج الاجتماعي والمهني في المناطق الريفية وبرنامج العمل الحصري للنساء. (خاص بالمهاجرين)', 
      fr: 'Programme d\'intégration socio-professionnelle en milieu rural et programme de travail exclusif pour les femmes. (spécifique pour les migrants)' 
    },
    address: 'C/ Marqués de Campo, 16, Bajo izq.',
    phone: '963 92 53 02',
    email: 'gorettiruiz@cepaim.org',
    hours: 'L a J (9:00 a 14:00 / 16:00 a 18:30)',
    coordinates: { lat: 39.4665, lng: -0.3802 },
    updated: '05.12.22'
  },
  {
    id: 'empleo-5',
    categoryId: 'empleo',
    name: { es: 'ACCEM "Centro de día Blanquita"', en: 'ACCEM "Blanquita Day Center"', it: 'ACCEM "Centro diurno Blanquita"', ar: 'ACCEM "مركز بلانكيتا النهاري"', fr: 'ACCEM "Centre de jour Blanquita"' },
    description: { 
      es: 'Inserción laboral y asesoramiento. *funciona con cita previa (los turnos se reparten a las 8am.) o mediante derivación desde Bokatas', 
      en: 'Job placement and counseling. *by appointment (shifts are distributed at 8am.) or by referral from Bokatas', 
      it: 'Inserimento lavorativo e consulenza. *su appuntamento (i turni sono distribuiti alle 8 del mattino.) o su segnalazione di Bokatas', 
      ar: 'التوظيف والاستشارة. *عن طريق موعد (يتم توزيع المناوبات في الساعة 8 صباحًا.) أو عن طريق الإحالة من بوكاتاس', 
      fr: 'Placement et conseil en emploi. *sur rendez-vous (les quarts de travail sont distribués à 8h du matin.) ou sur recommandation de Bokatas' 
    },
    address: 'C/Mossen Fenollar, 9',
    phone: '96 367 39 94 / 96 349 69 77',
    email: 'www.accem.es',
    hours: 'L a V (9:00 a 13:00)',
    coordinates: { lat: 39.4624, lng: -0.3698 },
    updated: '05.11.22'
  },
  {
    id: 'empleo-6',
    categoryId: 'empleo',
    name: { es: 'ASOCIACIÓN ALANNA', en: 'ALANNA ASSOCIATION', it: 'ASSOCIAZIONE ALANNA', ar: 'جمعية ألانا', fr: 'ASSOCIATION ALANNA' },
    description: { 
      es: 'Específico para mujeres en situación de exclusión social y pobreza. Integración laboral en puestos de trabajo tales como: limpieza, servicios de conserjería, camareras de restauración, administrativas y auxiliares...', 
      en: 'Specifically for women in situations of social exclusion and poverty. Labor integration in jobs such as: cleaning, concierge services, restaurant waitresses, administrative and auxiliary staff...', 
      it: 'Specifico per le donne in situazioni di esclusione sociale e povertà. Integrazione lavorativa in posti di lavoro come: pulizie, servizi di portineria, cameriere di ristorante, personale amministrativo e ausiliario...', 
      ar: 'خاصة بالنساء في حالات الإقصاء الاجتماعي والفقر. الاندماج المهني في وظائف مثل: التنظيف، خدمات الكونسيرج، نادلات المطاعم، الموظفات الإداريات والمساعدات...', 
      fr: 'Spécifiquement pour les femmes en situation d\'exclusion sociale et de pauvreté. Intégration professionnelle dans des emplois tels que : nettoyage, services de conciergerie, serveuses de restaurant, personnel administratif et auxiliaire...' 
    },
    address: 'Plaza Fray Luis Colomer, 3',
    phone: '96 339 38 77',
    email: '',
    hours: '',
    coordinates: { lat: 39.4741, lng: -0.3524 },
    updated: 'por confirmar'
  },
  {
    id: 'empleo-7',
    categoryId: 'empleo',
    name: { es: 'Asociación para la Promocion e Inserción Profesional (APIP)', en: 'Association for Professional Promotion and Integration (APIP)', it: 'Associazione per la Promozione e l\'Integrazione Professionale (APIP)', ar: 'جمعية الترقية والاندماج المهني (APIP)', fr: 'Association pour la promotion et l\'insertion professionnelle (APIP)' },
    description: { 
      es: 'Programas de cualificación profesional inicial', 
      en: 'Initial professional qualification programs', 
      it: 'Programmi di qualificazione professionale iniziale', 
      ar: 'برامج التأهيل المهني الأولي', 
      fr: 'Programmes de qualification professionnelle initiale' 
    },
    address: 'C/ Roger de Flor, 13 (Guillem de Castro)',
    phone: '96 392 41 56',
    email: '',
    hours: '',
    coordinates: { lat: 39.4715, lng: -0.3809 },
    updated: 'por confirmar'
  },
  {
    id: 'empleo-8',
    categoryId: 'empleo',
    name: { es: 'RELIGIOSAS DE MARÍA INMACULADA', en: 'RELIGIOUS SISTERS OF MARY IMMACULATE', it: 'RELIGIOSE DI MARIA IMMACOLATA', ar: 'راهبات مريم الطاهرة', fr: 'RELIGIEUSES DE MARIE IMMACULÉE' },
    description: { 
      es: 'Inserción en servicio doméstico de mujeres inmigrantes en edad laboral, procedentes fundamentalmente de Latino-América', 
      en: 'Integration into domestic service for immigrant women of working age, mainly from Latin America', 
      it: 'Integrazione nel servizio domestico per le donne immigrate in età lavorativa, principalmente dall\'America Latina', 
      ar: 'الاندماج في الخدمة المنزلية للنساء المهاجرات في سن العمل، خاصة من أمريكا اللاتينية', 
      fr: 'Intégration dans le service domestique des femmes immigrées en âge de travailler, principalement d\'Amérique latine' 
    },
    address: 'C/ Trinquete de Caballeros, 10',
    phone: '96 391 50 82',
    email: '',
    hours: '',
    coordinates: { lat: 39.4751, lng: -0.3731 },
    updated: 'por confirmar'
  },
  {
    id: 'empleo-9',
    categoryId: 'empleo',
    name: { es: 'SERVEF', en: 'SERVEF', it: 'SERVEF', ar: 'سيرفيف', fr: 'SERVEF' },
    description: { es: 'Teléfono de información gratuita', en: 'Free information telephone', it: 'Telefono di informazione gratuito', ar: 'هاتف معلومات مجاني', fr: 'Téléphone d\'information gratuit' },
    address: '',
    phone: '900 100 785',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  // --- ORIENTACIÓN VIVIENDA ---
  {
    id: 'orientacion-1',
    categoryId: 'orientacion',
    name: { es: 'Oficina Municipal de INFOVIVIENDA SOLIDARIA', en: 'Municipal Office of INFOVIVIENDA SOLIDARIA', it: 'Ufficio Municipale di INFOVIVIENDA SOLIDARIA', ar: 'المكتب البلدي لـ INFOVIVIENDA SOLIDARIA', fr: 'Bureau Municipal de INFOVIVIENDA SOLIDARIA' },
    description: { 
      es: 'Búsqueda de vivienda a personas con especiales dificultades. Información sobre ayudas para viviendas de alquiler.', 
      en: 'Housing search for people with special difficulties. Information on rental housing aid.', 
      it: 'Ricerca di alloggi per persone con difficoltà speciali. Informazioni sugli aiuti per l\'affitto di alloggi.', 
      ar: 'البحث عن سكن للأشخاص الذين يعانون من صعوبات خاصة. معلومات عن مساعدات الإسكان الإيجاري.', 
      fr: 'Recherche de logement pour les personnes ayant des difficultés particulières. Informations sur les aides au logement locatif.' 
    },
    address: 'C/ Amadeo de Saboya, 11 Patio A',
    phone: '96 208 24 40',
    email: 'infoviviendasolidaria@valencia.es',
    hours: 'L a V (9:30 a 13:30)',
    coordinates: { lat: 39.4761, lng: -0.3615 },
    updated: '22.11.21'
  },
  {
    id: 'orientacion-2',
    categoryId: 'orientacion',
    name: { es: 'BUSCADOR DE ALQUILERES', en: 'RENTAL FINDER', it: 'TROVA AFFITTI', ar: 'باحث عن الإيجارات', fr: 'CHERCHEUR DE LOCATIONS' },
    description: { es: 'Servicio público', en: 'Public service', it: 'Servizio pubblico', ar: 'خدمة عامة', fr: 'Service public' },
    address: '',
    phone: '',
    email: 'http://www.redalquila.gva.es/va/buscador-de-viviendas-67360',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  // --- EXTRANJERÍA Y ASESORIA JURIDICA ---
  {
    id: 'juridico-1',
    categoryId: 'juridico',
    name: { es: 'Centros municipales de servicios sociales', en: 'Municipal social service centers', it: 'Centri comunali di servizi sociali', ar: 'مراكز الخدمات الاجتماعية البلدية', fr: 'Centres municipaux de services sociaux' },
    description: { 
      es: 'Información sobre ayudas y servicios para personas residentes en la ciudad de València', 
      en: 'Information on aid and services for residents of the city of Valencia', 
      it: 'Informazioni su aiuti e servizi per i residenti della città di Valencia', 
      ar: 'معلومات عن المساعدات والخدمات للمقيمين في مدينة فالنسيا', 
      fr: 'Informations sur les aides et services pour les résidents de la ville de Valence' 
    },
    address: 'https://geoportal.valencia.es/portal/apps/webappviewer/index.html?id=92a4e6cac08d44acb942e771f1b2eaf8',
    phone: '626 028 169 (asistente virtual)',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '15.01.21'
  },
  {
    id: 'juridico-2',
    categoryId: 'juridico',
    name: { es: 'CALOR Y CAFÉ / (CIBE Marítim)', en: 'CALOR Y CAFÉ / (CIBE Marítim)', it: 'CALOR Y CAFÉ / (CIBE Marítim)', ar: 'كالور إي كافيه / (سيبي ماريتيم)', fr: 'CALOR Y CAFÉ / (CIBE Marítim)' },
    description: { 
      es: 'Atención social y jurídica a los usuarios del centro. Dirigido exclusivamente a drogodependientes en activo.', 
      en: 'Social and legal assistance for center users. Exclusively for active drug addicts.', 
      it: 'Assistenza sociale e legale per gli utenti del centro. Esclusivamente per tossicodipendenti attivi.', 
      ar: 'مساعدة اجتماعية وقانونية لمستخدمي المركز. حصرياً للمدمنين النشطين.', 
      fr: 'Assistance sociale et juridique pour les usagers du centre. Exclusivement pour les toxicomanes actifs.' 
    },
    address: 'Calle Barraca, 290 (Malvarrosa)',
    phone: '96 392 05 92',
    email: 'centromaritim@comiteantisidavalencia.org',
    hours: 'L a V (8:30 a 13:00)',
    coordinates: { lat: 39.4754, lng: -0.3299 },
    updated: '30.05.24'
  },
  {
    id: 'juridico-3',
    categoryId: 'juridico',
    name: { es: 'CEPAIM', en: 'CEPAIM', it: 'CEPAIM', ar: 'سيبايم', fr: 'CEPAIM' },
    description: { 
      es: 'Retorno voluntario a país de origen, previa evaluación del caso.', 
      en: 'Voluntary return to country of origin, after case evaluation.', 
      it: 'Ritorno volontario al paese di origine, previa valutazione del caso.', 
      ar: 'العودة الطوعية إلى بلد المنشأ، بعد تقييم الحالة.', 
      fr: 'Retour volontaire au pays d\'origine, après évaluation du cas.' 
    },
    address: 'C/ Marqués de Campo, 16, Bajo izq.',
    phone: '963 92 53 02',
    email: 'gorettiruiz@cepaim.org',
    hours: 'L a J (9:00 a 14:00 / 16:00 a 18:30)',
    coordinates: { lat: 39.4665, lng: -0.3802 },
    updated: '30.05.24'
  },
  {
    id: 'juridico-4',
    categoryId: 'juridico',
    name: { es: 'ASESORÍA JURÍDICA Aguante Social AS', en: 'LEGAL ADVICE Aguante Social AS', it: 'CONSULENZA LEGALE Aguante Social AS', ar: 'استشارات قانونية Aguante Social AS', fr: 'CONSEIL JURIDIQUE Aguante Social AS' },
    description: { 
      es: 'Asesoría jurídica gratuita en materia de extranjería: padrón, arraigo, SIP, Renta Valenciana de Inclusión...', 
      en: 'Free legal advice on immigration matters: registration, residency, SIP, Valencian Inclusion Income...', 
      it: 'Consulenza legale gratuita in materia di immigrazione: registrazione, residenza, SIP, Reddito di Inclusione Valenziano...', 
      ar: 'استشارات قانونية مجانية في مسائل الهجرة: التسجيل، الإقامة، SIP، دخل فالنسيا للإدماج...', 
      fr: 'Conseil juridique gratuit en matière d\'immigration : enregistrement, résidence, SIP, Revenu d\'inclusion valencien...' 
    },
    address: 'C/Marqués de Montortal 65',
    phone: '',
    email: 'aguantesocial21@gmail.com',
    hours: '',
    coordinates: { lat: 39.4891, lng: -0.3820 },
    updated: '13.04.21'
  },
  {
    id: 'juridico-5',
    categoryId: 'juridico',
    name: { es: 'ASESORÍA JURÍDICA ATLAS Migració i Refugi', en: 'LEGAL ADVICE ATLAS Migration and Refuge', it: 'CONSULENZA LEGALE ATLAS Migrazione e Rifugio', ar: 'استشارات قانونية أطلس الهجرة واللجوء', fr: 'CONSEIL JURIDIQUE ATLAS Migration et Réfugiés' },
    description: { 
      es: 'Abogados, trabajadores sociales y orientadores laborales especializados en extranjería y asilo', 
      en: 'Lawyers, social workers and career counselors specializing in immigration and asylum', 
      it: 'Avvocati, assistenti sociali e consulenti di orientamento professionale specializzati in immigrazione e asilo', 
      ar: 'محامون وأخصائيون اجتماعيون ومستشارون مهنيون متخصصون في الهجرة واللجوء', 
      fr: 'Avocats, travailleurs sociaux et conseillers d\'orientation professionnelle spécialisés dans l\'immigration et l\'asile' 
    },
    address: '',
    phone: '900 404 403 (gratuito)',
    email: 'atlas_vlc@cv.gva.es',
    hours: 'L a V (10:00 a 14:00), también M y Mx (15:00 a 19:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: '03.03.22'
  },
  {
    id: 'juridico-6',
    categoryId: 'juridico',
    name: { es: 'ASESORÍA JURÍDICA NOMADAS (Extranjería)', en: 'LEGAL ADVICE NOMADAS (Immigration)', it: 'CONSULENZA LEGALE NOMADAS (Immigrazione)', ar: 'استشارات قانونية نوماداس (الهجرة)', fr: 'CONSEIL JURIDIQUE NOMADAS (Immigration)' },
    description: { 
      es: 'Asesoría jurídica Gratuita en materia de extranjería (prioridad a personas migrantes lgtbiq+ y trabajajadoras sexuales). Abogada Carmen Cabrera', 
      en: 'Free legal advice on immigration (priority for lgtbiq+ migrants and sex workers). Lawyer Carmen Cabrera', 
      it: 'Consulenza legale gratuita in materia di immigrazione (priorità per migranti lgtbiq+ e sex workers). Avvocato Carmen Cabrera', 
      ar: 'استشارات قانونية مجانية في مجال الهجرة (الأولوية للمهاجرين من مجتمع الميم والعاملين في الجنس). المحامية كارمن كابريرا', 
      fr: 'Conseil juridique gratuit en matière d\'immigration (priorité aux migrants lgtbiq+ et aux travailleurs du sexe). Avocate Carmen Cabrera' 
    },
    address: 'C/ Rodríguez de Cepeda, 15 (Amistad)',
    phone: '612401846',
    email: 'oficina.nomadasvlc@gmail.com',
    hours: '2do y 4to Mx de cada mes (17:00 a 20:00)',
    coordinates: { lat: 39.4691, lng: -0.3541 },
    updated: '01.07.21'
  },
  {
    id: 'juridico-7',
    categoryId: 'juridico',
    name: { es: 'Asociación AVANT', en: 'AVANT Association', it: 'Associazione AVANT', ar: 'جمعية أفانت', fr: 'Association AVANT' },
    description: { 
      es: 'Orientación jurídica gratuita, a personas que han cometido delitos asociados al consumo de drogas o como consecuencia de su adicción.', 
      en: 'Free legal guidance for people who have committed crimes associated with drug use or as a result of their addiction.', 
      it: 'Orientamento legale gratuito per le persone che hanno commesso reati associati all\'uso di droghe o come conseguenza della loro dipendenza.', 
      ar: 'إرشاد قانوني مجاني للأشخاص الذين ارتكبوا جرائم مرتبطة بتعاطي المخدرات أو نتيجة لإدمانهم.', 
      fr: 'Orientation juridique gratuite pour les personnes ayant commis des délits liés à la consommation de drogue ou à leur dépendance.' 
    },
    address: 'C/ Artes Gráficas, nº 25, pta 2. 4',
    phone: '96 346 29 67',
    email: 'avant@asocavant.org',
    hours: 'L a V (9:00 a 20:00)',
    coordinates: { lat: 39.4728, lng: -0.3540 },
    updated: '20.01.21'
  },
  {
    id: 'juridico-8',
    categoryId: 'juridico',
    name: { es: 'Movimiento por la paz (MPDL)', en: 'Movement for Peace (MPDL)', it: 'Movimento per la Pace (MPDL)', ar: 'الحركة من أجل السلام (MPDL)', fr: 'Mouvement pour la Paix (MPDL)' },
    description: { 
      es: 'Asesoría jurídica gratuita en materia de extranjería, nacionalidad, procedimientos administrativos, asesoramiento en prestaciones, ayudas sociales, derechos laborales...', 
      en: 'Free legal advice on immigration, nationality, administrative procedures, advice on benefits, social aid, labor rights...', 
      it: 'Consulenza legale gratuita in materia di immigrazione, nazionalità, procedure amministrative, consulenza su prestazioni, aiuti sociali, diritti del lavoro...', 
      ar: 'استشارات قانونية مجانية في مجال الهجرة والجنسية والإجراءات الإدارية والمشورة بشأن الإعانات والمساعدات الاجتماعية وحقوق العمل...', 
      fr: 'Conseil juridique gratuit en matière d\'immigration, de nationalité, de procédures administratives, de conseil sur les prestations, les aides sociales, les droits du travail...' 
    },
    address: 'C/ Lérida, 28, bajo.',
    phone: '96 382 15 31',
    email: 'val.juridica@mpdl.org',
    hours: 'L a M (9:30 a 13:30)',
    coordinates: { lat: 39.4883, lng: -0.3845 },
    updated: '20.01.21'
  },
  {
    id: 'juridico-9',
    categoryId: 'juridico',
    name: { es: 'Centro Cultural Islámico de Valencia', en: 'Islamic Cultural Center of Valencia', it: 'Centro Culturale Islamico di Valencia', ar: 'المركز الثقافي الإسلامي في فالنسيا', fr: 'Centre Culturel Islamique de Valence' },
    description: { 
      es: 'Dirigido a miembros de la comunidad musulmana', 
      en: 'Aimed at members of the Muslim community', 
      it: 'Rivolto ai membri della comunità musulmana', 
      ar: 'موجه لأعضاء الجالية المسلمة', 
      fr: 'Destiné aux membres de la communauté musulmane' 
    },
    address: 'C/ Arquitecto Rodríguez, nº 17, 19 y 21',
    phone: '96 360 33 30',
    email: 'info@webcciv.org',
    hours: '',
    coordinates: { lat: 39.4912, lng: -0.3804 },
    updated: '20.01.21'
  },
  {
    id: 'juridico-10',
    categoryId: 'juridico',
    name: { es: 'Asociación Pakistaní', en: 'Pakistani Association', it: 'Associazione Pakistana', ar: 'الجمعية الباكستانية', fr: 'Association Pakistanaise' },
    description: { 
      es: 'Primera atención (alimentación, ropa, alojamiento, ayudas de bolsillo). Actividades culturales y religiosas. Información y apoyo al retorno.', 
      en: 'First attention (food, clothing, accommodation, pocket money). Cultural and religious activities. Information and support for return.', 
      it: 'Prima attenzione (cibo, vestiti, alloggio, paghetta). Attività culturali e religiose. Informazioni e supporto per il ritorno.', 
      ar: 'الاهتمام الأول (طعام، ملابس، سكن، مصروف جيب). أنشطة ثقافية ودينية. معلومات ودعم للعودة.', 
      fr: 'Première attention (nourriture, vêtements, logement, argent de poche). Activités culturelles et religieuses. Information et soutien au retour.' 
    },
    address: '',
    phone: '632999279',
    email: 'tafamachi@gmail.com',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '20.01.21'
  },
  // --- OTROS ---
  {
    id: 'otros-1',
    categoryId: 'otros',
    name: { es: 'RUMIÑAHUI', en: 'RUMIÑAHUI', it: 'RUMIÑAHUI', ar: 'رومينياهوي', fr: 'RUMIÑAHUI' },
    description: { 
      es: 'Atención, información y orientación jurídica de manera presencial y telefónica. Gestión para apertura de cuenta bancaria.', 
      en: 'In-person and telephone attention, information and legal guidance. Management for opening a bank account.', 
      it: 'Attenzione, informazione e orientamento legale di persona e per telefono. Gestione per l\'apertura di un conto bancario.', 
      ar: 'اهتمام ومعلومات وإرشادات قانونية شخصيًا وعبر الهاتف. إدارة لفتح حساب مصرفي.', 
      fr: 'Attention, information et orientation juridique en personne et par téléphone. Gestion pour l\'ouverture d\'un compte bancaire.' 
    },
    address: 'C/ Marcelino Giner, 9 Bajo Izquierda, 4',
    phone: '96 070 37 52 / 667 676 104',
    email: 'educacionvalencia@ruminahui.org',
    hours: '',
    coordinates: { lat: 39.4800, lng: -0.3670 },
    updated: '05.11.22'
  },
  {
    id: 'otros-2',
    categoryId: 'otros',
    name: { es: 'Bicis para todas', en: 'Bikes for all', it: 'Bici per tutti', ar: 'دراجات للجميع', fr: 'Vélos pour tous' },
    description: { 
      es: 'Reparto de bicis destinadas a personas en riesgo de exclusión y que por su situación económica y/o social no puedan adquirirlas. Hay que rellenar un formulario web para obtenerlas.', 
      en: 'Distribution of bikes for people at risk of exclusion who, due to their economic and/or social situation, cannot acquire them. A web form must be filled out to obtain them.', 
      it: 'Distribuzione di biciclette per persone a rischio di esclusione che, a causa della loro situazione economica e/o sociale, non possono acquistarle. Per ottenerle è necessario compilare un modulo web.', 
      ar: 'توزيع الدراجات للأشخاص المعرضين لخطر الإقصاء والذين لا يستطيعون الحصول عليها بسبب وضعهم الاقتصادي و/أو الاجتماعي. يجب تعبئة نموذج على الويب للحصول عليها.', 
      fr: 'Distribution de vélos pour les personnes à risque d\'exclusion qui, en raison de leur situation économique et/ou sociale, ne peuvent pas en acquérir. Un formulaire web doit être rempli pour les obtenir.' 
    },
    address: 'https://www.soterranya.org/bicisparatodos.html',
    phone: '',
    email: '',
    hours: '',
    coordinates: { lat: 0, lng: 0 },
    updated: '11.01.22'
  },
  // --- VOLUNTARIADO DE CALLE ---
  {
    id: 'calle-1',
    categoryId: 'calle',
    name: { es: 'BOKATAS', en: 'BOKATAS', it: 'BOKATAS', ar: 'بوكاتاس', fr: 'BOKATAS' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: '',
    phone: '',
    email: 'www.facebook.com/bokatasvalencia',
    hours: 'M (20:30 a 23:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'calle-2',
    categoryId: 'calle',
    name: { es: 'SALUD Y COMUNIDAD (Centro Móvil)', en: 'HEALTH AND COMMUNITY (Mobile Center)', it: 'SALUTE E COMUNITÀ (Centro Mobile)', ar: 'الصحة والمجتمع (المركز المتنقل)', fr: 'SANTÉ ET COMMUNAUTÉ (Centre Mobile)' },
    description: { 
      es: 'Reparto de preservativos y jeringuillas u otros elementos que permitan a las personas drogodependientes consumir de forma segura. Atención sanitaria. Reparto de comida.', 
      en: 'Distribution of condoms and syringes or other items that allow drug addicts to consume safely. Health care. Food distribution.', 
      it: 'Distribuzione di preservativi e siringhe o altri articoli che consentono ai tossicodipendenti di consumare in sicurezza. Assistenza sanitaria. Distribuzione di cibo.', 
      ar: 'توزيع الواقيات الذكرية والمحاقن أو غيرها من المواد التي تسمح للمدمنين بالتعاطي بأمان. رعاية صحية. توزيع الطعام.', 
      fr: 'Distribution de préservatifs et de seringues ou d\'autres articles permettant aux toxicomanes de consommer en toute sécurité. Soins de santé. Distribution de nourriture.' 
    },
    address: 'El Pilar, Plaça de la Botxa, Botánico',
    phone: '',
    email: '',
    hours: 'El Pilar (L a V - 19:45 a 20:45), Botánico (L a J - 21:00 a 21:15)',
    coordinates: { lat: 39.4746, lng: -0.3805 },
    updated: '20.01.21'
  },
  {
    id: 'calle-3',
    categoryId: 'calle',
    name: { es: 'INVISIBLES', en: 'INVISIBLES', it: 'INVISIBILI', ar: 'غير المرئيين', fr: 'INVISIBLES' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: '',
    phone: '',
    email: 'www.facebook.com/Invisibles-Visibles-372365950242612',
    hours: 'M',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'calle-4',
    categoryId: 'calle',
    name: { es: 'ANANDA', en: 'ANANDA', it: 'ANANDA', ar: 'أناندا', fr: 'ANANDA' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: '',
    phone: '',
    email: '',
    hours: 'J (20:00 a 23:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'calle-5',
    categoryId: 'calle',
    name: { es: 'AMIGOS DE LA CALLE', en: 'FRIENDS OF THE STREET', it: 'AMICI DELLA STRADA', ar: 'أصدقاء الشارع', fr: 'AMIS DE LA RUE' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: '',
    phone: '',
    email: 'www.facebook.com/amigosdelacalle',
    hours: 'V (20:00 a 21:30), D (19:30 a 00:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'calle-6',
    categoryId: 'calle',
    name: { es: 'COLECTIVO LA TRIBU', en: 'THE TRIBE COLLECTIVE', it: 'IL COLLETTIVO DELLA TRIBÙ', ar: 'جماعة القبيلة', fr: 'LE COLLECTIF DE LA TRIBU' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: '',
    phone: '',
    email: '',
    hours: 'J (20:00 a 23:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'calle-7',
    categoryId: 'calle',
    name: { es: 'MISIÓN EUCARÍSTICA VOZ DE LOS POBRES', en: 'EUCHARISTIC MISSION VOICE OF THE POOR', it: 'MISSIONE EUCARISTICA VOCE DEI POVERI', ar: 'الرسالة الإفخارستية صوت الفقراء', fr: 'MISSION EUCHARISTIQUE VOIX DES PAUVRES' },
    description: { es: '', en: '', it: '', ar: '', fr: '' },
    address: '',
    phone: '',
    email: '',
    hours: 'L, M y V (21:00)',
    coordinates: { lat: 0, lng: 0 },
    updated: ''
  },
  {
    id: 'calle-8',
    categoryId: 'calle',
    name: { es: 'HigieneBus (Mensajeros de la Paz)', en: 'HygieneBus (Messengers of Peace)', it: 'HigieneBus (Messaggeri di Pace)', ar: 'حافلة النظافة (رسل السلام)', fr: 'HigieneBus (Messagers de la Paix)' },
    description: { 
      es: 'Servicios básicos de higiene y aseo personal, peluquería o dentista gracias a la colaboración de la EMT y el Ayuntamiento de Valencia.', 
      en: 'Basic hygiene and personal grooming services, hairdressing or dentist thanks to the collaboration of the EMT and the Valencia City Council.', 
      it: 'Servizi di igiene e cura personale di base, parrucchiere o dentista grazie alla collaborazione dell\'EMT e del Comune di Valencia.', 
      ar: 'خدمات النظافة الشخصية الأساسية، تصفيف الشعر أو طبيب الأسنان بفضل تعاون EMT ومجلس مدينة فالنسيا.', 
      fr: 'Services d\'hygiène et de soins personnels de base, coiffeur ou dentiste grâce à la collaboration de l\'EMT et de la Mairie de Valence.' 
    },
    address: 'Paradas: Antiguo circuito de F1, Quatre Carreres, Campanar',
    phone: '',
    email: '',
    hours: 'L y J de 20:00 a 00:00 (después de fallas)',
    coordinates: { lat: 0, lng: 0 },
    updated: '03.03.22'
  },
];

export const getCategories = (): Category[] => categories;
export const getResources = (): Resource[] => resources;