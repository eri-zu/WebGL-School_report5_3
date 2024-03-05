import { Gl } from "./gl";
export class Controller {
  constructor() {
    this.isUpdate = true;
    this.isMouseMove = false;
    this.isScroll = false;

    this.setup();
    this.setEvents();
  }

  setup() {
    this.gl = new Gl(document.querySelector(".canvaswrap"));
  }

  onUpdate() {
    if (!this.isUpdate) return;

    const scrollY = window.scrollY;

    this.timer = requestAnimationFrame(this.onUpdate.bind(this));
    this.gl.onUpdate(scrollY);
  }

  onResize() {
    this.gl.onResize();
  }

  onMouseMove() {
    if (!this.isMouseMove) return;
  }

  onScroll() {
    if (!this.isScroll) return;
  }

  load() {
    window.scrollTo(0, 0);
  }

  setEvents() {
    this.onUpdate();
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("scroll", this.onScroll.bind(this));
    window.addEventListener("load", this.load.bind(this));
  }
}

(() => {
  // if (window.gb === undefined) window.gb = {};
  new Controller();
})();
