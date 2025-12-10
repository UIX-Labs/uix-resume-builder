"use client";

import mixpanel from "mixpanel-browser";

let initialized = false;

const isProduction = process.env.NODE_ENV === "production";

export function initAnalytics() {
  if (initialized) return;

  if (!isProduction) {
    initialized = true;
    return;
  }

  const projectToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!projectToken) {
    console.error("❌ Missing NEXT_PUBLIC_MIXPANEL_TOKEN");
    return;
  }

  mixpanel.init(projectToken, {
    debug: !isProduction,
    track_pageview: true,
    persistence: "localStorage",
  });

  initialized = true;
}

export function trackEvent(eventName: string, props: Record<string, any> = {}) {
  if (!isProduction) return;
  if (!initialized) initAnalytics();
  mixpanel.track(eventName, props);
}

export function startTimedEvent(eventName: string) {
  if (!isProduction) return;
  if (!initialized) initAnalytics();
  mixpanel.time_event(eventName);
}

export function setUserId(userId: string) {
  if (!isProduction) return;
  if (!initialized) initAnalytics();
  mixpanel.identify(userId);
}

export function setUserProperties(props: Record<string, any>) {
  if (!isProduction) return;
  if (!initialized) initAnalytics();
  mixpanel.people.set(props);
}

export function setGlobalProperty(key: string, value: any) {
  if (!isProduction) return;
  if (!initialized) initAnalytics();
  mixpanel.register({ [key]: value });
}

export function removeGlobalProperty(key: string) {
  if (!isProduction) return;
  if (!initialized) initAnalytics();
  mixpanel.unregister(key);
}

export function getAllGlobalProperties() {
  if (!isProduction) return {};
  if (!initialized) initAnalytics();
  // Mixpanel doesn't expose a direct method to get all registered super properties synchronously in the same way,
  // but we can try to get them if needed, or return empty.
  // mixpanel.get_property() can get a specific one.
  return {};
}

export function clearAnalyticsData() {
  if (!isProduction) return;
  if (!initialized) initAnalytics();
  mixpanel.reset();
}
