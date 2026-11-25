export type PlanTier = 'Monthly' | 'Quarterly' | 'Annual';

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
}

export interface PackageOption {
  tier: PlanTier;
  tagline: string;
  periodLabel: string;
  basePrice: number;
  ptPrice: number;
  rateBase: string;
  ratePt: string;
  featured?: boolean;
  features: string[];
}

export const PHOTO_ASSETS = {
  hero: 'https://images.unsplash.com/photo-1674834727149-00812f907676?auto=format&fit=crop&w=1800&q=80',
  story: 'https://images.unsplash.com/photo-1704223524532-c5b4e8490297?auto=format&fit=crop&w=1400&q=80',
  aboutFloor: 'https://images.pexels.com/photos/4716814/pexels-photo-4716814.jpeg?auto=compress&cs=tinysrgb&w=1600',
} as const;

export const HERO_FACTS = [
  { label: 'Morning batch', value: '5:30 AM to 10:30 AM' },
  { label: 'Evening batch', value: '4:30 PM to 9:30 PM' },
  { label: 'Plans starting at', value: '₹800 / month' },
  { label: 'Training focus', value: 'Free weights & machines' },
] as const;

export const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'dumbbells',
    name: 'Dumbbells & Free Weights',
    description: 'Full progression of heavy dumbbells for presses, rows, curls, and unilateral control.',
    image: 'https://images.pexels.com/photos/35567437/pexels-photo-35567437.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Row of matte black dumbbells racked in a dark gym',
  },
  {
    id: 'bench-barbell',
    name: 'Barbells & Bench Press',
    description: 'Flat and incline bench press stations with solid barbells and iron plates for heavy compound lifts.',
    image: 'https://images.pexels.com/photos/4853666/pexels-photo-4853666.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Loaded barbell resting on a bench press station',
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown & Cable Stack',
    description: 'Dedicated lat pulldown and smooth cable station for back width, seated rows, and arm work.',
    image: 'https://images.pexels.com/photos/17706037/pexels-photo-17706037/free-photo-of-man-exercising-at-gym.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Lifter training back on a lat pulldown cable machine',
  },
  {
    id: 'leg-press',
    name: 'Quad Press & Calf Machines',
    description: 'Heavy-duty leg press and targeted calf stations built to load lower-body volume safely.',
    image: 'https://images.pexels.com/photos/6844939/pexels-photo-6844939.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Athlete training lower body on a leg press machine',
  },
  {
    id: 'treadmills',
    name: 'Treadmills & Conditioning',
    description: 'Commercial treadmills for warm-ups, incline walking, fat loss conditioning, and stamina.',
    image: 'https://images.pexels.com/photos/12250460/pexels-photo-12250460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Row of treadmills inside a strength gym',
  },
];

export const ABOUT_FACTS = [
  {
    label: 'Training Floor',
    detail: 'Clean, well-ventilated iron floor focused purely on strength and conditioning.',
  },
  {
    label: 'Floor Guidance',
    detail: 'Form checks for beginners plus optional 1-on-1 personal training.',
  },
  {
    label: 'Open Schedule',
    detail: 'Monday to Saturday, split morning and evening batches.',
  },
  {
    label: 'Transparent Rates',
    detail: 'Straightforward INR packages with zero surprise lock-in fees.',
  },
] as const;

export const PACKAGES: PackageOption[] = [
  {
    tier: 'Monthly',
    tagline: 'Flexible commitment to test your consistency.',
    periodLabel: '/ 1 month',
    basePrice: 1200,
    ptPrice: 3700,
    rateBase: 'Full floor access',
    ratePt: 'Includes dedicated 1-on-1 coaching',
    features: [
      'All free weights, benches & machines',
      'Treadmill & cardio access included',
      'Morning or evening batch flexibility',
    ],
  },
  {
    tier: 'Quarterly',
    tagline: '90 days to lock in the habit and see real change.',
    periodLabel: '/ 3 months',
    basePrice: 3000,
    ptPrice: 10000,
    rateBase: '₹1,000/month (Save ₹600)',
    ratePt: '₹3,333/month with 1-on-1 coaching',
    featured: true,
    features: [
      'All free weights, benches & machines',
      'Starter workout split & form check',
      'Treadmill & conditioning access',
    ],
  },
  {
    tier: 'Annual',
    tagline: 'For lifters who treat training as non-negotiable.',
    periodLabel: '/ 12 months',
    basePrice: 9600,
    ptPrice: 36000,
    rateBase: '₹800/month (Save ₹4,800)',
    ratePt: '₹3,000/month with 1-on-1 coaching',
    features: [
      'Full year unlimited gym floor access',
      'Quarterly strength progression check-in',
      'Best per-month rate all year',
    ],
  },
];

export const GOALS = [
  'Build Strength',
  'Muscle Gain',
  'Fat Loss & Conditioning',
  'Body Recomposition',
  'Beginner Foundations',
  'Stamina & Treadmill',
  'General Fitness',
] as const;

export const BATCHES = [
  { value: 'Morning (5:30 AM to 10:30 AM)', label: 'Morning Batch', meta: '5:30 AM to 10:30 AM' },
  { value: 'Evening (4:30 PM to 9:30 PM)', label: 'Evening Batch', meta: '4:30 PM to 9:30 PM' },
] as const;

export const MARQUEE_HERO = [
  '5:30 AM BATCH',
  'HEAVY IRON',
  '₹800 / MONTH',
  'ZERO EXCUSES',
  'ALANDUR CHENNAI',
  'FREE TRIAL PASS',
] as const;

export const MARQUEE_EQUIPMENT = [
  'Dumbbells',
  'Barbells',
  'Bench Press',
  'Lat Pulldown',
  'Quad Press',
  'Calf Machine',
  'Treadmills',
] as const;

export const MARQUEE_ENERGY = [
  'Show Up Daily',
  'Progressive Overload',
  'No Gimmicks',
  'Real Strength',
  'Load The Bar',
] as const;

export const GYM_LOCATION = {
  fullAddress: '307, MKN Rd, Ramapuram, Collectors Nagar, Alandur, St.Thomas Mount, Tamil Nadu 600016',
  embedUrl:
    'https://maps.google.com/maps?q=307%2C%20MKN%20Rd%2C%20Ramapuram%2C%20Collectors%20Nagar%2C%20Alandur%2C%20St.Thomas%20Mount%2C%20Tamil%20Nadu%20600016&t=&z=16&ie=UTF8&iwloc=&output=embed',
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=307%2C+MKN+Rd%2C+Ramapuram%2C+Collectors+Nagar%2C+Alandur%2C+St.Thomas+Mount%2C+Tamil+Nadu+600016',
} as const;

export function formatPackageLabel(tier: PlanTier, withPT: boolean): string {
  return withPT ? `${tier} + Personal Training` : `${tier} (Gym Access)`;
}
