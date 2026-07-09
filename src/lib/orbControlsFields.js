// Schema that drives the orb control panel (see OrbControls.astro). Each field maps
// to a key on the engine's CONFIG (OrbContainer.astro). `spawn: true` marks params that
// only affect newly spawned orbs — the panel's Respawn button applies them at once.
// `pairMin`/`pairMax` link a min/max slider pair so dragging one can push the other.

export const orbControlGroups = [
  {
    name: "Field",
    fields: [
      { key: "spawnIntervalMs", label: "Spawn interval", min: 200, max: 8000, step: 100, unit: "ms" },
      { key: "maxOrbs", label: "Max orbs", min: 1, max: 40, step: 1, unit: "" },
      { key: "seedCount", label: "Seed count", min: 0, max: 20, step: 1, unit: "", spawn: true },
      { key: "sizeMin", label: "Size min", min: 20, max: 800, step: 10, unit: "px", spawn: true, pairMax: "sizeMax" },
      { key: "sizeMax", label: "Size max", min: 20, max: 800, step: 10, unit: "px", spawn: true, pairMin: "sizeMin" },
    ],
  },
  {
    name: "Motion",
    fields: [
      { key: "speedMin", label: "Speed min", min: 0, max: 1500, step: 25, unit: "px/s", spawn: true, pairMax: "speedMax" },
      { key: "speedMax", label: "Speed max", min: 0, max: 1500, step: 25, unit: "px/s", spawn: true, pairMin: "speedMin" },
      { key: "turnRateMax", label: "Turn rate", min: 0, max: 12, step: 0.1, unit: "rad/s", spawn: true },
      { key: "wanderAmp", label: "Wander swing", min: 0, max: 15, step: 0.1, unit: "rad/s" },
      { key: "wanderFreqMin", label: "Wander freq min", min: 0, max: 12, step: 0.1, unit: "rad/s", spawn: true, pairMax: "wanderFreqMax" },
      { key: "wanderFreqMax", label: "Wander freq max", min: 0, max: 12, step: 0.1, unit: "rad/s", spawn: true, pairMin: "wanderFreqMin" },
      { key: "growthMax", label: "Growth", min: 0, max: 400, step: 5, unit: "px/s", spawn: true },
    ],
  },
  {
    name: "Lifecycle",
    fields: [
      { key: "fadeInMs", label: "Fade in", min: 0, max: 8000, step: 100, unit: "ms" },
      { key: "holdMs", label: "Hold", min: 0, max: 20000, step: 250, unit: "ms" },
      { key: "fadeOutMs", label: "Fade out", min: 0, max: 8000, step: 100, unit: "ms" },
    ],
  },
  {
    name: "Appearance",
    fields: [
      { key: "alphaBoost", label: "Intensity", min: 0, max: 3, step: 0.05, unit: "×" },
      { key: "opacity", label: "Opacity", min: 0, max: 1, step: 0.02, unit: "" },
      { key: "coreStopMin", label: "Softness min", min: 0, max: 1, step: 0.02, unit: "", spawn: true, pairMax: "coreStopMax" },
      { key: "coreStopMax", label: "Softness max", min: 0, max: 1, step: 0.02, unit: "", spawn: true, pairMin: "coreStopMin" },
      { key: "pulseAmp", label: "Breathe size", min: 0, max: 0.5, step: 0.01, unit: "" },
      { key: "pulseOpacityAmp", label: "Breathe opacity", min: 0, max: 0.5, step: 0.01, unit: "" },
      { key: "pulseFreqMin", label: "Breathe freq min", min: 0, max: 3, step: 0.05, unit: "rad/s", spawn: true, pairMax: "pulseFreqMax" },
      { key: "pulseFreqMax", label: "Breathe freq max", min: 0, max: 3, step: 0.05, unit: "rad/s", spawn: true, pairMin: "pulseFreqMin" },
    ],
  },
  {
    name: "Cursor",
    fields: [
      { key: "influenceRadius", label: "Reach", min: 0, max: 1500, step: 20, unit: "px" },
      { key: "pushForce", label: "Push force", min: -10000, max: 10000, step: 100, unit: "" },
      { key: "friction", label: "Friction", min: 0.2, max: 5, step: 0.1, unit: "/s" },
      { key: "maxPushSpeed", label: "Max speed", min: 0, max: 6000, step: 100, unit: "px/s" },
      { key: "pushSquish", label: "Squish", min: 0, max: 0.6, step: 0.02, unit: "" },
      { key: "pushBlur", label: "Hit blur", min: 0, max: 1, step: 0.05, unit: "" },
      { key: "squishRefSpeed", label: "Squish sensitivity", min: 50, max: 800, step: 10, unit: "px/s" },
      { key: "respondMin", label: "Respond min", min: 0, max: 4, step: 0.05, unit: "", spawn: true, pairMax: "respondMax" },
      { key: "respondMax", label: "Respond max", min: 0, max: 4, step: 0.05, unit: "", spawn: true, pairMin: "respondMin" },
    ],
  },
];

export const blendModes = ["lighter", "lighten", "screen", "source-over"];
