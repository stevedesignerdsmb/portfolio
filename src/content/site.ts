/**
 * Single source of truth for the v2 portfolio.
 *
 * Anything wrapped in [[double brackets]] is a placeholder (TK) that Steve
 * must confirm or replace. It renders as a highlighted marker on the site.
 * Find them all with:  grep -rn "\[\[" src/content
 */

const CLD = 'https://res.cloudinary.com/dfwi6dpkz/image/upload';
export const cld = (id: string, w = 1600) =>
  id.startsWith('http') ? id : `${CLD}/f_auto,c_limit,w_${w},q_auto/${id}`;

export const site = {
  name: 'Steve Calderon',
  role: 'Design Engineer',
  url: 'https://www.stevedesignerd.com',
  location: 'Guadalajara',
  country: 'Mexico',
  timezone: 'America/Mexico_City',
  email: 'contact@stevedesignerd.com',
  resume: 'https://drive.google.com/file/d/1i52NiXD0mniOU-mMaa91O_pphEYBrBsE/view?usp=sharing',
  x: 'https://x.com/stevedesignerd',
  linkedin: 'https://www.linkedin.com/in/steve-calderon-549b2b1aa/',
  github: 'https://github.com/stevedesignerdsmb',
  availability: 'Open to full-time roles',
  updated: 'Nov 20, 2026',
  /** One sentence, specific, no adjectives doing the work. */
  intro:
    'I design product interfaces and build them in code. Right now I’m a design engineer at Kiiex, working on cross-border payments and trading. Before that, SMB.co and Mercado Libre.',
  description:
    'Design engineer. I design product interfaces and build them in code. Currently at Kiiex (cross-border payments and trading); previously SMB.co and Mercado Libre.',
};

export type Status = 'Shipped' | 'In beta' | 'Live' | 'Prototype' | 'Concept';

export type Decision = {
  title: string;
  body: string;
  media?:
    | { kind: 'image'; src: string }
    /** A screen crop shown at its own proportions, never letterboxed into a phone. */
    | {
        kind: 'shot';
        src: string;
        ratio: string;
        alt: string;
        /** A finished slide with its own backdrop: no grey well around it. */
        bare?: boolean;
        /** The part that matters, in % of the image; everything else dims. */
        highlights?: { x: number; y: number; w: number; h: number }[];
      }
    /** A square screen recording from the product, shown as is (it has its own backdrop). */
    | { kind: 'loop'; src: string; poster: string; alt: string }
    | { kind: 'video' | 'image-tk'; label: string };
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  logo?: string;
  /** App icons fill their tile edge to edge; marks sit inside it with padding. */
  logoFill?: boolean;
  monogram?: string;
  tagline: string;
  year: string;
  status: Status;
  /** work = done for a company or client. side = a product of my own. */
  kind: 'work' | 'side';
  /** The one feature the case study focuses on; shown on the index card. */
  feature?: string;
  /** Hand-drawn callout next to the title on lists, e.g. "Featured". */
  badge?: string;
  url?: string;
  featured: boolean;
  cover?: string;
  /** Hero screen recording for the case study, in place of the cover. */
  video?: { src: string; poster: string; ratio: string; label: string };
  /** The cover's own proportions on the index card, so nothing gets cropped. */
  coverRatio?: string;
  /** A playable demo anyone can open. */
  demo?: string;
  /** The live product, as the case study's one action when there is no demo. */
  website?: string;
  /** Label for that action; defaults to "Visit website". */
  websiteLabel?: string;
  /**
   * The short read: enough to judge the work without the detailed version.
   * One line up top, then a few labelled points. Supports [[…]], **…** and links.
   */
  tldr?: { lede: string; points: { label: string; text: string }[] };
  /** Square recordings shown side by side as the hero, in reading order. */
  heroLoops?: { src: string; poster: string; label: string }[];
  /** Placeholder for a hero that's still being made; wins over cover and screens. */
  heroTK?: string;
  /** A coded scene used as the hero (animated) and the cover (still); wins over everything. */
  scene?: 'fina';
  /** A composed cover (the app running off the frame) for Index and Projects; the hero stays as it is. */
  coverScene?: 'smb';
  /** Where the product lives, shown with logos in the case-study header. */
  channels?: { name: string; logo: string }[];
  /** The outcome told in prose, in place of the number tiles. Supports [label](url). */
  outcomeText?: string[];
  /** Portrait phone screens (10:16). First three form the cover. */
  screens?: string[];
  coverLabel?: string;
  meta: { label: string; value: string }[];
  summary: string[];
  problem: string;
  owned: string[];
  /** One zoomed screen under “What I built”. */
  ownedShot?: { src: string; ratio: string; alt: string };
  decisions: Decision[];
  beforeAfter?: { before: string; after: string };
  outcomes: { value: string; label: string }[];
  reflection: string;
  gallery: string[];
};

