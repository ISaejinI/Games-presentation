import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const fillerImage = document.querySelector('.filler-image .image');
    const picture = fillerImage.querySelector("picture");
    const img = fillerImage.querySelector("img");

    gsap.set(picture, {
        scale: 0.6,
    });
    gsap.set(img, {
        scale: 2,
    });

    const tlFillerImage = gsap.timeline({
        scrollTrigger: {
            trigger: fillerImage,
            start: "top bottom",
            end: "center 40%",
            scrub: true
      },
    });

    tlFillerImage.to(img, {
        scale: 1,
        ease: "power4.out",
    }).to(picture, {
        scale: 1,
        ease: "power4.out",
    },"<");
});