import { useState, useEffect } from "react";
import { track } from "@vercel/analytics";

const STORAGE_KEY = "ddb_ab_v1";

export const EXPERIMENTS = {
  HOMEPAGE_HEADLINE_PIVOT: "homepage_headline_pivot_v1",
};

function readStore() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(store) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

function tagWindow(experiment, variant) {
  if (typeof window === "undefined") return;
  window.__ddb_ab = window.__ddb_ab || {};
  window.__ddb_ab[experiment] = variant;
}

export function getVariant(experiment, variants = ["A", "B"]) {
  if (typeof window === "undefined") return variants[0];

  try {
    const params = new URLSearchParams(window.location.search);
    const override = params.get(`ab_${experiment}`) || params.get("ab");
    if (override && variants.includes(override)) {
      tagWindow(experiment, override);
      return override;
    }
  } catch {}

  const store = readStore();
  if (store[experiment] && variants.includes(store[experiment])) {
    tagWindow(experiment, store[experiment]);
    return store[experiment];
  }

  const pick = variants[Math.floor(Math.random() * variants.length)];
  store[experiment] = pick;
  writeStore(store);
  tagWindow(experiment, pick);

  try {
    track("ab_assign", { experiment, variant: pick });
  } catch {}

  return pick;
}

export function useVariant(experiment, variants = ["A", "B"]) {
  const [variant, setVariant] = useState(() => {
    if (typeof window === "undefined") return variants[0];
    return getVariant(experiment, variants);
  });

  useEffect(() => {
    setVariant(getVariant(experiment, variants));
  }, [experiment]);

  return variant;
}

export function trackVariantEvent(eventName, experiment, extra = {}) {
  if (typeof window === "undefined") return;
  const variant = (window.__ddb_ab && window.__ddb_ab[experiment]) || "unknown";
  try {
    track(eventName, { experiment, variant, ...extra });
  } catch {}
}
