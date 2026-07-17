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

    // Guarded like enter(): iOS fires emulated mouse events on tap, and any
    // reactive change here re-runs the :style bind, which sets the whole style
    // attribute and so wipes the display:none x-show put there — popping the
    // preview open on touch.
    move(e) {
      if (!this.fine || this.reduce) return;
      this.x = e.clientX;
      this.y = e.clientY;
      this.flip = e.clientX + this.offset + this.previewWidth > window.innerWidth;
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

  // Staggered fade-in for text on load. The animation itself lives in
  // global.css (.animate__fade-in), which also owns the reduced-motion and
  // resting-state handling; this only picks the targets and spaces them out.
  //   x-reveal           -> every .animate descendant
  //   x-reveal-children  -> the element's direct children
  // Two names rather than one with a `.children` modifier: the init selectors
  // below have to match the literal attribute, and `x-reveal.children` wouldn't.
  // Both take an optional per-ms stagger, e.g. x-reveal-children="35" — long
  // lists want a tighter step so the last item doesn't lag seconds behind.
  const REVEAL_STAGGER_MS = 65;
  const stagger = (targets, step) => {
    targets.forEach((target, i) => {
      target.style.animationDelay = `${i * step}ms`;
      target.classList.add("animate__fade-in");
    });
  };
  const stepFrom = (expression) => {
    const parsed = parseInt(expression, 10);
    return Number.isFinite(parsed) ? parsed : REVEAL_STAGGER_MS;
  };

  Alpine.directive("reveal", (el, { expression }) =>
    stagger(Array.from(el.querySelectorAll(".animate")), stepFrom(expression)),
  );
  Alpine.directive("reveal-children", (el, { expression }) =>
    stagger(Array.from(el.children), stepFrom(expression)),
  );

  // Mandatory: on a hard load Alpine only walks trees rooted at [x-data]/[x-init].
  // Without these, the directives would work on ClientRouter navigations (which
  // swap <body> and get walked unfiltered) and silently no-op on refresh.
  Alpine.addInitSelector(() => "[x-reveal]");
  Alpine.addInitSelector(() => "[x-reveal-children]");

  Alpine.plugin(collapse);
  Alpine.plugin(intersect);
  Alpine.plugin(focus);
};
