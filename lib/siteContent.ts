export type SiteSectionId =
  | "intro"
  | "doctor"
  | "team"
  | "solutions"
  | "stories"
  | "faq"
  | "accreditations"
  | "offices";

export type DoctorProfile = {
  id: string;
  name: string;
  role: string;
  summary: string;
  highlights: [string, string, string, string];
  image: string;
  noteLeft: string;
  noteRight: string;
  accent: string;
  portraitScale?: string;
  portraitPosition?: string;
};

export type SolutionCase = {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  image?: string;
  imageAlt?: string;
  mediaCaption?: string;
};

export type ReviewStory = {
  id: number;
  author: string;
  location: string;
  rating: number;
  text: string;
};

export const DOCTOR_PROFILES: DoctorProfile[] = [
  {
    id: "ahmed-altan",
    name: "Dr Ahmed Altan",
    role: "Chief Surgeon",
    summary:
      "A deliberately limited treatment calendar, direct surgeon involvement, and a calm operating rhythm define the clinic's lead voice.",
    highlights: [
      "Personally leads extraction, channel planning, and the most critical placement decisions.",
      "Keeps the monthly surgical volume intentionally low to protect consistency and focus.",
      "Builds natural density strategies around facial structure, donor discipline, and long-term growth.",
      "Frames the clinic's standard for surgical restraint, recovery pacing, and visual credibility.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Chief Surgeon",
    noteRight: "Hairline Direction",
    accent: "#6d8168",
    portraitScale: "1.08",
    portraitPosition: "center bottom",
  },
  {
    id: "selin-kaya",
    name: "Dr Selin Kaya",
    role: "Associate Surgeon",
    summary:
      "Focused on frontal framing, temple softening, and a cleaner graft rhythm for patients who need a more conservative visual reset.",
    highlights: [
      "Specialises in soft frontal transitions that keep the hairline natural at conversational distance.",
      "Supports reconstruction planning for scar softening, density balance, and repaired visual continuity.",
      "Works closely on graft distribution so recipient zones feel calm rather than over-built.",
      "Carries a quieter aesthetic language that suits subtle restoration and female pattern cases.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Associate Surgeon",
    noteRight: "Frontal Design",
    accent: "#927c67",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "kerem-aydin",
    name: "Dr Kerem Aydin",
    role: "Facial Hair Specialist",
    summary:
      "Extends the clinic's work into beard design, reconstruction detail, and aftercare decisions that keep growth patterns believable.",
    highlights: [
      "Leads beard and facial-zone planning where angle, direction, and density must stay discreet.",
      "Supports repair cases that need calmer sequencing instead of aggressive one-session density.",
      "Coordinates recovery-phase judgement so shock loss, swelling, and regrowth expectations stay managed.",
      "Adds a more technical lens to reconstruction and post-op continuity across combined procedures.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Facial Hair Focus",
    noteRight: "Reconstruction",
    accent: "#51644c",
    portraitScale: "1.02",
    portraitPosition: "center bottom",
  },
  {
    id: "elif-demir",
    name: "Dr Elif Demir",
    role: "Dermatologist",
    summary:
      "Anchors the clinic's skin-health layer — scalp diagnostics, PRP protocols, and post-operative dermatological oversight.",
    highlights: [
      "Performs pre-surgical scalp analysis to map donor viability and skin elasticity.",
      "Designs PRP treatment cycles tailored to each patient's healing biology.",
      "Monitors post-transplant skin recovery and addresses any dermatological complications.",
      "Advises on long-term scalp care routines that protect follicle health after restoration.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Dermatologist",
    noteRight: "Scalp Health",
    accent: "#8b7a6b",
    portraitScale: "1.04",
    portraitPosition: "center bottom",
  },
  {
    id: "omer-celik",
    name: "Dr Ömer Çelik",
    role: "Anaesthesiologist",
    summary:
      "Manages patient comfort from sedation planning through recovery, ensuring every procedure stays calm and controlled.",
    highlights: [
      "Tailors local anaesthesia dosing for minimal discomfort and maximum awareness during surgery.",
      "Monitors vitals throughout long procedures to keep stress levels low and stable.",
      "Develops comfort protocols that reduce anxiety for first-time surgical patients.",
      "Coordinates post-operative pain management with a gentle, measured approach.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Anaesthesiologist",
    noteRight: "Patient Comfort",
    accent: "#5a7d8c",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "zeynep-arslan",
    name: "Zeynep Arslan",
    role: "Lead Surgical Technician",
    summary:
      "Coordinates the operating environment — instrument readiness, graft handling precision, and the quiet rhythm of a well-run theatre.",
    highlights: [
      "Prepares and maintains surgical instruments with meticulous sterilisation protocols.",
      "Handles harvested grafts with care to maximise survival rates during implantation.",
      "Supports the surgical team with anticipatory awareness during long operations.",
      "Maintains the calm, focused atmosphere that defines the clinic's operating culture.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Lead Technician",
    noteRight: "Theatre Ops",
    accent: "#7b8e72",
    portraitScale: "1.05",
    portraitPosition: "center bottom",
  },
  {
    id: "can-yilmaz",
    name: "Dr Can Yılmaz",
    role: "Trichologist",
    summary:
      "Maps the science behind hair loss patterns, donor sustainability, and long-term follicle behaviour before surgery begins.",
    highlights: [
      "Conducts comprehensive hair loss diagnostics using trichoscopy and density mapping.",
      "Creates long-term treatment blueprints that account for progressive thinning patterns.",
      "Advises on medical interventions that complement or delay surgical decisions.",
      "Supports realistic expectation-setting with data-driven consultations.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Trichologist",
    noteRight: "Diagnostics",
    accent: "#6b7b5a",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "ayse-ozturk",
    name: "Ayşe Öztürk",
    role: "Patient Coordinator",
    summary:
      "Guides each patient from first enquiry through recovery — logistics, translations, and the reassurance that every detail is accounted for.",
    highlights: [
      "Manages consultation scheduling, travel arrangements, and accommodation planning.",
      "Provides multilingual support in Turkish, English, and Arabic throughout the journey.",
      "Acts as a post-operative liaison, ensuring recovery instructions are clearly followed.",
      "Builds lasting relationships that turn patients into long-term advocates.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Coordinator",
    noteRight: "Patient Journey",
    accent: "#8c6b7b",
    portraitScale: "1.04",
    portraitPosition: "center bottom",
  },
  {
    id: "mert-sahin",
    name: "Dr Mert Şahin",
    role: "Plastic Surgeon",
    summary:
      "Brings reconstructive and aesthetic surgery expertise to complex revision cases and combined facial procedures.",
    highlights: [
      "Specialises in scar revision surgery for patients with previous unsuccessful transplant attempts.",
      "Plans combined procedures that address both hair restoration and facial contouring needs.",
      "Applies micro-surgical precision to repair work that demands a higher technical threshold.",
      "Collaborates closely with the chief surgeon on cases requiring multi-disciplinary judgement.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Plastic Surgeon",
    noteRight: "Revision Cases",
    accent: "#5c6b8c",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "deniz-korkmaz",
    name: "Deniz Korkmaz",
    role: "Clinical Photographer",
    summary:
      "Documents every case with controlled lighting and consistent framing — building the visual record that holds the clinic accountable.",
    highlights: [
      "Captures standardised pre-operative, intra-operative, and post-operative documentation.",
      "Maintains a calibrated photography setup for consistent colour and angle reproduction.",
      "Creates follow-up imaging timelines that track growth at 3, 6, and 12 months.",
      "Supports the clinic's visual credibility with images that speak without embellishment.",
    ],
    image: "/images/projects/ahmed-altan-480x793.png",
    noteLeft: "Photographer",
    noteRight: "Case Documentation",
    accent: "#7a6b5c",
    portraitScale: "1.04",
    portraitPosition: "center bottom",
  },
];

export const LEAD_DOCTOR = DOCTOR_PROFILES[0];
export const TEAM_MEMBERS = DOCTOR_PROFILES.slice(1);
export const TEAM_GROUP_SIZE = 3;
export const TEAM_GROUP_COUNT = Math.ceil(TEAM_MEMBERS.length / TEAM_GROUP_SIZE);

export const SOLUTION_CASES: SolutionCase[] = [
  {
    id: "hair-transplant",
    title: "Hair Transplant",
    category: "Sapphire Micro-FUE",
    tag: "Signature",
    description:
      "Dr. Ahmed Altan's Sapphire Micro-FUE technique combines 0.7 mm precision punches with sapphire-tipped blades. Cleaner extraction, sharper channels, faster healing — a calmer procedure with denser, more natural results.",
    image: "/images/projects/hair-transplant.jpg",
    imageAlt: "Sapphire Micro-FUE hair transplant procedure",
  },
  {
    id: "reconstruction",
    title: "Reconstruction",
    category: "Corrective",
    tag: "Repair",
    description:
      "Revision surgery for patients with previous unsuccessful attempts. Scar softening, density rebalancing, and careful redistribution to restore a natural, credible appearance.",
    image: "/images/projects/reconstruction.jpg",
    imageAlt: "Hair reconstruction and repair surgery",
  },
  {
    id: "hairline-design",
    title: "Hairline Design",
    category: "Artistry",
    tag: "Precision",
    description:
      "Every hairline is mapped to facial structure, bone geometry, and natural growth direction. The goal is a result that looks undetectable at any distance — architecture, not decoration.",
    image: "/images/projects/hairline-design.jpg",
    imageAlt: "Custom hairline design and planning",
  },
  {
    id: "beard-transplant",
    title: "Beard Transplant",
    category: "Facial",
    tag: "Artistry",
    description:
      "Follicles are taken from the donor area and implanted to shape a fuller beard or quietly correct sparse facial zones. Angle, direction, and density are calibrated to stay discreet.",
    image: "/images/projects/beard-transplant.jpg",
    imageAlt: "Beard hair transplant procedure",
  },
  {
    id: "medical-treatment",
    title: "Medical Treatment",
    category: "Regenerative",
    tag: "Healing",
    description:
      "PRP therapy and medical protocols that use the body's own growth factors to support recovery, strengthen existing follicles, and complement surgical restoration with a measured aftercare rhythm.",
    image: "/images/projects/medical-treatment.jpg",
    imageAlt: "PRP and medical hair treatment",
  },
];

export const REVIEW_STORIES: ReviewStory[] = [
  {
    id: 1,
    author: "Marcus T.",
    location: "London, UK",
    rating: 5,
    text: "The Sapphire Micro-FUE procedure was completely painless. Six months in, and the density is incredible. Dr. Altan's team is truly world-class.",
  },
  {
    id: 2,
    author: "David L.",
    location: "New York, USA",
    rating: 5,
    text: "I was hesitant about traveling for a hair transplant, but the natural results speak for themselves. The hairline design is a work of art.",
  },
  {
    id: 3,
    author: "Omar S.",
    location: "Dubai, UAE",
    rating: 5,
    text: "Professionalism at its finest. They didn't just transplant hair; they restored my confidence. The healing process was remarkably fast.",
  },
];

export const SITE_SECTIONS = [
  { id: "intro", substepCount: 1 },
  { id: "doctor", substepCount: 1 },
  { id: "team", substepCount: TEAM_GROUP_COUNT },
  { id: "solutions", substepCount: SOLUTION_CASES.length },
  { id: "stories", substepCount: REVIEW_STORIES.length },
  { id: "faq", substepCount: 1 },
  { id: "accreditations", substepCount: 1 },
  { id: "offices", substepCount: 1 },
] as const satisfies ReadonlyArray<{
  id: SiteSectionId;
  substepCount: number;
}>;

export const SITE_SECTION_IDS = SITE_SECTIONS.map((section) => section.id);
