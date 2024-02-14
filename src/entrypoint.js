import intersect from "@alpinejs/intersect";
import collapse from "@alpinejs/collapse";
import focus from "@alpinejs/focus";

export default (Alpine) => {
  Alpine.store("main", {
    // Config
    // Global State
  });

  Alpine.data("homePageState", () => ({
    activeProjectIndex: null,
    projectsActive: false,
    handleProjectHover(index) {
      this.activeProjectIndex = index;
    },
  }));

  Alpine.data("orbContainer", () => ({
    orbs: [],
    userOrbs: [],
    orbCount: 1,
    orbCountUser: 1,
    orbTimer: 2500,
    isRunning: true,

    generateOrb() {
      if (!this.isRunning) return; // Early exit if not running

      // Add new orb
      const newOrb = { id: `orb${this.orbCount}` };
      this.orbs.push(newOrb);

      // Handle orb fading and removal if more than 15 orbs
      if (this.orbs.length > 15) {
        const newOrbs = [...this.orbs, { id: `orb${this.orbCount}` }];
        const updatedOrbs = newOrbs.slice(1);
        this.orbs = updatedOrbs;
      }

      // Increment orb count after a delay
      setTimeout(() => {
        this.orbCount++;
      }, this.orbTimer);
    },

    init() {
      this.generateOrb();
    },
  }));

  Alpine.data("orb", () => ({
    orbPosX: 0,
    orbPosY: 0,
    orbSize: 0,
    orbOpacity: 1,
    orbGrowth: 0,
    orbColor: "",
    orbSpeedHor: 0,
    orbSpeedVert: 0,
    isInitialized: false,
    isFading: false,
    timer: 0,
    orbColors: [
      "rgba(7, 31, 69, 0.5)",
      "rgba(55, 88, 102, 0.5)",
      "rgba(55, 59, 102, 0.5)",
      "rgba(16, 80, 58, 0.5)",
      "rgba(154, 72, 43, 0.3)",
      "rgba(213, 111, 79, 0.2)",
      "rgba(79, 213, 95, 0.2)",
      "rgba(143, 57, 130, 0.3)",
    ],
    getSpeed() {
      let speed = Math.random() * 10;
      let direction = Math.floor(Math.random() * 10);
      if (direction >= 5) {
        return speed;
      }
      return -speed;
    },
    getGrowth() {
      let rate = Math.random() * 2;
      let direction = Math.floor(Math.random() * 10);
      if (direction >= 5) {
        return rate;
      }
      return -rate;
    },
    getPosX() {
      // Generate a random X position based on screen width
      const screenWidth = window.innerWidth;
      return Math.floor(Math.random() * screenWidth) - 50; // Adjust as necessary
    },
    getPosY() {
      // Generate a random Y position based on screen height
      const screenHeight = window.innerHeight;
      return Math.floor(Math.random() * screenHeight) - 50; // Adjust as necessary
    },
    getSize() {
      if (window.innerWidth < 768) {
        let size = Math.floor(Math.random() * 250);
        if (size < 50) {
          size += size + 50;
        }
        return size;
      } else {
        let size = Math.floor(Math.random() * 500);
        if (size < 200) {
          size += 300;
        }
        return size;
      }
    },
    getColor() {
      let colorIndex = Math.floor(Math.random() * this.orbColors.length);
      return this.orbColors[colorIndex];
    },
    initializeOrb() {
      this.orbPosX = this.getPosX();
      this.orbPosY = this.getPosY();
      this.orbSpeedHor = this.getSpeed();
      this.orbSpeedVert = this.getSpeed();
      this.orbGrowth = this.getGrowth();
      this.orbSize = this.getSize();
      this.orbColor = this.getColor();
      this.isInitialized = true;
      this.timer += 0.1;
      this.updateOrb();
    },
    updateOrb() {
      if (this.isInitialized) {
        let x = this.orbPosX + this.orbSpeedHor / 10;
        let y = this.orbPosY + this.orbSpeedVert / 10;
        let g = this.orbSize + this.orbGrowth / 10;
        this.orbPosX = x;
        this.orbPosY = y;

        if (this.timer > 100) {
          this.orbOpacity = this.orbOpacity - 0.02;
          this.orbSize = this.orbSize * 0.999;
        }
        if (this.timer <= 100) {
          this.orbSize = g;
        }

        setTimeout(() => {
          this.timer += 0.1;
        }, 10);
      }
    },
    init() {
      this.initializeOrb();
    },
  }));

  Alpine.plugin(collapse);
  Alpine.plugin(intersect);
  Alpine.plugin(focus);
};
