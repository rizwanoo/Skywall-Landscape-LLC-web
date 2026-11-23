export type RoutePath = '/' | '/services' | '/projects' | '/contact';

export type PortfolioCategory =
  | 'All Work'
  | 'Paver Installations'
  | 'Artificial Turf'
  | 'Yard Transformations'
  | 'Irrigation'
  | 'Outdoor Landscaping';

export type ServiceOption =
  | 'Paver Installation'
  | 'Artificial Turf'
  | 'Yard Cleanup'
  | 'Irrigation'
  | 'Multiple Services'
  | 'Other';

export const BUSINESS_INFO = {
  name: 'Skywall Landscape LLC',
  shortName: 'Skywall Landscape',
  location: 'Las Vegas, Nevada, USA',
  serviceAreaHeadline: 'Transforming Outdoor Spaces Across Las Vegas, Nevada.',
  phoneDisplay: '702-366-3798',
  phoneHref: 'tel:+17023663798',
  smsHref: 'sms:+17023663798',
  instagramUrl: 'https://www.instagram.com/skywall_landscape_llc/',
  instagramHandle: '@skywall_landscape_llc',
  yelpUrl: 'https://yelp.to/HPpxxeOBiw',
  logoUrl: '/src/assets/images/skywall_logo_hd_1795439472814.jpg',
  ogImageUrl: '/og-image.jpg',
};

export interface RouteSeoMeta {
  title: string;
  description: string;
}

export const ROUTE_SEO: Record<RoutePath, RouteSeoMeta> = {
  '/': {
    title: 'Skywall Landscape LLC | Landscaping & Pavers in Las Vegas, NV',
    description:
      'Custom pavers, artificial turf, yard cleanups, and irrigation in Las Vegas, Nevada. Request a free estimate from Skywall Landscape LLC.',
  },
  '/services': {
    title: 'Landscaping Services in Las Vegas | Pavers, Turf & Irrigation',
    description:
      'Explore paver installation, artificial turf, yard cleanups, and irrigation services across Las Vegas from Skywall Landscape LLC.',
  },
  '/projects': {
    title: 'Our Projects | Las Vegas Landscaping Portfolio – Skywall Landscape LLC',
    description:
      'Browse residential paver installations, artificial turf lawns, yard cleanups, and desert landscape transformations in Las Vegas.',
  },
  '/contact': {
    title: 'Free Estimate & Contact | Skywall Landscape LLC – Las Vegas, NV',
    description:
      'Call, text, or request a free landscaping estimate in Las Vegas from Skywall Landscape LLC. Pavers, artificial turf, cleanups, and irrigation.',
  },
};

export interface ServiceDetail {
  id: 'pavers' | 'turf' | 'cleanups' | 'irrigation';
  number: string;
  title: string;
  shortTitle: string;
  estimateOption: ServiceOption;
  summary: string;
  detailCopy: string;
  climateNote: string;
  applications: string[];
  ctaLabel: string;
  image: string;
  imageAlt: string;
  aspectRatio: '4:3' | '16:9';
}

