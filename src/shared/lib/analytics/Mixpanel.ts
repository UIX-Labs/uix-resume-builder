"use client";

import Percept from "@perceptinsight/percept-js";
import mixpanel from "mixpanel-browser";

interface AnalyticsProps {
  [key: string]: unknown;
}

const isProduction = process.env.NODE_ENV === "production";

let mixpanelInitialized = false;
let perceptInitialized = false;

function initMixpanel(): void {
  if (mixpanelInitialized || !isProduction) {
    mixpanelInitialized = mixpanelInitialized || !isProduction;
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
    record_sessions_percent: 100,
    record_heatmap_data: true,
  });

  mixpanelInitialized = true;
}

function initPercept(): void {
  if (perceptInitialized || !isProduction) {
    perceptInitialized = perceptInitialized || !isProduction;
    return;
  }

  const projectToken = process.env.NEXT_PUBLIC_PERCEPT_PROJECT_TOKEN;
  if (!projectToken) {
    console.error("❌ Missing NEXT_PUBLIC_PERCEPT_PROJECT_TOKEN");
    return;
  }

  Percept.init(projectToken, {
    autoTrackPageviews: true,
    autoTrackRuntimeErrors: true,
    autoTrackWebvitals: true,
    autoTrackApiCalls: false,
    autoCaptureClicks: true,
    enableLogs: false,
  });

  perceptInitialized = true;
}

function ensureInitialized(): void {
  if (!isProduction) return;
  if (!mixpanelInitialized) initMixpanel();
  if (!perceptInitialized) initPercept();
}

export function initAnalytics(): void {
  ensureInitialized();
}

export function trackEvent(
  eventName: string,
  props: AnalyticsProps = {}
): void {
  if (!isProduction) return;
  ensureInitialized();
  if (mixpanelInitialized) mixpanel.track(eventName, props);
  if (perceptInitialized) Percept.capture(eventName, props);
}

export function startTimedEvent(eventName: string): void {
  if (!isProduction) return;
  ensureInitialized();
  if (mixpanelInitialized) mixpanel.time_event(eventName);
  if (perceptInitialized) Percept.timeEvent(eventName);
}

export function setUserId(userId: string): void {
  if (!isProduction) return;
  ensureInitialized();
  if (mixpanelInitialized) mixpanel.identify(userId);
  if (perceptInitialized) Percept.setUserId(userId);
}

export function setUserProperties(props: AnalyticsProps): void {
  if (!isProduction) return;
  ensureInitialized();
  if (mixpanelInitialized) mixpanel.people.set(props);
  if (perceptInitialized) Percept.setUserProperties(props);
}

export function setGlobalProperty(key: string, value: unknown): void {
  if (!isProduction) return;
  ensureInitialized();
  if (mixpanelInitialized) mixpanel.register({ [key]: value });
  if (perceptInitialized) Percept.setGlobalProperty(key, value);
}

export function removeGlobalProperty(key: string): void {
  if (!isProduction) return;
  ensureInitialized();
  if (mixpanelInitialized) mixpanel.unregister(key);
  if (perceptInitialized) Percept.removeGlobalProperty(key);
}

export function getAllGlobalProperties(): Record<string, unknown> {
  if (!isProduction) return {};
  ensureInitialized();
  if (!perceptInitialized) return {};
  return Percept.getAllGlobalProperties();
}

export async function clearAnalyticsData(): Promise<void> {
  if (!isProduction) return;
  ensureInitialized();
  if (mixpanelInitialized) mixpanel.reset();
  if (perceptInitialized) await Percept.clear();
}