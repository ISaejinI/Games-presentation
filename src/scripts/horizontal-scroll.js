import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default class HorizontalScroll {
    constructor() {
        this.init();
    }

    init() {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        this.horizontalScrollAnimation();
    }

    horizontalScrollAnimation() {
        const cards = document.querySelectorAll('.character-card');
        const cardsContainer = document.querySelector('.characters-container');

        const totalElements = cards.length;
        const viewportHeight = window.innerHeight;

        let splitTextInstances = [];
        document.fonts.ready.then(() => {
            cards.forEach((card, index) => {
                const textElement = card.querySelector('.subtitle');
                if (textElement) {
                    const splitText = new SplitText(textElement, { type: "chars" });
                    splitTextInstances[index] = splitText;
                    gsap.set(splitText.chars, { opacity: 0.1 });
                }
            });

            if (splitTextInstances[0]) {
                gsap.to(splitTextInstances[0].chars, {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.02,
                    scrollTrigger: {
                        trigger: '.characters-container',
                        start: "top 80%",
                        end: "bottom bottom",
                        scrub: true,
                    }
                });
            }
        });

        ScrollTrigger.create({
            trigger: '.characters',
            start: 'bottom bottom',
            end: `+=${viewportHeight * (cards.length - 1)}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const totalScrollPercent = (cards.length - 1) * 100;

                gsap.set(cardsContainer, {
                    xPercent: -totalScrollPercent * progress
                });

                const totalCards = cards.length - 1;
                const currentCardFloat = progress * totalCards;

                for (let i = 1; i < cards.length; i++) {
                    if (splitTextInstances[i]) {
                        const cardStartProgress = (i - 1) / (cards.length - 1);
                        const cardEndProgress = i / (cards.length - 1);

                        if (progress >= cardStartProgress && progress <= cardEndProgress) {
                            const cardProgress = (progress - cardStartProgress) / (cardEndProgress - cardStartProgress);

                            splitTextInstances[i].chars.forEach((char, charIndex) => {
                                const charStartProgress = charIndex / splitTextInstances[i].chars.length;
                                const charEndProgress = (charIndex + 1) / splitTextInstances[i].chars.length;

                                let charOpacity = 0.1;
                                if (cardProgress >= charStartProgress) {
                                    if (cardProgress >= charEndProgress) {
                                        charOpacity = 1;
                                    } else {
                                        const charAnimProgress = (cardProgress - charStartProgress) / (charEndProgress - charStartProgress);
                                        charOpacity = 0.1 + (0.9 * charAnimProgress);
                                    }
                                }

                                gsap.set(char, { opacity: charOpacity });
                            });
                        } else if (progress > cardEndProgress) {
                            gsap.set(splitTextInstances[i].chars, { opacity: 1 });
                        } else {
                            gsap.set(splitTextInstances[i].chars, { opacity: 0.1 });
                        }
                    }
                }
            }
        });
    }
}