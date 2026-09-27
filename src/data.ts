export type PageId =
  | 'home'
  | 'news'
  | 'scores'
  | 'shop'
  | 'podcasts'
  | 'about'
  | 'advertise'
  | 'contact'
  | 'checkout'
  | 'admin';

export interface LiveMatch {
  id: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  league: string;
}

export interface ScheduledMatch {
  id: string;
  home: string;
  away: string;
  time: string;
  league: string;
  status: 'live' | 'fixture' | 'result';
  homeScore?: number;
  awayScore?: number;
  minute?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  tag?: string;
  category: 'jersey' | 'hoodie' | 'cap' | 'accessories';
  club: string;
  colors: string[];
  description: string;
  sizes: string[];
  image: string;
  gallery: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: 'Interview' | 'Match Analysis' | 'Preview' | 'Review' | 'Naija Fans' | 'Feature';
  time: string;
  readMins: number;
  author: string;
  authorRole: string;
  featured?: boolean;
  image: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  show: string;
  duration: string;
  time: string;
  description: string;
  image: string;
}

export const IMAGES = {
  heroStudio: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85',
  heroAlt: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=85',
  interview: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&w=1200&q=85',
  analysis: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=85',
  naijaFans: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=85',
  preview: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=85',
  review: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=85',
  feature: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=85',
  podcast: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=85',
  about: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=85',
  jerseyGreen: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=85',
  jerseyRed: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=85',
  jerseyBlue: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=85',
  jerseySky: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=85',
  jerseyWhite: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=85',
  hoodie: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85',
  cap: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85',
  scarf: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=85',
  jerseyGreen2: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=85',
  jerseyRed2: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=85',
};

export const LIVE_TICKER: LiveMatch[] = [
  { id: '1', home: 'ARS', away: 'CHE', homeScore: 2, awayScore: 1, minute: "78'", league: 'EPL' },
  { id: '2', home: 'RMA', away: 'BAR', homeScore: 1, awayScore: 1, minute: "64'", league: 'La Liga' },
  { id: '3', home: 'MCI', away: 'LIV', homeScore: 0, awayScore: 0, minute: "23'", league: 'EPL' },
  { id: '4', home: 'NGA', away: 'GHA', homeScore: 1, awayScore: 0, minute: "55'", league: 'AFCON Q' },
  { id: '5', home: 'PSG', away: 'OM', homeScore: 2, awayScore: 0, minute: "55'", league: 'Ligue 1' },
  { id: '6', home: 'INT', away: 'MIL', homeScore: 1, awayScore: 0, minute: "39'", league: 'Serie A' },
];

export const ALL_MATCHES: ScheduledMatch[] = [
  { id: 'm1', home: 'Arsenal', away: 'Chelsea', time: "78'", league: 'Premier League', status: 'live', homeScore: 2, awayScore: 1, minute: "78'" },
  { id: 'm2', home: 'Man City', away: 'Liverpool', time: "23'", league: 'Premier League', status: 'live', homeScore: 0, awayScore: 0, minute: "23'" },
  { id: 'm3', home: 'Nigeria', away: 'Ghana', time: "55'", league: 'AFCON Qualifiers', status: 'live', homeScore: 1, awayScore: 0, minute: "55'" },
  { id: 'm4', home: 'Real Madrid', away: 'Barcelona', time: "64'", league: 'La Liga', status: 'live', homeScore: 1, awayScore: 1, minute: "64'" },
  { id: 'm5', home: 'Tottenham', away: 'Newcastle', time: '17:30', league: 'Premier League', status: 'fixture' },
  { id: 'm6', home: 'Bayern', away: 'Dortmund', time: 'FT', league: 'UCL', status: 'result', homeScore: 3, awayScore: 2 },
  { id: 'm7', home: 'Enyimba', away: 'Rangers Int.', time: 'FT', league: 'NPFL', status: 'result', homeScore: 2, awayScore: 1 },
  { id: 'm8', home: 'Remo Stars', away: 'Plateau Utd', time: '16:00', league: 'NPFL', status: 'fixture' },
];