const allProjects: Project[] = [
  {
    slug: 'smb',
    feature: 'Use cases for the AI agent',
    kind: 'work',
    url: 'https://smb.co',
    title: 'SMB.co',
    company: 'SMB.co',
    logo: '/logos/smb-app.svg', logoFill: true,
    tagline: 'Pages that start the AI agent on a goal the owner already has.',
    year: '2024 – 2026',
    status: 'Shipped',
    featured: true,
    cover: '/work/smb/scan.jpg',
    coverRatio: '1936 / 1024',
    coverScene: 'smb',
    demo: '/proto/smb-use-cases.html',
    video: {
      src: '/work/smb/demo.mp4',
      poster: '/work/smb/demo-poster.jpg',
      ratio: '2040 / 1352',
      label: 'Screen recording: an owner checks how AI assistants see their café, gets a report, and saves a goal with six tasks.',
    },
    meta: [
      { label: 'Company', value: 'SMB.co' },
      { label: 'Role', value: 'Design Engineer' },
      { label: 'Team', value: 'Just me' },
      { label: 'Timeline', value: '2 weeks to launch' },
      { label: 'Built on', value: 'Cloudflare agents' },
      { label: 'Platform', value: 'Web' },
    ],
    summary: [
      'SMB.co is an AI agent for small business owners. It could already work with lists, rooms, goals and tasks, but owners had to know what to ask for. A use case starts from what they want instead: a page about one goal, like getting their café recommended by ChatGPT, that opens the agent with that goal already set.',
      'I designed and built it, from the front end to the agent skills. It shipped in two weeks.',
    ],
    problem:
      'Owners used the agent a lot, but conversations ended without a next step. It answered questions without connecting them to goals, tasks or the tools that could do the work. And owners who had never heard of SMB had no reason to start a conversation at all.',
    owned: [
      'The use case pages: one template every use case is built from',
      'The in-product flow: the chat, the loaders, the scan and the cards the agent builds',
      'The integrations the agent works through, like Google, Search Console, Square and Gmail',
      'The agent skills on Cloudflare: when a use case applies, what to ask and which capability to call',
    ],
    ownedShot: { src: '/work/smb/report.jpg', ratio: '1520 / 1290', alt: 'The report: named in 2 of 12 answers, and what to fix first, each fix tied to the answers it affects.' },
    decisions: [
      {
        title: 'Every use case gets its own page',
        body: 'Owners don’t look for “an AI agent”. They look for a way to get their café recommended by ChatGPT. So each use case starts as a page that names that goal in their words, shows what they’ll get and drops them into the agent with the goal already set. Search engines and AI assistants read the same pages, so each one also brings in owners searching for that goal.',
        media: { kind: 'shot', src: '/work/smb/landing.jpg', ratio: '2400 / 1300', alt: 'Use case page: “Get your business recommended by ChatGPT, Claude and Gemini”, next to an example answer and the plan that follows.' },
      },
      {
        title: 'A wait you can watch',
        body: 'The check takes about a minute, long enough for a spinner to feel broken. So the agent shows its work instead: the business on a 3D map of its block, built with three.js on OpenStreetMap data, with each check ticking off beside it and the places assistants named instead showing up around it. By the time the report lands, the owner has already seen where it comes from.',
        media: { kind: 'shot', src: '/work/smb/map.jpg', ratio: '1952 / 1120', alt: 'While the check runs: Riverbend Coffee on a 3D map of Fountain Square, six checks ticking off, and the assistants being asked.' },
      },
      {
        title: 'Any conversation can start one',
        body: 'A page is only one way in. Each use case is a skill the agent can trigger whenever it notices an owner working toward that goal, from any conversation: what to ask, which capability to use and when to stop. It’s also why one use case can end by suggesting the next.',
        media: { kind: 'shot', src: '/work/smb/next.jpg', ratio: '1464 / 450', alt: 'At the end of the check, the agent suggests three more use cases to run next.' },
      },
      {
        title: 'Owners never leave the conversation',
        body: 'When the agent creates a goal or tasks, the usual pattern is a link to the Goals or Tasks screen. That pulls the owner out of the chat at the moment they’ve decided to act. So goals and tasks show up in the chat as cards the owner edits and approves, and they’re saved there.',
        media: { kind: 'shot', src: '/work/smb/goal.jpg', ratio: '1536 / 1336', alt: 'The goal and its six tasks, saved from inside the chat.' },
      },
    ],
    outcomes: [
      { value: '0 → 150', label: 'Goals created' },
      { value: '2 weeks', label: 'Start to launch' },
      { value: '3', label: 'Use cases live' },
    ],
    outcomeText: [
      '((Owners went from 0 to 150 goals created)). The layer shipped in **two weeks**, and **three use cases** were live when I left, including [Get recommended by AI](https://smb.co/use-cases/get-recommended-by-ai) and [Find customers like your best ones](https://smb.co/use-cases/find-customers-like-your-best-ones).',
      'Use cases run on capabilities the agent already has, so the next one is a page and a skill to write.',
    ],
    reflection: '',
    gallery: [],
    tldr: {
      lede: 'I designed and built use cases for SMB.co’s AI agent: pages that each name a goal a small business owner already has, and agent skills that take them through it. It shipped in **two weeks**.',
      points: [
        { label: 'Problem', text: 'Owners used the agent a lot, but conversations ended without a next step, and owners who had never heard of SMB had no reason to start one.' },
        { label: 'What I did', text: 'A page template every use case is built from, the in-chat flow (live scan, report, goal and task cards), the integrations and the agent skills on Cloudflare.' },
        { label: 'Key call', text: 'Each use case is also a skill, so the agent can start it from any conversation. Goals and tasks are saved as cards in the chat, so owners never have to leave it.' },
        { label: 'Result', text: '**Three use cases** were live when I left, and adding another takes a page and a skill. ((Owners went from 0 to 150 goals)).' },
      ],
    },
  },
  {
    slug: 'fina',
    feature: 'A money assistant with no app',
    kind: 'side',
    title: 'Fina',
    company: 'Project',
    logo: '/logos/fina.svg',
    logoFill: true,
    url: 'https://finamoney.co',
    badge: 'Featured',
    tagline: 'Money assistant in WhatsApp and ChatGPT.',
    year: '2026',
    status: 'Live',
    featured: true,
    cover: 'https://res.cloudinary.com/dfwi6dpkz/image/upload/v1769529235/Fina_6_ajl5hj.jpg',
    website: 'https://finamoney.co',
    scene: 'fina',
    channels: [
      { name: 'WhatsApp', logo: '/logos/channels/whatsapp.svg' },
      { name: 'ChatGPT', logo: '/logos/channels/chatgpt.png' },
      { name: 'Claude', logo: '/logos/channels/claude.png' },
    ],
    meta: [
      { label: 'Role', value: 'Design and code' },
      { label: 'Team', value: 'Just me' },
      { label: 'Timeline', value: 'Sep 2026 – Now' },
    ],
    summary: [
      'Fina is a money assistant with no app to open. It turns the notifications your bank already sends into a record of every purchase, and you ask it things like how much you spent this week or when your card is due, in WhatsApp, ChatGPT or Claude.',
      'I designed and built it, from the capture pipeline to the way it talks, and launched it at the end of October 2026.',
    ],
    problem:
      'Most of Latin America has no open banking that people can actually connect to, so every finance app falls back on the same thing: typing in every purchase. I tried for years, with apps and spreadsheets, and it never lasted. But almost every bank in the region already sends a push notification or an email for each purchase. That data was already on my phone, and nothing was reading it. My first try, a year earlier, stalled: iOS couldn’t pass notifications on reliably, and I didn’t trust the models with money yet.',
    owned: [
      'Capture: an iOS Shortcut and an Android app that forward bank notifications, plus Gmail, Outlook and PDF statements',
      'The pipeline: every notification saved first, read by AI, then matched, deduplicated and categorised',
      'The WhatsApp agent, and the MCP server behind the official ChatGPT plugin and the Claude connector, which is in review',
      'The money model: accounts, cards and their billing cycles, subscriptions, expected income and seven currencies',
      'The voice, the onboarding and the site at [finamoney.co](https://finamoney.co)',
    ],
    decisions: [
      {
        title: 'No app, just the chats you already use',
        body: 'An app is one more place to remember to open, and every finance app I tried, I eventually stopped opening. People in Latin America already spend the day in WhatsApp, so Fina lives there, and the same tools run as an MCP server: an [official plugin in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6ada95c2df48819199322a8e97725d2f), with the Claude version in review. It’s one backend, so a purchase logged from a notification can be asked about from any of them.',
        media: { kind: 'shot', bare: true, src: '/work/fina/channels.jpg', ratio: '1920 / 1080', alt: 'The same question, “How much did I spend this week?”, answered by Fina in WhatsApp, ChatGPT and Claude.' },
      },
      {
        title: 'Capture first, everything else later',
        body: 'An amount and an account are enough for a purchase to count. The category, the merchant and the rest are worked out afterwards, in a job of their own, so a notification that lands at 11pm shows up in the total right away. When something can’t be worked out, it stays visible in review instead of being guessed or quietly dropped.',
        media: { kind: 'shot', bare: true, src: '/work/fina/capture.jpg', ratio: '1920 / 1080', alt: 'A bank notification for an Uber ride, and minutes later ChatGPT answering from Fina with the purchase it logged.' },
      },
      {
        title: 'One purchase, many notifications',
        body: 'The same Uber ride can arrive three times: a push from the bank, Apple Wallet and an email from the bank, not always in the same currency. Merging on amount, merchant and day would also merge two real rides, so Fina only merges with enough evidence (the account, references, time and status) and keeps every notification on the one purchase. When it isn’t sure, it asks instead of picking.',
        media: { kind: 'shot', bare: true, src: '/work/fina/merge.jpg', ratio: '1920 / 1080', alt: 'One Uber ride, three notifications: the bank’s push, Apple Wallet in pesos and the bank’s email. Fina logged it once.' },
      },
      {
        title: 'Two currencies, still one purchase',
        body: 'Apple Wallet says MXN 1,000 and the Colombian card that paid says COP 220,000, for the same purchase. Fina keeps both the original amount and the amount charged. Its own daily exchange rate only narrows down the candidates; it can’t confirm a match by itself, because the bank’s rate, fees and settlement date never line up exactly.',
      },
      {
        title: 'Fina speaks first',
        body: 'Fina doesn’t wait to be asked. It sends a weekly analysis on WhatsApp, warns you when a card is close to its limit or its statement is about to close, reminds you when a payment is due, and asks about purchases it couldn’t place. The numbers come from the backend. The model only puts them into words, in the voice of a friend who’s good with money.',
        media: { kind: 'shot', bare: true, src: '/work/fina/proactive.jpg', ratio: '1920 / 1080', alt: 'Fina starts the conversation with a heads-up, and one tap shows that a card is close to its limit. Every nudge includes a way to turn them off.' },
      },
    ],
    outcomes: [],
    outcomeText: [
      'In the **22 days** since launch, **60 people** signed up and Fina has captured **almost 1,000 purchases** in **seven currencies**. I’ve merged **132 pull requests** since mid-October.',
      '((Fina is now an official ChatGPT plugin)), listed in [ChatGPT’s plugin directory](https://chatgpt.com/plugins/plugin_asdk_app_6ada95c2df48819199322a8e97725d2f), and the Claude version is in review.',
      'It’s still early. What I’m working on now is the proactive side: which messages people act on, and which ones are just noise.',
    ],
    reflection: '',
    gallery: [],
    tldr: {
      lede: 'Fina is a money assistant with no app: it turns the notifications your bank already sends into a record of every purchase, and you talk to it in WhatsApp, ChatGPT or Claude. I designed and built it.',
      points: [
        { label: 'Problem', text: 'Most of Latin America has no open banking people can connect to, so finance apps fall back on typing in every purchase, and nobody keeps that up.' },
        { label: 'What I did', text: 'Capture from bank notifications, email and PDF statements; an AI pipeline that matches, deduplicates and categorises; the WhatsApp agent and an MCP server, now an official ChatGPT plugin and in review for Claude.' },
        { label: 'Key call', text: 'Fina lives in the chats people already use instead of an app. It logs a purchase as soon as it has an amount and an account, and asks when it isn’t sure instead of guessing.' },
        { label: 'Result', text: '**60 people** and **almost 1,000 purchases** in **seven currencies** in the first 22 days, and **132 pull requests** merged since mid-October. ((It’s now an official ChatGPT plugin)), and the Claude version is in review.' },
      ],
    },
  },
  {
    slug: 'curio',
    feature: 'Learn something, then explain it',
    kind: 'side',
    title: 'Curio',
    company: 'Project',
    logo: '/logos/curio.png',
    logoFill: true,
    url: 'https://apps.apple.com/us/app/curio-learn-anything/id6808692712',
    tagline: 'Learn anything in short sessions.',
    year: '2026',
    status: 'Live',
    featured: true,
    website: 'https://apps.apple.com/us/app/curio-learn-anything/id6808692712',
    websiteLabel: 'App Store',
    cover: '/work/curio/cover.jpg',
    coverRatio: '1672 / 941',
    heroLoops: [
      { src: '/work/curio/hero-start.mp4', poster: '/work/curio/hero-start.jpg', label: 'Curio onboarding: replace scrolling with ideas worth sharing' },
      { src: '/work/curio/hero-badge.mp4', poster: '/work/curio/hero-badge.jpg', label: 'Unlocking the Bright Mind badge after a lesson' },
    ],
    meta: [
      { label: 'Role', value: 'Design and code' },
      { label: 'Team', value: 'Just me' },
      { label: 'Timeline', value: '2026' },
      { label: 'Platform', value: 'iPhone, English and Spanish' },
    ],
    tldr: {
      lede: 'Curio is an iPhone app for learning something new in a few minutes and then explaining it in your own words, out loud, with feedback on how you said it. I designed and built it, and it’s live on the App Store.',
      points: [
        { label: 'Problem', text: 'I was losing hours to doomscrolling. I wanted something as easy to open as a feed that left me knowing more, and better at putting ideas into words.' },
        { label: 'What I did', text: 'Visual lessons on any topic you pick, built from an engine of components (charts, flashcards, interactive pieces), a speaking practice that grades your explanation in real time with ElevenLabs, and XP, streaks, badges, quests and friends to come back to.' },
        { label: 'Key call', text: 'There’s no quiz at the end of a lesson. Instead, ((you get feedback on how clearly you can explain it out loud)).' },
        { label: 'Result', text: 'Shipped end to end and live on the App Store in English and Spanish, with Curio Premium subscriptions. It’s paused for now while I focus on other work.' },
      ],
    },
    summary: [
      'Curio is an iPhone app for learning something new in a few minutes and then explaining it in your own words. You go through a short lesson, check what you understood, and then say it back out loud, and Curio tells you how clearly you said it and what to work on.',
      'I designed and built it, from the lessons to the speaking practice and the subscription, and it’s live on the App Store in English and Spanish.',
    ],
    problem:
      'I was spending too much time doomscrolling, an hour gone with nothing to show for it. I wanted something just as easy to open that left me knowing more. Learning apps mostly ask you to read and tap the right answer, but the part I was missing was explaining things, the ideas and the tech I work with every day, out loud and clearly.',
    owned: [
      'The lesson engine: pick any topic and Curio builds a visual lesson with questions along the way, choosing from a set of components (charts, flashcards, interactive pieces) to fit what you’re learning',
      'Speaking practice: you explain what you learned out loud, and Curio listens through the ElevenLabs real-time API and grades clarity, structure, filler words and accuracy',
      'Originals and ideas: Curio Originals and suggested topics for the days you don’t know what to pick',
      'Progress and play: XP, streaks, badges, quests and friends',
      'Curio Premium: weekly, monthly and yearly subscriptions through the App Store',
    ],
    decisions: [
      {
        title: 'You learn it by saying it',
        body: 'Most learning apps check understanding with multiple choice, which only shows you can recognise an answer. Curio ends each lesson by asking you to ((put it in your own words and say it back)). It listens through the ElevenLabs real-time API and grades how you did: clarity, structure, filler words and whether you got the main point. While it works, the report shows each step it’s checking, so the wait reads as progress, and it ends with the one thing to work on next.',
        media: { kind: 'loop', src: '/work/curio/explain.mp4', poster: '/work/curio/explain.jpg', alt: 'Preparing the communication report, then the score and the breakdown of understanding, structure and clarity.' },
      },
      {
        title: 'Lessons on any topic you pick',
        body: 'A fixed course runs out, or covers things you don’t care about. In Curio you pick a topic and it creates a visual lesson with questions along the way. Each lesson is built from a set of components (charts, flashcards, interactive pieces), picked to fit the topic. Suggested topics and Curio Originals are there for the days you don’t know what to pick.',
        media: { kind: 'loop', src: '/work/curio/lesson.mp4', poster: '/work/curio/lesson.jpg', alt: 'Creating a lesson: picking one of the suggested questions and the lesson that Curio builds from it.' },
      },
      {
        title: 'Built to replace the scroll',
        body: 'Curio started as a way out of doomscrolling, so it borrows what makes a feed easy to come back to and points it somewhere better: sessions of a few minutes, XP for every lesson, streaks, badges, quests and friends. You can go from black holes to why the 2008 financial crisis happened and get XP for both.',
        media: { kind: 'loop', src: '/work/curio/rewards.mp4', poster: '/work/curio/rewards.jpg', alt: 'Finishing a lesson: “Nice work!”, +20 XP and a new badge.' },
      },
    ],
    outcomes: [],
    outcomeText: [
      'Curio is live on the App Store for iPhone, in English and Spanish, with Curio Premium subscriptions. I took it from an idea to a paid product: the lesson engine, the speaking practice, the progress system and the subscription. It’s paused for now while I focus on other work, and it stays up for anyone who wants to try it.',
      'What I’d keep from it: the speaking practice is the part people remember, because no other learning app asks you to do it. A grade that takes a few seconds felt broken until the report showed each step it was checking. And streaks and XP are easy to add, but they only work on top of a lesson that’s worth finishing.',
    ],
    reflection: '',
    gallery: [],
  },
];