export const SERVICES: ServiceDetail[] = [
  {
    id: 'pavers',
    number: '01',
    title: 'Paver Installation',
    shortTitle: 'Pavers',
    estimateOption: 'Paver Installation',
    summary:
      'Architectural paver patios, walkways, driveways, and outdoor living spaces built for everyday durability and visual balance.',
    detailCopy:
      'Thoughtfully laid pavers define how your yard feels underfoot and how seamlessly your indoor living space extends outside. From clean patio layouts and curved front walkways to residential driveways and backyard gathering areas, every stone edge and border is planned for clean lines and lasting stability.',
    climateNote:
      'Interlocking pavers naturally accommodate desert ground movement and temperature shifts in Las Vegas while elevating residential curb appeal.',
    applications: [
      'Paver patios & seating areas',
      'Front & side yard walkways',
      'Residential driveways',
      'Backyard paving & borders',
      'Outdoor entertainment areas',
      'Decorative paved surfaces',
    ],
    ctaLabel: 'Request a Paver Estimate',
    image: '/src/assets/images/service_pavers_walkway_1795439096315.jpg',
    imageAlt:
      'Custom interlocking sandstone and charcoal border paver walkway and patio installed in a Las Vegas residential courtyard',
    aspectRatio: '4:3',
  },
  {
    id: 'turf',
    number: '02',
    title: 'Artificial Turf Installation',
    shortTitle: 'Artificial Turf',
    estimateOption: 'Artificial Turf',
    summary:
      'Clean, vibrant residential lawns and backyard green spaces designed for low-maintenance living in the Mojave Desert.',
    detailCopy:
      'Natural grass struggles under intense Las Vegas sun and high summer water demand. Professionally installed artificial turf creates an inviting, usable green lawn for relaxing, entertaining, and everyday backyard living without constant mowing or heavy watering.',
    climateNote:
      'Ideal for homeowners seeking year-round greenery, cleaner borders along desert rock or concrete curbing, and practical outdoor play areas.',
    applications: [
      'Residential front & backyard lawns',
      'Full backyard turf transformations',
      'Decorative courtyard & side-yard turf',
      'Turf & paver stepping-stone layouts',
      'Pet-friendly outdoor areas',
      'Low-maintenance desert lawn conversions',
    ],
    ctaLabel: 'Get a Turf Estimate',
    image: '/src/assets/images/service_artificial_turf_1795439095887.jpg',
    imageAlt:
      'Newly installed residential artificial turf lawn bordered by curved concrete curbing and desert river rock in Las Vegas',
    aspectRatio: '4:3',
  },
  {
    id: 'cleanups',
    number: '03',
    title: 'Yard Cleanups',
    shortTitle: 'Yard Cleanups',
    estimateOption: 'Yard Cleanup',
    summary:
      'Thorough property cleanups, debris removal, and desert yard refreshes that turn overgrown or neglected lots into clean, open spaces.',
    detailCopy:
      'Whether an outdoor space has accumulated weeds, fallen branches, and scattered rock or needs a clean slate ahead of new landscaping work, a structured yard cleanup restores order, visibility, and immediate usability across your entire lot.',
    climateNote:
      'Clearing dry brush, reshaping planting beds, and dressing gravel surfaces helps keep Las Vegas residential properties tidy and ready for guests.',
    applications: [
      'Complete front & backyard cleanup',
      'Removal of landscape & green debris',
      'Weed clearing & bed edging',
      'General yard refreshes & gravel dressing',
      'Shrub & desert plant tidy-up',
      'Site preparation for new transformations',
    ],
    ctaLabel: 'Request a Cleanup Estimate',
    image: '/src/assets/images/service_yard_cleanup_1795439095938.jpg',
    imageAlt:
      'Freshly cleared and manicured Las Vegas desert residential yard with clean decomposed granite gravel and neat paver borders',
    aspectRatio: '4:3',
  },
  {
    id: 'irrigation',
    number: '04',
    title: 'Irrigation',
    shortTitle: 'Irrigation',
    estimateOption: 'Irrigation',
    summary:
      'Practical watering layouts and targeted irrigation setups planned specifically for trees, shrubs, and planting beds in the Las Vegas desert.',
    detailCopy:
      'Healthy desert trees, palms, shrubs, and ornamental plants rely on steady, appropriately placed moisture rather than wasteful overspray. Properly routed irrigation lines deliver water directly to root zones while keeping hardscapes and gravel beds clean.',
    climateNote:
      'In Southern Nevada’s arid heat, thoughtful watering zones protect landscape investments and support steady plant growth without unnecessary runoff.',
    applications: [
      'Residential yard watering setups',
      'Drip lines for trees & desert shrubs',
      'Planting bed irrigation routing',
      'Zone adjustments during yard upgrades',
      'Replacement of damaged surface lines',
      'Coordinated watering with new installations',
    ],
    ctaLabel: 'Discuss Your Irrigation Project',
    image: '/src/assets/images/service_irrigation_drip_1795439096021.jpg',
    imageAlt:
      'Clean residential desert drip irrigation tubing and emitters delivering targeted water around agave and rosemary in Nevada gravel beds',
    aspectRatio: '4:3',
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All Work'>;
  serviceTag: string;
  description: string;
  image: string;
  imageAlt: string;
  aspectRatio: '16:9' | '4:3' | '3:4';
  featuredSpan?: 'wide' | 'tall' | 'standard';
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'backyard-living-transformation',
    title: 'Backyard Patio Pavers & Turf Layout',
    category: 'Yard Transformations',
    serviceTag: 'Pavers · Artificial Turf · Outdoor Lighting',
    description:
      'Full backyard residential layout pairing wide-format stone pavers with a clean artificial turf lawn and desert planter beds.',
    image: '/src/assets/images/hero_desert_patio_1795439096317.jpg',
    imageAlt:
      'Wide view of a Las Vegas residential backyard transformation featuring sandstone pavers, artificial turf, and desert plantings at sunset',
    aspectRatio: '16:9',
    featuredSpan: 'wide',
  },
  {
    id: 'curved-paver-walkway',
    title: 'Interlocking Paver Courtyard & Walkway',
    category: 'Paver Installations',
    serviceTag: 'Paver Installation',
    description:
      'Curved sandstone and charcoal border paver walkway framed by clean desert gravel and drought-tolerant plantings.',
    image: '/src/assets/images/service_pavers_walkway_1795439096315.jpg',
    imageAlt:
      'Curved interlocking paver walkway with dark charcoal border pavers beside desert gravel landscaping',
    aspectRatio: '4:3',
    featuredSpan: 'standard',
  },
  {
    id: 'front-entry-courtyard',
    title: 'Architectural Front Courtyard Entry',
    category: 'Outdoor Landscaping',
    serviceTag: 'Pavers · Desert Landscaping',
    description:
      'Stepping pavers set across crushed desert stone leading to a modern residential courtyard entry.',
    image: '/src/assets/images/portfolio_front_courtyard_1795439095915.jpg',
    imageAlt:
      'Vertical view of modern stepping pavers and desert flora in a Las Vegas front entry courtyard',
    aspectRatio: '3:4',
    featuredSpan: 'tall',
  },
  {
    id: 'residential-backyard-turf',
    title: 'Curved Backyard Artificial Turf Lawn',
    category: 'Artificial Turf',
    serviceTag: 'Artificial Turf',
    description:
      'Low-maintenance synthetic turf lawn finished with concrete curbing, stepping pavers, and river rock perimeter beds.',
    image: '/src/assets/images/service_artificial_turf_1795439095887.jpg',
    imageAlt:
      'Green residential artificial turf lawn bordered by concrete curbing and river rock in Las Vegas',
    aspectRatio: '4:3',
    featuredSpan: 'standard',
  },
  {
    id: 'twilight-paver-turf-lounge',
    title: 'Evening Patio & Turf Outdoor Living Area',
    category: 'Yard Transformations',
    serviceTag: 'Paver Installation · Artificial Turf',
    description:
      'Coordinated patio hardscape and synthetic lawn designed for evening entertaining in the Las Vegas valley.',
    image: '/src/assets/images/portfolio_backyard_lounge_1795439095575.jpg',
    imageAlt:
      'Evening backyard lounge with travertine-tone patio pavers, green turf, and desert accent plants',
    aspectRatio: '16:9',
    featuredSpan: 'wide',
  },
  {
    id: 'desert-yard-cleanup',
    title: 'Desert Yard Cleanup & Gravel Refresh',
    category: 'Yard Transformations',
    serviceTag: 'Yard Cleanup',
    description:
      'Cleared residential lot with freshly dressed desert gravel, pruned desert shrubs, and clean patio edging.',
    image: '/src/assets/images/service_yard_cleanup_1795439095938.jpg',
    imageAlt:
      'Clean freshly raked desert yard in Las Vegas with pruned agave and crisp patio stone border',
    aspectRatio: '4:3',
    featuredSpan: 'standard',
  },
  {
    id: 'drip-irrigation-beds',
    title: 'Desert Planting Bed Drip Irrigation',
    category: 'Irrigation',
    serviceTag: 'Irrigation',
    description:
      'Cleanly routed surface drip lines delivering targeted water to ornamental trees, agave, and rosemary.',
    image: '/src/assets/images/service_irrigation_drip_1795439096021.jpg',
    imageAlt:
      'Drip irrigation lines neatly installed around olive tree and desert plants in warm gravel bed',
    aspectRatio: '4:3',
    featuredSpan: 'standard',
  },
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All Work',
  'Paver Installations',
  'Artificial Turf',
  'Yard Transformations',
  'Irrigation',
  'Outdoor Landscaping',
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'Attention to Detail',
    description:
      'Clean paver borders, tight turf seams, neat gravel transitions, and tidy job sites from start to finish.',
  },
  {
    number: '02',
    title: 'Complete Outdoor Transformations',
    description:
      'Seamless coordination between hardscape, synthetic lawns, planting beds, and practical watering layouts.',
  },
  {
    number: '03',
    title: 'Multiple Landscaping Services',
    description:
      'Pavers, artificial turf, yard cleanups, and irrigation handled together so your whole yard feels cohesive.',
  },
  {
    number: '04',
    title: 'Practical Desert Solutions',
    description:
      'Outdoor environments thoughtfully planned for Southern Nevada sun, heat, and low-maintenance everyday living.',
  },
  {
    number: '05',
    title: 'Free Estimates',
    description:
      'Clear project discussions and straightforward free estimates before any work begins on your property.',
  },
  {
    number: '06',
    title: 'Local Las Vegas Service',
    description:
      'Dedicated residential landscaping serving homeowners across Las Vegas, Nevada with direct phone and text communication.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Get in Touch',
    description:
      'Tell us about your outdoor space, which services you are considering, and what you would like to improve.',
  },
  {
    step: '02',
    title: 'Project Assessment',
    description:
      'Discuss your property layout, required services, and design expectations so we can prepare a tailored free estimate.',
  },
  {
    step: '03',
    title: 'Transform Your Space',
    description:
      'Move forward with your landscaping project and create a clean, functional outdoor environment ready to enjoy.',
  },
];