export const NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'I still train like a kid from the streets — exclusive Super Eagles interview',
    summary: 'A candid conversation about pressure, family, and what Naija fans never see after the final whistle.',
    body: 'In our Lagos studio, the striker spoke openly about recovery routines, social media noise, and why the green-white-green still means everything. He described the moment he almost quit at 17, the coach who refused to let him, and how fans in Lagos, London and Atlanta fuel every sprint.',
    category: 'Interview',
    time: '2h ago',
    readMins: 8,
    author: 'Amina Okoro',
    authorRole: 'Senior Writer',
    featured: true,
    image: IMAGES.interview,
  },
  {
    id: 'n2',
    title: 'Match analysis: Why the high press collapsed after minute 60',
    summary: 'Channel-style breakdown of spacing, full-back fatigue, and the midfield pivot that decided the game.',
    body: 'We mapped every recovery run after the hour mark. The press became optional instead of coordinated. Central midfielders dropped too deep, full-backs stayed high, and the opponent found the pocket repeatedly.',
    category: 'Match Analysis',
    time: '5h ago',
    readMins: 6,
    author: 'James Reed',
    authorRole: 'Tactical Analyst',
    featured: true,
    image: IMAGES.analysis,
  },
  {
    id: 'n3',
    title: 'Naija fans: From street-pitch viewing rooms to 12,000 watching together',
    summary: 'How one supporter built a community that sells out every big Eagles night.',
    body: 'He started with a WhatsApp group and a borrowed projector. Today the viewing room sells out. Loyalty, ticket prices, and what clubs still get wrong about African fans.',
    category: 'Naija Fans',
    time: '8h ago',
    readMins: 5,
    author: 'Chioma Bello',
    authorRole: 'Community Editor',
    featured: true,
    image: IMAGES.naijaFans,
  },
  {
    id: 'n4',
    title: 'Preview: Nigeria vs Ghana — lineups, form and three storylines',
    summary: 'Everything you need before kick-off: expected XI, key battles, and fan predictions from the Tribe.',
    body: 'Form guide, injury news, and the tactical questions both coaches face. Plus what the podcast panel called earlier in the week.',
    category: 'Preview',
    time: '12h ago',
    readMins: 4,
    author: 'Fans Tribe Desk',
    authorRole: 'Editorial',
    image: IMAGES.preview,
  },
  {
    id: 'n5',
    title: 'Review: Five talking points after a chaotic weekend',
    summary: 'Goals, VAR debates, and the moments Naija timelines would not let go.',
    body: 'We ranked the biggest moments, the softest defending, and the performance that deserved more love. Share this with your group chat before the next episode drops.',
    category: 'Review',
    time: '1d ago',
    readMins: 5,
    author: 'Tom Adeyemi',
    authorRole: 'Match Reporter',
    image: IMAGES.review,
  },
  {
    id: 'n6',
    title: 'Feature: Inside a midweek recovery session with the physio team',
    summary: 'Ice baths are the easy photo. The real work is load management and sleep data.',
    body: 'A rare look at GPS loads, wellness questionnaires, and why one player sat out despite feeling fine. Quiet decisions that keep squads available when it matters most.',
    category: 'Feature',
    time: '1d ago',
    readMins: 7,
    author: 'Nadia Hassan',
    authorRole: 'Features',
    image: IMAGES.feature,
  },
];