export const workProjects = allProjects.filter((p) => p.kind === 'work');
export const sideProjects = allProjects.filter((p) => p.kind === 'side');

/** Own products for the Projects page. Both have a case study. */
export const products: {
  key: string;
  title: string;
  tagline: string;
  year: string;
  logo: string;
  /** Case study on this site, if there is one. */
  slug?: string;
  url: string;
  /** Short label for the link, e.g. the domain. */
  urlLabel: string;
  about: string;
  screens?: string[];
  /** A 16:10 picture, used when there are no phone screens. */
  cover?: string;
  /** A coded scene, shown still; wins over screens and cover. */
  scene?: 'fina';
  coverRatio?: string;
}[] = [
  {
    key: 'fina',
    title: 'Fina',
    tagline: 'Money assistant in WhatsApp and ChatGPT.',
    year: '2026',
    logo: '/logos/fina.svg',
    slug: 'fina',
    url: 'https://finamoney.co',
    urlLabel: 'finamoney.co',
    about:
      'Fina reads the purchase notifications your bank already sends and logs each one, and answers questions about your money in WhatsApp and ChatGPT.',
    scene: 'fina',
    screens: [
      `${CLD}/v1769529234/Fina_5_y8xtjq.jpg`,
      `${CLD}/v1769529235/Fina_6_ajl5hj.jpg`,
      `${CLD}/v1769536520/Fina_10_ata5jc.jpg`,
    ],
  },
  {
    key: 'curio',
    title: 'Curio',
    tagline: 'Learn anything in short sessions.',
    year: '2026',
    logo: '/logos/curio.png',
    slug: 'curio',
    url: 'https://apps.apple.com/us/app/curio-learn-anything/id6808692712',
    urlLabel: 'App Store',
    cover: '/work/curio/cover.jpg',
    coverRatio: '1672 / 941',
    about: 'Curio turns any topic into a short lesson on iPhone, then has you explain it out loud and tells you how clearly you said it. XP, streaks, badges and friends keep you coming back.',
  },
];
/** Work first, then own projects. Drives routes, sitemap and "next project". */
export const projects = [...workProjects, ...sideProjects];

