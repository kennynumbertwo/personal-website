import intersect from "@alpinejs/intersect";
import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";
import { orbControlGroups, blendModes } from "./lib/orbControlsFields";

export default (Alpine) => {
  Alpine.data("homePageState", () => ({
    activeProjectIndex: null,
    projectsActive: false,
    handleProjectHover(index) {
      this.activeProjectIndex = index;
    },
  }));

  // Live control panel for the orb background. Talks to window.orbControls, the API
  // exposed by the canvas engine (OrbContainer.astro). All calls are guarded so the
  // panel degrades gracefully if the engine hasn't started yet.
  Alpine.data("orbControls", () => {
    const values = {};
    for (const group of orbControlGroups) {
      for (const field of group.fields) values[field.key] = field.min;
    }
    return {
      open: false,
      groups: orbControlGroups,
      blendModes,
      blendMode: "lighter",
      grayscale: false,
      colors: [],
      values,

      api() {
        return window.orbControls;
      },

      init() {
        this.syncFromEngine();
      },

      // Pull current values from the engine into the panel's reactive state.
      syncFromEngine() {
        const cfg = this.api()?.getConfig?.() ?? {};
        for (const group of this.groups) {
          for (const field of group.fields) {
            if (typeof cfg[field.key] === "number") this.values[field.key] = cfg[field.key];
          }
        }
        this.blendMode = cfg.blendMode ?? "lighter";
        this.grayscale = !!cfg.grayscale;
        this.colors = this.api()?.getColors?.() ?? [];
      },

      // Push a slider value to the engine, keeping any linked min/max pair ordered.
      apply(field) {
        const c = this.api();
        const v = this.values[field.key];
        if (field.pairMax && v > this.values[field.pairMax]) {
          this.values[field.pairMax] = v;
          c?.set(field.pairMax, v);
        }
        if (field.pairMin && v < this.values[field.pairMin]) {
          this.values[field.pairMin] = v;
          c?.set(field.pairMin, v);
        }
        c?.set(field.key, v);
      },

      setBlend(mode) {
        this.blendMode = mode;
        this.api()?.set("blendMode", mode);
      },

      toggleGrayscale() {
        this.grayscale = !this.grayscale;
        this.api()?.set("grayscale", this.grayscale);
      },

      toggleColor(i) {
        const on = !this.colors[i].enabled;
        this.colors[i].enabled = on;
        this.api()?.setColorEnabled(i, on);
      },

      respawn() {
        this.api()?.respawn();
      },

      reset() {
        this.api()?.reset();
        this.syncFromEngine();
      },

      openPanel() {
        this.open = true;
        this.$nextTick(() => this.$refs.close?.focus());
      },

      close() {
        this.open = false;
        this.$refs.trigger?.focus();
      },

      toggle() {
        this.open ? this.close() : this.openPanel();
      },
    };
  });

  Alpine.plugin(collapse);
  Alpine.plugin(intersect);
  Alpine.plugin(focus);
};