export const PODCASTS: PodcastEpisode[] = [
  { id: 'ep1', title: 'Super Eagles special: Who starts on Saturday?', show: 'Fans Tribe Live', duration: '48 min', time: 'Today', description: 'Panel debate, fan calls, and bold predictions before the qualifier.', image: IMAGES.podcast },
  { id: 'ep2', title: 'Premier League weekend debrief', show: 'Matchday Podcast', duration: '62 min', time: 'Yesterday', description: 'Title race, VAR chaos, and the Naija players who showed up.', image: IMAGES.analysis },
  { id: 'ep3', title: 'Vlog recap: Behind the scenes at the viewing centre', show: 'Tribe Vlogs', duration: '22 min', time: '2d ago', description: 'Atmosphere, interviews with fans, and the moment the room exploded.', image: IMAGES.naijaFans },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Nigeria Home Jersey 26/27', price: 59.99, compareAt: 74.99, tag: 'Bestseller', category: 'jersey', club: 'Nigeria', colors: ['#008751', '#ffffff'], description: 'Official-style Super Eagles home shirt. Lightweight fabric, regular fit. Ships nationwide.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], image: IMAGES.jerseyGreen, gallery: [IMAGES.jerseyGreen, IMAGES.jerseyGreen2, IMAGES.naijaFans] },
  { id: 'p2', name: 'Arsenal Home Jersey', price: 54.99, tag: 'Hot', category: 'jersey', club: 'Arsenal', colors: ['#EF0107', '#FFFFFF'], description: 'Classic gunners red home kit replica. Breathable, match-ready cut.', sizes: ['S', 'M', 'L', 'XL'], image: IMAGES.jerseyRed, gallery: [IMAGES.jerseyRed, IMAGES.jerseyRed2] },
  { id: 'p3', name: 'Chelsea Home Jersey', price: 54.99, category: 'jersey', club: 'Chelsea', colors: ['#034694', '#FFFFFF'], description: 'Blues home shirt with clean sleeve detail. Soft feel, durable print zones.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], image: IMAGES.jerseyBlue, gallery: [IMAGES.jerseyBlue] },
  { id: 'p4', name: 'Man City Home Jersey', price: 54.99, tag: 'New', category: 'jersey', club: 'Man City', colors: ['#6CABDD', '#FFFFFF'], description: 'Sky blue home jersey. Modern collar, fan fit. Ships across Nigeria.', sizes: ['S', 'M', 'L', 'XL'], image: IMAGES.jerseySky, gallery: [IMAGES.jerseySky] },
  { id: 'p5', name: 'Liverpool Home Jersey', price: 54.99, category: 'jersey', club: 'Liverpool', colors: ['#C8102E', '#FFFFFF'], description: 'Reds home kit style. Bold crest area, comfortable for all-day wear.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], image: IMAGES.jerseyRed, gallery: [IMAGES.jerseyRed, IMAGES.review] },
  { id: 'p6', name: 'Real Madrid Home Jersey', price: 56.99, category: 'jersey', club: 'Real Madrid', colors: ['#FFFFFF', '#FEBE10'], description: 'Los Blancos home white. Premium feel, gold accent detail.', sizes: ['S', 'M', 'L', 'XL'], image: IMAGES.jerseyWhite, gallery: [IMAGES.jerseyWhite] },
  { id: 'p7', name: 'Barcelona Home Jersey', price: 56.99, category: 'jersey', club: 'Barcelona', colors: ['#A50044', '#004D98'], description: 'Blaugrana stripes. Iconic look for Clasico nights.', sizes: ['S', 'M', 'L', 'XL'], image: IMAGES.jerseyBlue, gallery: [IMAGES.jerseyBlue, IMAGES.feature] },
  { id: 'p8', name: 'Fans Tribe Hoodie', price: 64.99, tag: 'Tribe', category: 'hoodie', club: 'Fans Tribe', colors: ['#0f172a', '#6366f1'], description: 'Official Football Fans Tribe hoodie. Soft fleece, front pouch, logo print.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], image: IMAGES.hoodie, gallery: [IMAGES.hoodie] },
  { id: 'p9', name: 'Matchday Cap', price: 24.99, category: 'cap', club: 'Fans Tribe', colors: ['#0f172a', '#22c55e'], description: 'Adjustable cap with embroidered Tribe mark. One size.', sizes: ['One size'], image: IMAGES.cap, gallery: [IMAGES.cap] },
  { id: 'p10', name: 'Naija Scarf', price: 29.99, category: 'accessories', club: 'Nigeria', colors: ['#008751', '#ffffff'], description: 'Green and white knit scarf for qualifiers and AFCON nights.', sizes: ['One size'], image: IMAGES.scarf, gallery: [IMAGES.scarf] },
];

export const CREST_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-sky-500', 'bg-amber-500',
  'bg-emerald-500', 'bg-purple-500', 'bg-rose-500', 'bg-indigo-500',
];

export const AD_PACKAGES = [
  { id: 'a1', name: 'Homepage Banner', price: 'From ₦450k/wk', desc: 'Prime placement on every home visit for Naija football fans.', reach: '1.9M-aligned audience' },
  { id: 'a2', name: 'In-Article Native', price: 'From ₦280k/wk', desc: 'Inside interviews, previews and match analysis.', reach: 'Readers mid-session' },
  { id: 'a3', name: 'Podcast / Live show mention', price: 'Custom', desc: 'Integrated reads on Fans Tribe Live and Matchday Podcast.', reach: 'Audio & live viewers' },
  { id: 'a4', name: 'Shop takeover', price: 'Custom', desc: 'Brand the merch grid for a launch weekend.', reach: 'Buyers' },
];

export const FOOTER_LINKS = {
  explore: [
    { id: 'news' as PageId, label: 'News & stories' },
    { id: 'scores' as PageId, label: 'Live scores' },
    { id: 'podcasts' as PageId, label: 'Podcasts & shows' },
    { id: 'shop' as PageId, label: 'Shop' },
  ],
  company: [
    { id: 'about' as PageId, label: 'About us' },
    { id: 'advertise' as PageId, label: 'Advertise' },
    { id: 'contact' as PageId, label: 'Contact & support' },
  ],
};
