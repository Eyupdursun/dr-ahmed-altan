export type SiteSectionId =
  | "intro"
  | "doctor"
  | "team"
  | "solutions"
  | "results"
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

export type BeforeAfterCase = {
  id: string;
  title: string;
  summary: string;
  timeline: string;
  technique: string;
  focusArea: string;
  beforeImage?: string;
  afterImage?: string;
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
    image: "/images/projects/ahmed-altan.webp",
    noteLeft: "Chief Surgeon",
    noteRight: "Hairline Direction",
    accent: "#6d8168",
    portraitScale: "1.08",
    portraitPosition: "center bottom",
  },
  {
    id: "leyla",
    name: "Leyla",
    role: "Patient Advisor",
    summary:
      "Guides patients from the first enquiry through consultation planning, scheduling, and the practical details before treatment.",
    highlights: [
      "Supports first-contact conversations and keeps each enquiry clear and well organised.",
      "Helps align consultation timing, clinic communication, and pre-visit expectations.",
      "Keeps the patient journey structured from planning through confirmation.",
      "Provides a calm, responsive point of contact before treatment begins.",
    ],
    image: "/images/projects/leyla-2.webp",
    noteLeft: "Patient Advisor",
    noteRight: "Consultation Flow",
    accent: "#927c67",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "asli",
    name: "Aslı",
    role: "Hair Transplant Technician",
    summary:
      "Supports the surgical flow with steady graft handling, careful preparation, and consistent technical assistance throughout the procedure.",
    highlights: [
      "Assists with graft preparation and maintains organised treatment sequencing.",
      "Supports implantation flow with disciplined handling and sterile consistency.",
      "Helps preserve a calm operating rhythm during longer procedures.",
      "Contributes to detail-focused technical support across the session.",
    ],
    image: "/images/projects/asli.webp",
    noteLeft: "Technician",
    noteRight: "Graft Handling",
    accent: "#51644c",
    portraitScale: "1.02",
    portraitPosition: "center bottom",
  },
  {
    id: "fidan",
    name: "Fidan",
    role: "Hair Transplant Technician",
    summary:
      "Works across preparation and in-room support, helping maintain a precise and controlled technical setup for each case.",
    highlights: [
      "Supports clean procedural flow from setup through active treatment stages.",
      "Helps keep graft preparation and transfer steps orderly and reliable.",
      "Maintains close attention to consistency during extended procedures.",
      "Adds measured technical support where timing and handling matter most.",
    ],
    image: "/images/projects/fidan.webp",
    noteLeft: "Technician",
    noteRight: "Procedure Support",
    accent: "#8b7a6b",
    portraitScale: "1.04",
    portraitPosition: "center bottom",
  },
  {
    id: "elanur",
    name: "Elanur",
    role: "Hair Transplant Technician",
    summary:
      "Helps coordinate the technical side of treatment with close attention to preparation, pacing, and smooth in-room support.",
    highlights: [
      "Supports treatment readiness before each surgical stage begins.",
      "Works carefully within the operating flow to keep transitions efficient.",
      "Helps maintain precise handling standards during the procedure.",
      "Contributes to a steady, low-friction clinical rhythm throughout the day.",
    ],
    image: "/images/projects/elanur.webp",
    noteLeft: "Technician",
    noteRight: "Clinical Flow",
    accent: "#5a7d8c",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "yesim",
    name: "Yeşim",
    role: "Hair Transplant Technician",
    summary:
      "Supports procedural consistency with careful preparation, organised assistance, and a disciplined approach to technical detail.",
    highlights: [
      "Assists with setup and treatment stages that depend on reliable sequencing.",
      "Keeps technical support steady during active extraction and implantation flow.",
      "Works with close attention to handling standards and room readiness.",
      "Helps preserve a calm, composed operating environment.",
    ],
    image: "/images/projects/yesim.webp",
    noteLeft: "Technician",
    noteRight: "Room Readiness",
    accent: "#7b8e72",
    portraitScale: "1.05",
    portraitPosition: "center bottom",
  },
  {
    id: "kubra",
    name: "Kübra",
    role: "Hair Transplant Technician",
    summary:
      "Provides technical support across the procedure, helping keep preparation, handling, and in-room coordination consistent.",
    highlights: [
      "Supports treatment preparation with a careful, process-led approach.",
      "Assists with graft-related workflow and organised procedural timing.",
      "Helps sustain technical consistency throughout the operating day.",
      "Adds reliable support where precision and calm execution are needed.",
    ],
    image: "/images/projects/kubra.webp",
    noteLeft: "Technician",
    noteRight: "Technical Support",
    accent: "#6b7b5a",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "sibel",
    name: "Sibel",
    role: "Hair Transplant Technician",
    summary:
      "Works within the treatment team to keep preparation, support, and technical execution stable across each procedure.",
    highlights: [
      "Helps maintain clear technical structure from setup through completion.",
      "Supports procedural steps that depend on careful timing and handling.",
      "Adds steady in-room assistance during longer operating sessions.",
      "Contributes to a controlled and dependable clinical rhythm.",
    ],
    image: "/images/projects/sibel.webp",
    noteLeft: "Technician",
    noteRight: "Treatment Support",
    accent: "#8c6b7b",
    portraitScale: "1.04",
    portraitPosition: "center bottom",
  },
  {
    id: "dominika",
    name: "Dominika",
    role: "Sales Manager",
    summary:
      "Handles patient enquiries, follow-up communication, and planning coordination for prospective and international cases.",
    highlights: [
      "Keeps enquiry management organised from first message to confirmed planning.",
      "Supports clear communication around treatment options and next steps.",
      "Coordinates follow-up conversations for patients comparing timelines and routes.",
      "Helps maintain a responsive, well-structured pre-treatment process.",
    ],
    image: "/images/projects/dominika.webp",
    noteLeft: "Sales Manager",
    noteRight: "Enquiry Support",
    accent: "#5c6b8c",
    portraitScale: "1.03",
    portraitPosition: "center bottom",
  },
  {
    id: "busra",
    name: "Büşra",
    role: "Chief Medical Team",
    summary:
      "Oversees team coordination on the clinical side, helping keep the medical workflow organised, aligned, and consistently delivered.",
    highlights: [
      "Supports coordination across the wider medical team during active treatment days.",
      "Helps align preparation, room flow, and communication across clinical staff.",
      "Maintains oversight on the team rhythm that supports consistent care delivery.",
      "Acts as a central point in keeping medical operations structured and calm.",
    ],
    image: "/images/projects/busra.webp",
    noteLeft: "Medical Team",
    noteRight: "Clinical Coordination",
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
    image: "/images/projects/hair-transplant-1.webp",
    imageAlt: "Hair transplant procedure detail",
    description:
      "Dr. Ahmed Altan's Sapphire Micro-FUE technique combines 0.7 mm precision punches with sapphire-tipped blades. Cleaner extraction, sharper channels, faster healing — a calmer procedure with denser, more natural results.",
  },
  {
    id: "reconstruction",
    title: "Reconstruction",
    category: "Corrective",
    tag: "Repair",
    image: "/images/projects/reconstruction.webp",
    imageAlt: "Hair reconstruction procedure detail",
    description:
      "Revision surgery for patients with previous unsuccessful attempts. Scar softening, density rebalancing, and careful redistribution to restore a natural, credible appearance.",
  },
  {
    id: "hairline-design",
    title: "Hairline Design",
    category: "Artistry",
    tag: "Precision",
    image: "/images/projects/hair-design.webp",
    imageAlt: "Hairline design planning detail",
    description:
      "Every hairline is mapped to facial structure, bone geometry, and natural growth direction. The goal is a result that looks undetectable at any distance — architecture, not decoration.",
  },
  {
    id: "beard-transplant",
    title: "Beard Transplant",
    category: "Facial",
    tag: "Artistry",
    image: "/images/projects/beard-transplant.webp",
    imageAlt: "Beard transplant procedure detail",
    description:
      "Follicles are taken from the donor area and implanted to shape a fuller beard or quietly correct sparse facial zones. Angle, direction, and density are calibrated to stay discreet.",
  },
  {
    id: "medical-treatment",
    title: "Medical Treatment",
    category: "Regenerative",
    tag: "Healing",
    image: "/images/projects/medical-treatment.webp",
    imageAlt: "Medical treatment and recovery detail",
    description:
      "PRP therapy and medical protocols that use the body's own growth factors to support recovery, strengthen existing follicles, and complement surgical restoration with a measured aftercare rhythm.",
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
  {
    id: 4,
    author: "Julien R.",
    location: "Paris, France",
    rating: 5,
    text: "Everything felt considered from the consultation to the aftercare. The result looks understated in the best possible way, which is exactly what I wanted.",
  },
  {
    id: 5,
    author: "Yousef A.",
    location: "Doha, Qatar",
    rating: 5,
    text: "The clinic was calm, organised, and very clear about each step. Recovery was easier than I expected, and the new density already looks very natural.",
  },
  {
    id: 6,
    author: "Daniel M.",
    location: "Berlin, Germany",
    rating: 5,
    text: "What impressed me most was the restraint in the design. Nothing looks overdone, and that made the final result feel believable from the start.",
  },
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "hairline-density",
    title: "Hairline restoration",
    summary:
      "Frontal hairline rebuilt with a soft, age-appropriate shape and full density across the temples.",
    timeline: "12 months later",
    technique: "Sapphire Micro-FUE",
    focusArea: "Hairline + frontal density",
    beforeImage: "/images/before-after/sac1-1.webp",
    afterImage: "/images/before-after/sac-1-2.webp",
  },
  {
    id: "crown-coverage",
    title: "Crown coverage",
    summary:
      "Thinning crown restored with even density and natural directional flow that blends with existing hair.",
    timeline: "10 months later",
    technique: "Sapphire Micro-FUE",
    focusArea: "Crown · vertex zone",
    beforeImage: "/images/before-after/sac2-1.webp",
    afterImage: "/images/before-after/sac2-2.webp",
  },
  {
    id: "receding-temples",
    title: "Receding temples",
    summary:
      "Temple corners reshaped to soften an aggressive recession while keeping the hairline natural.",
    timeline: "9 months later",
    technique: "DHI",
    focusArea: "Temples + hairline",
    beforeImage: "/images/before-after/sac3-1.webp",
    afterImage: "/images/before-after/sac3-2.webp",
  },
  {
    id: "beard-design",
    title: "Beard design",
    summary:
      "Patchy beard filled in with carefully placed grafts following natural growth direction.",
    timeline: "8 months later",
    technique: "DHI",
    focusArea: "Beard · cheek line",
    beforeImage: "/images/before-after/sakal1.webp",
    afterImage: "/images/before-after/sakal2.webp",
  },
];

