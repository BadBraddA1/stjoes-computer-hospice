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
  "Morning shift: 8:00a–11:00a — for printers that jam emotionally",
  "Afternoon quiet hours: 1:00p–4:00p — no forced firmware updates",
  "Candlelight reboot: 7:00p–8:00p — optional hymn: Windows XP startup",
]

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="overflow-hidden border-b border-line bg-ink text-card">
        <div className="ticker-track flex whitespace-nowrap py-2 font-mono text-xs tracking-wide uppercase">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex shrink-0 gap-10 px-6">
              <span>ADMITTING: devices beyond repair</span>
              <span>CODE GREEN: fans still spinning</span>
              <span>NO HEROICS after Windows XP</span>
              <span>WIFI LAST WORDS welcome</span>
              <span>BRING YOUR OWN HDMI adapter</span>
            </div>
          ))}
        </div>
      </div>

      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1c2b22 1px, transparent 1px), linear-gradient(to bottom, #1c2b22 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-20 sm:px-10 sm:pb-24">
          <p className="anim-rise font-mono text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Est. whenever your laptop stopped charging
          </p>
          <h1 className="anim-rise-delay-1 mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(3.2rem,9vw,6.4rem)] font-extrabold leading-[0.92] tracking-tight text-ink">
            ST Joe&apos;s
            <span className="block text-accent">Computer Hospice</span>
          </h1>
          <p className="anim-rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Comfort care for dying machines. We don&apos;t fix them. We sit with them.
            We hold the mouse. We let go of the old drivers.
          </p>
          <div className="anim-rise-delay-2 mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#admit"
              className="inline-flex items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-wide text-card transition hover:brightness-110"
            >
              Admit a Device
            </a>
            <a
              href="#wards"
              className="inline-flex items-center rounded-full border border-line bg-card/70 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-ink backdrop-blur transition hover:border-accent"
            >
              Visit the Wards
            </a>
          </div>
          <p className="anim-pulse mt-8 font-mono text-xs text-warn">
            ● Code Slow — response times not guaranteed
          </p>
        </div>
      </header>

      <section className="border-y border-line bg-card/60 py-16 sm:py-20" id="care">
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
                className="rounded-2xl border border-line bg-bg/80 p-6 shadow-[0_10px_40px_rgba(28,43,34,0.05)]"
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
            <div className="grid grid-cols-[1.2fr_0.8fr_1.4fr] gap-3 border-b border-white/10 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-white/55">
              <span>Patient</span>
              <span>Status</span>
              <span className="hidden sm:block">Notes</span>
            </div>
            {patients.map((patient) => (
              <div
                key={patient.name}
                className="grid grid-cols-1 gap-1 border-b border-white/10 px-5 py-4 last:border-b-0 sm:grid-cols-[1.2fr_0.8fr_1.4fr] sm:gap-3 sm:items-center"
              >
                <span className="font-semibold">{patient.name}</span>
                <span className="font-mono text-sm text-accent-soft">{patient.status}</span>
                <span className="text-sm text-white/65">{patient.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-accent-soft/40 py-16 sm:py-20" id="hours">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-[1.1fr_0.9fr] sm:px-10">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Visiting Hours
            </h2>
            <ul className="mt-6 space-y-4 text-muted">
              {visiting.map((line) => (
                <li key={line} className="flex gap-3 leading-relaxed">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-line bg-card p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-warn">Chaplain&apos;s Note</p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-ink">
              “It is not failure to unplug. It is grace with a ground pin.”
            </p>
            <p className="mt-4 text-sm text-muted">— Fr. Joe, Staff Tech-Priest</p>
          </aside>
        </div>
      </section>

      <section className="py-16 sm:py-24" id="admit">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to say goodbye?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Bring the device, the charger you lost twice, and any emotional support USB sticks.
            We&apos;ll take it from here.
          </p>
          <a
            href="mailto:hello@stjoeshospice.com?subject=Admitting%20a%20device"
            className="mt-8 inline-flex items-center rounded-full bg-ink px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-card transition hover:bg-accent"
          >
            Email Admissions
          </a>
          <p className="mt-4 font-mono text-xs text-muted">
            Not a real hospital. Definitely a real bit. Donations unpaid. Tears optional.
          </p>
        </div>
      </section>

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p className="font-[family-name:var(--font-display)] text-base font-semibold text-ink">
            ST Joe&apos;s Computer Hospice
          </p>
          <p>stjoeshospice.com · comfort care for dying machines</p>
        </div>
      </footer>
    </main>
  )
}
