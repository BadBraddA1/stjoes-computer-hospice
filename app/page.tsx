import Image from "next/image"
import { Suspense } from "react"
import { HappyCostermer } from "@/components/happy-costermer"
import { InteractiveWards } from "@/components/interactive-wards"
import { SiteFooter } from "@/components/site-chrome"
import { LastWordsTicker, LastWordsForm } from "@/components/last-words"
import { AdmitDevice } from "@/components/admit-device"
import { CodeAlerts } from "@/components/code-alerts"
import { EasterEgg } from "@/components/easter-egg"
import { IdleBattery } from "@/components/idle-battery"
import { LobbyPA } from "@/components/lobby-pa"
import { BizcardWelcome } from "@/components/bizcard-welcome"

const services = [
  {
    title: "Palliative Performance",
    copy: "We keep the fans spinning gently while Windows Update thinks about it for the last time.",
  },
  {
    title: "Last Rites for HDDs",
    copy: "A quiet ceremony. A solemn click. A final SMART status reading. Amen.",
  },
  {
    title: "Do Not Resuscitate",
    copy: "No more “have you tried turning it off and on again.” Some machines prefer peace.",
  },
  {
    title: "Family Visiting Hours",
    copy: "Say goodbye to your beige tower. Touch the floppy slot one last time. Tissue box provided.",
  },
]

const patients = [
  { name: "Dell OptiPlex ’09", status: "Comfort care", note: "Blue screen of acceptance" },
  { name: "iMac (2012)", status: "Stable decline", note: "Spinner of eternal contemplation" },
  { name: "ThinkPad T420", status: "Critical", note: "Battery has left the chat" },
  { name: "Gateway 2000", status: "Transitioning", note: "Seeing the blue light" },
]

const visiting = [
  {
    title: "Morning shift",
    time: "8:00a–11:00a",
    note: "For printers that jam emotionally",
  },
  {
    title: "Afternoon quiet hours",
    time: "1:00p–4:00p",
    note: "No forced firmware updates",
  },
  {
    title: "Candlelight reboot",
    time: "7:00p–8:00p",
    note: "Optional hymn: Windows XP startup",
  },
]