/** @deprecated kept for backwards compat — use BEFORE_AFTER_CASES */
export const BEFORE_AFTER_CASE: BeforeAfterCase = BEFORE_AFTER_CASES[0];

export type SectionScrollMode = "snap" | "free";

export const SITE_SECTIONS = [
  { id: "intro", substepCount: 1, scrollMode: "snap" as SectionScrollMode },
  { id: "doctor", substepCount: 1, scrollMode: "snap" as SectionScrollMode },
  { id: "team", substepCount: TEAM_GROUP_COUNT, scrollMode: "snap" as SectionScrollMode },
  { id: "solutions", substepCount: SOLUTION_CASES.length, scrollMode: "snap" as SectionScrollMode },
  { id: "results", substepCount: 1, scrollMode: "snap" as SectionScrollMode },
  { id: "stories", substepCount: 1, scrollMode: "snap" as SectionScrollMode },
  { id: "faq", substepCount: 1, scrollMode: "snap" as SectionScrollMode },
  { id: "accreditations", substepCount: 1, scrollMode: "snap" as SectionScrollMode },
  { id: "offices", substepCount: 1, scrollMode: "snap" as SectionScrollMode },
] as const satisfies ReadonlyArray<{
  id: SiteSectionId;
  substepCount: number;
  scrollMode: SectionScrollMode;
}>;

export const SITE_SECTION_IDS = SITE_SECTIONS.map((section) => section.id);
