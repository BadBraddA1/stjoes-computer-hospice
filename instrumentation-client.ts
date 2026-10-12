import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  profileSessionSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  profileLifecycle: "trace",
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || "development",
  integrations: [
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
  ],
});

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://n.braddcorp.com",
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || "https://us.posthog.com",
    defaults: "2026-05-30",
    capture_exceptions: false,
    capture_pageview: "history_change",
    capture_pageleave: true,
    persistence: "localStorage+cookie",
    debug: process.env.NODE_ENV === "development",
  });
  posthog.register({ product: "stjoes-computer-hospice" });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