export type Role = {
  company: string;
  role: string;
  years: string;
  logo?: string;
  logoFill?: boolean;
  monogram?: string;
  /** Case study on this site. */
  slug?: string;
  url?: string;
};

export const career: Role[] = [
  { company: 'Kiiex', role: 'Design Engineer', years: '2026 – Now', logo: '/logos/kiiex.png', logoFill: true, url: 'https://kiiex.io' },
  { company: 'SMB.co', role: 'Design Engineer', years: '2024 – 2026', logo: '/logos/smb-app.svg', logoFill: true, slug: 'smb', url: 'https://smb.co' },
  { company: 'Mvnifest', role: 'Design Engineer', years: '2023 – 2024', logo: '/logos/mvnifest-app.svg', logoFill: true, url: 'https://mvnifest.com' },
  { company: 'Mercado Libre', role: 'Senior Product Designer', years: '2021 – 2023', logo: '/logos/mercadolibre-app.jpg', logoFill: true, url: 'https://www.mercadolibre.com.mx/l/crear-clip' },
];

/**
 * "Where I've worked" on the index: one-colour marks in chips, coloured with
 * the brand on hover. Dates for the agencies still need confirming.
 */
export const workplaces: {
  name: string;
  url: string;
  years?: string;
  mark: string;
  markW?: number;
  /** Hover fill: a colour or a gradient. */
  bg: string;
  fg: string;
  /** Full-colour logo shown on hover instead of a fill, when the brand is the picture itself. */
  color?: string;
  /** The colour logo is an app icon: it fills the whole tile. */
  colorFill?: boolean;
}[] = [
  { name: 'Kiiex', url: 'https://kiiex.io', years: '2026 – now', mark: '/logos/marks/kiiex.png', markW: 15, bg: 'transparent', fg: 'transparent', color: '/logos/kiiex.png', colorFill: true },
  { name: 'SMB.co', url: 'https://smb.co', years: '2024 – 2026', mark: '/logos/marks/smb.svg', bg: '#9f86ff', fg: '#ffffff' },
  { name: 'Mvnifest', url: 'https://mvnifest.com', years: '2023 – 2024', mark: '/logos/marks/mvnifest.svg', bg: '#111111', fg: '#ffffff' },
  { name: 'Mercado Libre', url: 'https://www.mercadolibre.com', years: '2021 – 2023', mark: '/logos/marks/mercadolibre.svg', markW: 16, bg: 'transparent', fg: 'transparent', color: '/logos/marks/mercadolibre-color.svg' },
  { name: 'Creme', url: 'https://www.creme.digital/', mark: '/logos/marks/creme.svg', markW: 11, bg: '#000000', fg: '#ffffff' },
  { name: 'Pixelspace', url: 'https://pixelspace.com', mark: '/logos/marks/pixelspace.svg', markW: 12, bg: '#ff1560', fg: '#ffffff' },
];

