/** Server instrumentation — skipped on Cloudflare Workers (workerd). */
export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge/workerd: @sentry/nextjs server hooks are unreliable here.
    return;
  }
  // Node (Vercel / local): load Sentry server config when present.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      await import("./sentry.server.config");
    } catch (error) {
      console.error("Sentry server instrumentation failed", error);
    }
  }
}
