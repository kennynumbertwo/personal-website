import intersect from "@alpinejs/intersect";
import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";

export default (Alpine) => {
  Alpine.store("main", {
    // Config
    // Global State
  });

  Alpine.plugin(collapse);
  Alpine.plugin(intersect);
  Alpine.plugin(focus);
};
