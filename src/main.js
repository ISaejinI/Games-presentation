import './css/main.scss';
import './scripts/barba.js';
import './scripts/smooth-scroll.js';
import './scripts/mouse-follower.js';
import AnimationHero from './scripts/animation-hero.js';
import TextReveal from './scripts/text-reveal.js';
import HorizontalScroll from './scripts/horizontal-scroll.js';
import FillerImage from './scripts/filler-image.js';
import PinAnimation from './scripts/pin-animation.js';
import Carousel from './scripts/carousel.js';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        this.loadApp();
    }

    loadApp() {
        new AnimationHero();
        new TextReveal();
        new HorizontalScroll();
        new FillerImage();
        new PinAnimation();
        new Carousel();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});