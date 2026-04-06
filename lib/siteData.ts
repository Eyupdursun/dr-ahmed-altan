import type { SiteSectionId } from "@/lib/siteContent";
import { SOLUTION_CASES } from "@/lib/siteContent";

export type Office = {
  title: string;
  address: string;
  phone: string;
  email?: string;
};

export type MenuChildItem = {
  id: string;
  label: string;
  targetId?: SiteSectionId;
  substep?: number;
};

export type MenuItem = {
  id: string;
  label: string;
  index: string;
  targetId?: SiteSectionId;
  sectionIds: SiteSectionId[];
  children?: MenuChildItem[];
};

export const OFFICES: Office[] = [
  {
    title: "Clinic Address",
    address:
      "Kazlicesme Mahallesi Buyukyali Istanbul H Blok, 34020 Zeytinburnu/Istanbul",
    phone: "+90 541 211 6126",
    email: "info@drahmedaltan.com",
  },
  {
    title: "Poland Office",
    address: "Ul. Bukowinska 2/U3 02-703 Mokotow/Warsaw",
    phone: "+48 667 016 163",
  },
  {
    title: "Italy Office",
    address: "Via Petrarca, 30 10126 Torino/Italy",
    phone: "+39 375 7260251",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "hair",
    label: "Hair",
    index: "01",
    targetId: "solutions",
    sectionIds: ["intro", "solutions", "stories", "faq"],
    children: SOLUTION_CASES.map((s, i) => ({
      id: s.id,
      label: s.title,
      targetId: "solutions" as SiteSectionId,
      substep: i,
    })),
  },
  {
    id: "about",
    label: "About",
    index: "02",
    targetId: "doctor",
    sectionIds: ["doctor", "team"],
    children: [
      { id: "about-doctor", label: "Dr. Ahmed Altan", targetId: "doctor" },
      { id: "about-team", label: "Our Team", targetId: "team" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    index: "03",
    targetId: "offices",
    sectionIds: ["accreditations", "offices"],
  },
];

export const SECTION_MENU_MAP = Object.fromEntries(
  MENU_ITEMS.flatMap((item) => item.sectionIds.map((sectionId) => [sectionId, item.id]))
) as Record<SiteSectionId, string>;
