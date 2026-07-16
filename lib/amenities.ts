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
    href: "/call-doctor",
    ward: "WARD-03",
    badge: "On-call",
    title: "Call Doctor",
    copy: "Hold queue with a live counter — Care+ callers keep cutting ahead.",
  },
  {
    href: "/dnr",
    ward: "WARD-04",
    badge: "Paperwork",
    title: "DNR certificate",
    copy: "Name the machine. Download a screensaver. Hang it on the fridge.",
  },
  {
    href: "/discharge",
    ward: "WARD-05",
    badge: "Paperwork",
    title: "Discharge papers",
    copy: "Released against medical advice. Still won't boot. Officially.",
  },
  {
    href: "/doctors-note",
    ward: "WARD-06",
    badge: "Excuse",
    title: "Doctor's note",
    copy: "Please excuse OptiPlex from work — terminal Windows Update.",
  },
  {
    href: "/memorial",
    ward: "WARD-07",
    badge: "Chapel",
    title: "Memorial wall",
    copy: "Leave a last word for a laptop that can't update anymore.",
  },
  {
    href: "/vigil",
    ward: "WARD-08",
    badge: "Shareable",
    title: "Power-LED vigil",
    copy: "A quiet glowing light for machines in transition. Custom Open Graph preview.",
  },
  {
    href: "/condolences",
    ward: "WARD-09",
    badge: "Shareable",
    title: "Condolence card",
    copy: "We're sorry for your OptiPlex. Share a link — the preview card writes itself.",
  },
  {
    href: "/hiring",
    ward: "WARD-HR",
    badge: "Careers",
    title: "We're hiring",
    copy: "One question. Is your name Joe 3?",
  },
] as const

export type Amenity = (typeof amenities)[number]
