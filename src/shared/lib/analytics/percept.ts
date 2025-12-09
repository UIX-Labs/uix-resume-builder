// src/shared/lib/analytics/percept.ts
"use client";

import Percept from "@perceptinsight/percept-js";

let initialized = false;

const isProduction = process.env.NODE_ENV === "production";

export function initPercept() {
  if (initialized) return;

  if (!isProduction) {
    initialized = true;
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

  initialized = true;
}

export function trackEvent(eventName: string, props: Record<string, any> = {}) {
  if (!isProduction) return;
  if (!initialized) initPercept();
  Percept.capture(eventName, props);
}


export function startTimedEvent(eventName: string) {
  if (!isProduction) return;
  if (!initialized) initPercept();
  Percept.timeEvent(eventName);
}

export async function setUserId(userId: string) {
  if (!isProduction) return;
  if (!initialized) initPercept();
  return await Percept.setUserId(userId);
}

export function setUserProperties(props: Record<string, any>) {
  if (!isProduction) return;
  if (!initialized) initPercept();
  return Percept.setUserProperties(props);
}


export function setGlobalProperty(key: string, value: any) {
  if (!isProduction) return;
  if (!initialized) initPercept();
  Percept.setGlobalProperty(key, value);
}

export function removeGlobalProperty(key: string) {
  if (!isProduction) return;
  if (!initialized) initPercept();
  Percept.removeGlobalProperty(key);
}

export function getAllGlobalProperties() {
  if (!isProduction) return {};
  if (!initialized) initPercept();
  return Percept.getAllGlobalProperties();
}

export async function clearPerceptData() {
  if (!isProduction) return;
  if (!initialized) initPercept();
  return await Percept.clear();
}
