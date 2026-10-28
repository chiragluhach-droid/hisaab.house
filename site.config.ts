/**
 * HISAAB HOUSE — site config
 * ---------------------------------------------------------------
 * Every piece of copy, price, number, link and WhatsApp message on the
 * site lives here. Edit this file, save, and rebuild — no component
 * changes needed.
 *
 * Search for "TODO" to find everything that still needs your input.
 */

export type ProductId = "guide" | "founder";

export type Product = {
  id: ProductId;
  name: string;
  /** Price in INR. `null` shows `priceLabel` instead (e.g. "Price on request"). */
  price: number | null;
  priceLabel?: string;
  tagline: string;
  /** Shown on the card as a highlighted badge. */
  badge?: string;
  /** Pre-filled WhatsApp message for this product. */
  message: string;
  /**
   * Where the buy button goes. Leave `null` to open WhatsApp with `message`.
   * When you add a payment gateway later, put its checkout URL here.
   */
  buyUrl: string | null;
  cta: string;
  /** Feature ids (see `features` below) this product includes. */
  includes: string[];
  /** Short bullets for the pricing card (defaults to the `includes` labels). The first one is highlighted. */
  cardLines?: string[];
};

const config = {
  site: {
    name: "Hisaab House",
    wordmark: "HISAAB HOUSE",
    /** Used for the sitemap, canonical URL and social previews. No trailing slash. */
    url: "https://hisaabhouse.netlify.app",
    title: "Hisaab House — The system behind faceless AI story reels",
    description:
      "The complete step-by-step workflow behind @hisaab.house: script, AI voice, consistent characters and edit. 5M+ views & interactions in 7 days.",
    themeColor: "#141110",
    locale: "en_IN",
  },

  contact: {
    instagramHandle: "hisaab.house",
    instagramUrl: "https://www.instagram.com/hisaab.house/",
    /** International format, digits only — used to build wa.me links. */
    whatsappNumber: "918130809374",
    replyTime: "We usually reply within 1–2 hours.",
  },

  /** Names shown on the Privacy Policy and Terms pages. */
  legal: {
    businessName: "Hisaab House",
    contactPhone: "+91 81308 09374",
    contactEmail: null as string | null, // TODO: add an email address if you have one
    jurisdiction: "India", // TODO: add your city/state, e.g. "New Delhi, India"
    lastUpdated: "27 October 2026",
  },

  /** Navigation. `hint` shows under each link in the mobile menu; `desktop: false` keeps a link out of the desktop header. */
  nav: [
    { id: "work", label: "Work", hint: "The series and its covers" },
    { id: "process", label: "Process", hint: "Six steps, idea to vote" },
    { id: "inside", label: "What's inside", hint: "Every chapter of the guide", desktop: false },
    { id: "founders", label: "Founder's Pass", hint: "Your @ in the story" },
    { id: "passes", label: "Pricing", hint: "Guide or Founder's Pass" },
    { id: "faq", label: "FAQ", hint: "Payment, delivery and tools" },
  ],

  /** WhatsApp messages that aren't tied to a product. */
  messages: {
    general: "Hi Hisaab House, I have a question about the Hisaab Guide.",
  },

  stats: {
    followers: { value: 25.7, suffix: "K", decimals: 1, label: "Followers" },
    views7d: { value: 5, suffix: "M+", decimals: 0, label: "Views & interactions (7 days)" },
    topEpisode: { value: 2.5, suffix: "M+", decimals: 1, label: "Top episode" },
  },

  hero: {
    eyebrow: "AI story reels",
    headline: "The system behind 25K+ followers in 7 days.",
    /** Part of the headline shown in mustard. */
    highlight: "25K+",
    subheadline:
      "Faceless AI story reels — script, voice, visuals and edit. The complete workflow, step by step.",
    /** Scrolls to the pricing section. */
    primaryCta: "Get the pass",
    secondaryCta: "See what's inside",
  },

  video: {
    src: "https://res.cloudinary.com/dffvbp9to/video/upload/q_auto,f_auto/v1793162048/hisaab-promo-silent_1_xlfyhh.mp4",
    original:
      "https://res.cloudinary.com/dffvbp9to/video/upload/v1793162048/hisaab-promo-silent_1_xlfyhh.mp4",
    poster:
      "https://res.cloudinary.com/dffvbp9to/video/upload/so_15,q_auto,f_auto/v1793162048/hisaab-promo-silent_1_xlfyhh.jpg",
    /** Smaller poster for phones (Cloudinary resizes on the fly). */
    posterMobile:
      "https://res.cloudinary.com/dffvbp9to/video/upload/so_15,w_600,q_auto,f_auto/v1793162048/hisaab-promo-silent_1_xlfyhh.jpg",
    aspect: "3 / 4",
    label: "Promo · 0:18",
  },

  series: {
    title: "Har Note Ka Hisaab Hota Hai",
    premise:
      "An interactive story told in Hinglish. You've stolen ₹10 crore. Each episode shows a real Indian law that catches you — and the comments vote on what happens next.",
    format: [
      "AI-generated cartoon stills with consistent characters",
      "Word-synced captions",
      "On-screen status HUD",
      "Animated fact cards",
      "AI voiceover",
      "A comment-vote cliffhanger at the end of every episode",
    ],
    /**
     * Episode covers. Put images in /public/art/covers/ named by `cover`
     * (e.g. ep-1.jpg). `views: null` hides the count.
     * TODO: replace each `url` with the reel's link.
     */
    episodes: [
      { no: "01", title: "Ek Ton", views: null as string | null, cover: "covers/ep-1", url: "https://www.instagram.com/hisaab.house/" }, // TODO: Ep 1 views + reel URL
      { no: "02", title: "Deewaron Ke Kaan", views: "295K", cover: "covers/ep-2", url: "https://www.instagram.com/hisaab.house/" }, // TODO: reel URL
      { no: "03", title: "Shagun", views: "383K", cover: "covers/ep-3", url: "https://www.instagram.com/hisaab.house/" }, // TODO: reel URL
      { no: "04", title: "Khabri", views: "270K", cover: "covers/ep-4", url: "https://www.instagram.com/hisaab.house/" }, // TODO: reel URL
      { no: "05", title: "Seth", views: "134K", cover: "covers/ep-5", url: "https://www.instagram.com/hisaab.house/" }, // TODO: reel URL
      { no: "FINALE", title: "Aakhri Hisaab", views: "78.3K", cover: "covers/finale", url: "https://www.instagram.com/hisaab.house/" }, // TODO: reel URL
    ],
    /** Character art in /public/art/cast/. */
    cast: [
      { name: "The Protagonist", note: "Maroon beanie · mustard hoodie", image: "cast/main" },
      { name: "Bunty", note: "Recurring character", image: "cast/bunty" },
      { name: "Seth", note: "Recurring character", image: "cast/seth" },
    ],
  },

  /** Ticker below the hero. Stats + episode titles are added automatically. */
  ticker: ["Har Note Ka Hisaab Hota Hai"],

  process: [
    { icon: "idea", title: "Idea", text: "Pick a story with stakes and a hook that lands in the first 3 seconds." },
    { icon: "script", title: "Script", text: "Write tight Hinglish beats that end on a vote-worthy cliffhanger." },
    { icon: "voice", title: "Voice", text: "Generate a natural AI voiceover with reusable prompt templates." },
    { icon: "visuals", title: "Characters & visuals", text: "Keep every character consistent across scenes with character sheets." },
    { icon: "edit", title: "Edit & motion graphics", text: "Word-synced captions, a status HUD and animated fact cards." },
    { icon: "publish", title: "Publish & vote", text: "Cover, caption, post — then turn the comments into the next episode." },
  ],

  inside: {
    playbook: {
      title: "The Hisaab Guide",
      meta: "PDF · optional Notion version",
      chapters: [
        { title: "Finding a story", text: "Where ideas come from and how to hook viewers in the first 3 seconds." },
        { title: "Scripting with vote cliffhangers", text: "Structure each episode so the audience decides what happens next." },
        { title: "AI voiceover", text: "Getting a natural read, with prompt templates." },
        { title: "Consistent characters", text: "Character sheets and prompts that keep faces and outfits the same across AI images." },
        { title: "Editing", text: "Captions, the status HUD and motion graphics." },
        { title: "Covers, captions & posting", text: "Packaging each reel so it gets the tap." },
        { title: "Managing comments", text: "Running the vote and keeping the conversation going." },
        { title: "Growth", text: "Turning one series into a page that keeps growing." },
        { title: "Bonus: prompt templates", text: "The prompt templates I use." },
        { title: "Bonus: production checklist", text: "Every step from idea to post, on one page." },
      ],
    },
  },

  /** Every feature that can appear in the comparison. */
  features: [
    { id: "story", label: "Your @ as a character in the series" },
    { id: "playbook", label: "Step-by-step guide (PDF + Notion)" },
    { id: "prompts", label: "Prompt templates (voice + characters)" },
    { id: "checklist", label: "Production checklist" },
    { id: "call", label: "1:1 call to plan your first series" },
  ],

  products: [
    {
      id: "guide",
      name: "Hisaab Guide",
      price: 499,
      tagline: "Everything I do to make these reels, step by step — plus a 1:1 call.",
      message: "Hi Hisaab House, I'd like to purchase the Hisaab Guide (₹499).",
      buyUrl: null,
      cta: "Get the Guide · ₹499",
      includes: ["playbook", "prompts", "checklist", "call"],
    },
    {
      id: "founder",
      name: "Founder's Pass",
      price: 999,
      tagline: "Become a character in Har Note Ka Hisaab Hota Hai. The full guide comes with it.",
      badge: "Be in the story",
      message: "Hi Hisaab House, I'd like to purchase the Founder's Pass (₹999).",
      buyUrl: null,
      cta: "Become a Founder · ₹999",
      includes: ["story", "playbook", "prompts", "checklist", "call"],
      cardLines: ["Be a part of the story", "Your @ as a character in the series", "(Guide included & 1:1 call)"],
    },
  ] satisfies Product[] as Product[],

  /** The "Your @ in the story" section for the Founder's Pass. */
  founders: {
    eyebrow: "Founder's Pass",
    headline: "Your @ in the story.",
    /** Part of the headline shown in mustard. */
    highlight: "in the story.",
    text: "Founders become characters in Har Note Ka Hisaab Hota Hai — your Instagram @, part of the series. The full Hisaab Guide comes with it.",
    // TODO: describe how a founder's character shows up (e.g. named on screen, on the case board).
    ticketNote: "Character in the series",
    steps: [
      { title: "Get the pass", text: "Tap the button — WhatsApp opens with your message ready." },
      { title: "Send your @", text: "Pay, then reply with your Instagram handle." },
      { title: "We write you in", text: "Your @ becomes a character in the story." },
      { title: "You're in the series", text: "Spot yourself as the story unfolds." },
    ],
  },

  pricingNote:
    "Message us on WhatsApp to purchase — we'll share payment details and deliver everything there. We usually reply within 1–2 hours.",

  audience: {
    for: [
      "Creators who want to grow without showing their face",
      "Storytellers who'd rather write than film",
      "Anyone curious how an AI story series is actually produced, step by step",
      "People ready to put in the hours to make one episode well",
    ],
    notFor: [
      "Anyone looking for guaranteed views or overnight results",
      "People who want a fully automated, one-click reel generator",
      "Creators who don't want to write their own stories",
    ],
  },

  faq: [
    {
      q: "Do I need a camera or to show my face?",
      a: "No. Every reel is made from AI-generated stills, an AI voiceover and on-screen text. You never appear on camera.",
    },
    {
      q: "Which tools do I need, and what do they cost?",
      a: "You need an AI image tool, an AI voice tool and a video editor. The playbook covers the tools used at each step. TODO: list the exact tools and their monthly cost here.",
    },
    {
      q: "How do I pay and receive the guide?",
      a: "Tap any buy button and WhatsApp opens with a pre-filled message. We reply with payment details, and once payment is confirmed we deliver the guide on WhatsApp and set up your 1:1 call there.",
    },
    {
      q: "What does \"your @ in the story\" mean?",
      a: "With the Founder's Pass, your Instagram @ becomes a character in Har Note Ka Hisaab Hota Hai — you're part of the series. You also get the full Hisaab Guide and the 1:1 call. TODO: describe how a founder's character shows up.",
    },
    {
      q: "What language is the content in?",
      a: "TODO: confirm the language of the guide (e.g. English, or Hinglish). The example series itself is in Hinglish.",
    },
    {
      q: "Can I ask questions after purchase?",
      a: "Yes. Message us on WhatsApp — the same chat you bought through. TODO: say how long post-purchase support lasts.",
    },
  ],

  closing: {
    eyebrow: "Case open",
    headline: "Start your first series.",
    text: "Questions before you buy? Message us — we'll help you pick the guide or the Founder's Pass.",
    cta: "Chat on WhatsApp",
    /** ISO date of the next launch, e.g. "2026-11-15T19:00:00+05:30". `null` hides the countdown. */
    nextLaunch: null as string | null,
    nextLaunchLabel: "Next launch in",
  },

  footer: {
    note: "The guide is delivered on WhatsApp after payment.",
  },
};

export default config;
export type SiteConfig = typeof config;