/** Past clients. URL only where the live site is confirmed. */
export const clients: { name: string; url?: string; note?: string }[] = [
  { name: 'Creme', url: 'https://www.creme.digital/' },
  { name: 'Korhex', url: 'https://korhex.com' },
  { name: 'Hubents', url: 'https://hubents.com' },
  { name: 'ConceptLAB' },
  { name: 'Pixelspace', url: 'https://pixelspace.com' },
];

/**
 * Each quote is shown on a card in the client's own brand, as on wireframe.co.
 * [[ConceptLAB brand colour and logo: confirm; using a neutral ink card for now.]]
 */
export const testimonials = [
  {
    quote:
      'Steve is a true UX rockstar. He worked incredibly fast, understood the problem almost immediately, and constantly pushed the quality of the work higher.',
    name: 'Mike Hillenmeyer',
    role: 'Co-founder',
    company: 'SMB.co',
    avatar: '/mike.jpg',
    brand: { bg: '#0e0d12', glow: '#9F86FF', fg: '#ffffff', wordmark: '/logos/smb-wordmark-white.svg' },
  },
  {
    quote:
      'It was such a pleasure working with Steve! He delivered perfection and he gave me true ease knowing that he’s handling the project from beginning to end.',
    name: 'Eli Glanz',
    role: 'CEO',
    company: 'ConceptLAB',
    avatar: '/eliglanz.png',
    brand: { bg: '#0d121c', glow: '#5b8cff', fg: '#ffffff', wordmark: undefined },
  },
];

