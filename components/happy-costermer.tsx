"use client"

/** Autoplays on page open. Starts muted — browsers block unmuted autoplay without a click. */
export function HappyCostermer() {
  return (
    <div
      id="happy-costermer"
      className="mx-auto mt-8 aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_20px_50px_rgba(26,54,93,0.2)]"
    >
      <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&playsinline=1"
        title="Get to know our happy costermer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
