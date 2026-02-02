import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";


export default class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        this.splitTextAnimation();
    }

    splitTextAnimation() {
        document.fonts.ready.then(() => {
            document.querySelectorAll('.fade-text').forEach((element) => {
                const text = new SplitText(element, { type: "chars" });
                const scrollConfig = {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 55%",
                    scrub: true,
                    toggleActions: "play play reverse reverse",
                }

                gsap.fromTo(text.chars, {
                    opacity: 0.1,
                }, {
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.02,
                    scrollTrigger: scrollConfig
                })
            });
        });
    }
}