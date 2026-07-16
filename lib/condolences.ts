export const CONDOLENCE_LINES = [
  "The fans are quiet now. The icons can rest.",
  "May its ports find peace and its dust find dignity.",
  "Gone from the dock, never from the drawer of chargers.",
  "It gave you spreadsheets, memes, and one final blue screen.",
] as const

export function condolenceTitle(machine: string) {
  const m = machine.trim() || "your machine"
  return `We're sorry for your ${m}.`
}
