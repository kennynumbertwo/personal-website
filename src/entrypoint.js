import intersect from "@alpinejs/intersect";
import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";

export default (Alpine) => {
  Alpine.data("homePageState", () => ({
    activeProjectIndex: null,
    projectsActive: false,
    handleProjectHover(index) {
      this.activeProjectIndex = index;
    },
  }));

  Alpine.plugin(collapse);
  Alpine.plugin(intersect);
  Alpine.plugin(focus);
};
