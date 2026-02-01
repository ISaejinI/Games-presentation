import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.character-card');
    const cardsContainer = document.querySelector('.characters-container');

    const totalElements = cards.length;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    ScrollTrigger.create({
        trigger: '.characters',
        start: 'top top',
        end: `+=${viewportHeight * (cards.length - 1)}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            
            // Calcul pour aller de x:0 à x:-100% + une carte visible
            const totalScrollPercent = (cards.length - 1) * 100;

            gsap.set(cardsContainer, {
                xPercent: -totalScrollPercent * progress
            });
        }
    })
});