export default function HomePage() {
  return (
    <main className="flex-1">
      <LastWordsTicker />
      <CodeAlerts />
      <EasterEgg />
      <IdleBattery />
      <LobbyPA />
      <Suspense fallback={null}>
        <BizcardWelcome />
      </Suspense>

      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1a365d 1px, transparent 1px), linear-gradient(to bottom, #1a365d 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-20">
          <div className="order-2 lg:order-1">
            <p className="anim-rise font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Est. whenever your laptop stopped charging
            </p>
            <h1 className="sr-only">ST Joe&apos;s Computer Hospice</h1>
            <p className="anim-rise-delay-1 mt-5 max-w-xl font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-ink">
              Comfort care for dying machines.
            </p>
            <p className="anim-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-muted">
              We don&apos;t fix them. We sit with them. We hold the mouse. We let go of the old
              drivers. <span className="italic text-accent">Sorry your time is up.</span>
            </p>
            <div className="anim-rise-delay-2 mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#admit"
                className="inline-flex items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
              >
                Admit a Device
              </a>
              <a
                href="#wards"
                className="inline-flex items-center rounded-full border border-line bg-card/80 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-ink backdrop-blur transition hover:border-accent"
              >
                Visit the Wards
              </a>
              <a
                href="#amenities"
                className="inline-flex items-center rounded-full border border-line bg-card/80 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-ink backdrop-blur transition hover:border-accent"
              >
                Play the Campus
              </a>
            </div>
            <p className="anim-pulse mt-8 font-mono text-xs text-warn">
              ● Code Slow — response times not guaranteed
            </p>
          </div>

          <div className="anim-rise order-1 flex justify-center lg:order-2 lg:justify-end">
            <Image
              src="/logo.jpg"
              alt="St Joe's Computer Hospice — we bring new life to your technology. Sorry your time is up."
              width={520}
              height={520}
              priority
              className="h-auto w-[min(100%,420px)] drop-shadow-[0_24px_50px_rgba(26,54,93,0.18)] sm:w-[460px] lg:w-[520px]"
            />
          </div>
        </div>
      </header>

      <InteractiveWards defaultOpen="/is-it-time" />

      <section className="border-y border-line bg-band py-16 sm:py-20" id="care">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Our Continuum of Care
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            From first blue screen to final power LED — every stage, handled with clinical sarcasm.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-line bg-card p-6 shadow-[0_10px_40px_rgba(26,54,93,0.05)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" id="leadership">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[auto_1fr] lg:gap-14 lg:px-10">
          <div className="mx-auto flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-8">
            <Image
              src="/head-of-care.png"
              alt="Head of Hospice Care — bearded tech with a headset, ready for your machine’s last words"
              width={288}
              height={288}
              className="h-56 w-56 rounded-full object-cover ring-4 ring-accent/35 sm:h-72 sm:w-72"
            />
            <figure className="w-full max-w-[220px] shrink-0">
              <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_16px_40px_rgba(26,54,93,0.16)]">
                <video
                  className="aspect-[9/16] h-auto w-full object-cover"
                  src="/head-of-care.mp4"
                  playsInline
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider text-muted">
                Bedside address · 5s
              </figcaption>
            </figure>
          </div>
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Clinical leadership
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Head of Hospice Care
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              On the headset so you don&apos;t have to be. He&apos;ll walk your tower through the five stages
              of grief — Denial, Cache Clear, Bargaining with Tech Support, Depression (battery
              warning), and Acceptance (power brick in the drawer forever).
            </p>
            <p className="mt-5 font-mono text-sm text-ink">
              “Have you said goodbye to the Save dialog?”
            </p>
            <a
              href="#happy-costermer"
              className="mt-6 inline-flex text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              Get to know our happy costermer
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" id="wards">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
                Current Patients
              </h2>
              <p className="mt-3 max-w-xl text-muted">Ward board updates whenever DNS feels like it.</p>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Census: {patients.length} machines
            </span>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-ink text-card">
            <div className="hidden gap-4 border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-white/55 sm:grid sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1.4fr)]">
              <span>Patient</span>
              <span>Status</span>
              <span>Notes</span>
            </div>
            {patients.map((patient) => (
              <div
                key={patient.name}
                className="grid gap-1 border-b border-white/10 px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-baseline sm:gap-4"
              >
                <span className="font-semibold leading-snug">{patient.name}</span>
                <span className="font-mono text-sm leading-snug text-accent-soft">
                  {patient.status}
                </span>
                <span className="text-sm leading-snug text-white/65">{patient.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-band py-16 sm:py-20" id="hours">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-6 sm:px-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Visiting Hours
            </h2>
            <ul className="mt-8 space-y-5">
              {visiting.map((slot) => (
                <li key={slot.title} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug text-ink">
                      {slot.title}
                      <span className="font-normal text-muted"> · </span>
                      <span className="font-mono text-sm font-medium text-accent">{slot.time}</span>
                    </p>
                    <p className="mt-1 leading-relaxed text-muted">{slot.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-line bg-card p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-warn">
              Chaplain&apos;s Note
            </p>
            <blockquote className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold leading-[1.35] tracking-tight text-pretty text-ink sm:text-2xl">
              <p>It is not failure to unplug.</p>
              <p className="mt-2">It is grace with a ground pin.</p>
            </blockquote>
            <p className="mt-5 text-sm text-muted">— Fr. Joe, Staff Tech-Priest</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-line py-14" id="marks">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
            Official Marks
          </h2>
          <p className="mt-2 text-sm text-muted">House variants for internal use only. Mostly.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { src: "/logo-a.jpg", label: "New life" },
              { src: "/logo-b.jpg", label: "Sorry your time is up" },
              { src: "/logo-c.jpg", label: "Meramec edition" },
            ].map((mark) => (
              <figure
                key={mark.src}
                className="rounded-2xl border border-line bg-white p-5 text-center shadow-[0_10px_30px_rgba(26,54,93,0.06)]"
              >
                <Image
                  src={mark.src}
                  alt={`St Joe's Computer Hospice logo — ${mark.label}`}
                  width={360}
                  height={360}
                  className="mx-auto h-auto w-full max-w-[240px]"
                />
                <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">
                  {mark.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-band py-16 sm:py-20" id="last-words">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Lobby last words
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Feed the ticker. Keep it short. Keep it solemn. Keep it stupid.
          </p>
          <div className="mt-8">
            <LastWordsForm />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" id="admit">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Image
            src="/logo-icon.png"
            alt=""
            width={96}
            height={96}
            className="mx-auto mb-6 h-20 w-20"
          />
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to say goodbye?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Bring the device, the charger you lost twice, and any emotional support USB sticks.
            Complete admission below, then meet our happiest costermer:
          </p>
          <div className="mt-10">
            <AdmitDevice />
          </div>
          <HappyCostermer />
          <p className="mt-4 font-mono text-xs text-muted">
            Donations unpaid. Tissues provided. Unmute if your browser was polite.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
