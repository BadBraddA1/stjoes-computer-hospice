export const amenities = [
  {
    href: "/is-it-time",
    ward: "WARD-01",
    badge: "Intake",
    title: "Is it time?",
    copy: "A short clinical flowchart. Blue screens, batteries, and hard truths.",
  },
  {
    href: "/grief",
    ward: "WARD-02",
    badge: "Pastoral",
    title: "Five stages of grief",
    copy: "Denial through Acceptance — with cache clears and power bricks.",
  },
  {
    href: "/dnr",
    ward: "WARD-03",
    badge: "Paperwork",
    title: "DNR certificate",
    copy: "Name the machine. Print the paperwork. Hang it on the fridge.",
  },
  {
    href: "/memorial",
    ward: "WARD-04",
    badge: "Chapel",
    title: "Memorial wall",
    copy: "Leave a last word for a laptop that can’t update anymore.",
  },
  {
    href: "/vigil",
    ward: "WARD-05",
    badge: "Shareable",
    title: "Power-LED vigil",
    copy: "A quiet glowing light for machines in transition. Custom Open Graph preview.",
  },
  {
    href: "/condolences",
    ward: "WARD-06",
    badge: "Shareable",
    title: "Condolence card",
    copy: "We’re sorry for your OptiPlex. Share a link — the preview card writes itself.",
  },
  {
    href: "/hiring",
    ward: "WARD-HR",
    badge: "Careers",
    title: "We’re hiring",
    copy: "One question. Is your name Joe 3? Spoiler: nobody gets the job.",
  },
] as const

export type Amenity = (typeof amenities)[number]