export type Shot = {
  id: string;
  src: string;
  title: string;
  note: string;
  kind: 'Mobile' | 'Web' | 'System';
  year: string;
};

export const shots: Shot[] = [
  { id: 'crypto', src: cld('crypto_wallet_xjkhvr'), title: 'Crypto onboarding', note: 'Three-step onboarding for an AI crypto trading app.', kind: 'Mobile', year: '2025' },
  { id: 'wallet', src: cld('wallet_ihboqi'), title: 'Personal wallet', note: 'Net-worth overview and card customisation.', kind: 'Mobile', year: '2025' },
  { id: 'domains', src: cld('namecheap_extois'), title: 'Domain manager', note: 'Hosting and domain list, light.', kind: 'Web', year: '2025' },
  { id: 'domains-dark', src: cld('namecheapdark_fu2v38'), title: 'Domain manager, dark', note: 'Same surface, dark theme.', kind: 'Web', year: '2025' },
  { id: 'smb-dash', src: cld('smb_dashboard_h3yqu0'), title: 'Requests inbox', note: 'Deal requests with an assistant side panel.', kind: 'Web', year: '2025' },
  { id: 'agent', src: cld('agent_ilkvew'), title: 'Agent console', note: 'Run logs and tools for an AI agent.', kind: 'Web', year: '2025' },
  { id: 'palette', src: cld('pallet_h4n09h'), title: 'Kanban board', note: 'Pipeline board with avatars and tags.', kind: 'System', year: '2025' },
  { id: 'mobile', src: cld('Mobile_App_ynnfnc'), title: 'Live event story', note: 'Vertical story card for a live freediving event.', kind: 'Mobile', year: '2025' },
  { id: 'oxxly', src: cld('oxxly_swluxa'), title: 'Daily planner', note: 'Warm, playful planner home screen.', kind: 'Mobile', year: '2025' },
  { id: 'concept', src: cld('concept_u2osi7'), title: 'Collection detail', note: 'Specimen detail page for a collecting app.', kind: 'Mobile', year: '2025' },
];
