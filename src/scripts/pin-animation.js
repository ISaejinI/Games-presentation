import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class PinAnimation {
    constructor() {
        this.init();
    }

    init() {
        gsap.registerPlugin(ScrollTrigger);
        this.pinAnimation();
    }

    pinAnimation() {
        const imageFeature = document.querySelectorAll('.feat-img');
        const textFeature = document.querySelectorAll('.feat');
        const viewportHeight = window.innerHeight;

        gsap.set(imageFeature, { yPercent: -100, });
        gsap.set(textFeature, { opacity: 0.1, });


        ScrollTrigger.create({
            trigger: '.game-feature',
            start: 'bottom bottom',
            end: `+=${viewportHeight * (imageFeature.length / 2)}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalElements = imageFeature.length;

                const currentElementIndex = Math.floor(progress * totalElements);
                const elementProgress = (progress * totalElements) % 1;

                imageFeature.forEach((img, index) => {
                    if (index < currentElementIndex) {
                        gsap.set(img, { yPercent: 0 });
                        gsap.set(textFeature[index], { opacity: 1 });
                    } else if (index === currentElementIndex) {
                        gsap.set(img, { yPercent: -100 - (elementProgress * -100) });
                        gsap.set(textFeature[index], { opacity: elementProgress });
                    } else {
                        gsap.set(img, { yPercent: -100 });
                        gsap.set(textFeature[index], { opacity: 0.1 });
                    }
                });

            }
        });
    }
}









