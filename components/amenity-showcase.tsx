import Link from "next/link"
import { amenities, type Amenity } from "@/lib/amenities"

export function AmenityShowcase({
  title = "Patient amenities",
  copy = "Extra wards for when sitting quietly with a dying tower isn’t interactive enough.",
  excludeHref,
  id = "amenities",
}: {
  title?: string
  copy?: string
  excludeHref?: string
  id?: string
}) {
  const items = amenities.filter((item) => item.href !== excludeHref)

  return (
    <section className="border-y border-line bg-card py-16 sm:py-20" id={id}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Campus directory
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{copy}</p>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {items.length} open wards
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <AmenityCard key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function AmenityCard({ item }: { item: Amenity }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-bg p-6 shadow-[0_10px_30px_rgba(26,54,93,0.05)] transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(26,54,93,0.1)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          {item.ward}
        </span>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
          {item.badge}
        </span>
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-ink">
        {item.title}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{item.copy}</p>
      <span className="mt-5 inline-flex text-sm font-semibold text-accent transition group-hover:translate-x-0.5">
        Open ward →
      </span>
    </Link>
  )
}
