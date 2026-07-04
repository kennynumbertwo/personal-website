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

  // /work ledger: floats the hovered project's image near the cursor and trails it.
  // Spotlight dimming of other rows is pure CSS; this only drives the preview.
  Alpine.data("workGallery", () => ({
    hovered: null,
    previewSrc: "",
    previewAspect: 1,
    x: 0,
    y: 0,
    flip: false, // place preview to the left of the cursor near the right edge
    fine: false,
    reduce: false,
    previewWidth: 290,
    offset: 28,

    init() {
      this.fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      this.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },

    get active() {
      return this.hovered !== null && this.fine && !this.reduce;
    },

    // Transform for the fixed preview: vertically centered on the cursor, offset to
    // one side, flipping before it would overflow the right edge.
    get transform() {
      const dx = this.flip ? this.x - this.offset - this.previewWidth : this.x + this.offset;
      return `translate3d(${dx}px, ${this.y}px, 0) translateY(-50%)`;
    },

    // Read preview data off the hovered row (set as data-* attributes in the markup).
    enter(el) {
      if (!this.fine || this.reduce) return;
      this.hovered = true;
      this.previewSrc = el.dataset.preview || "";
      this.previewAspect = parseFloat(el.dataset.aspect) || 1;
    },

    leave() {
      this.hovered = null;
    },

    move(e) {
      this.x = e.clientX;
      this.y = e.clientY;
      this.flip = e.clientX + this.offset + this.previewWidth > window.innerWidth;
    },

    // Staggered fade-in for the rows on load (CSS neutralizes it under reduced motion).
    animateRows(el) {
      Array.from(el.children).forEach((child, i) => {
        child.style.animationDelay = `${i * 65}ms`;
        child.classList.add("animate__fade-in-up");
      });
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
