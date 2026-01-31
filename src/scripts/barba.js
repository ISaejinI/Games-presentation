import { gsap } from 'gsap';
import barba from '@barba/core';

barba.init({
    transitions : [
        {
            name: 'clip-path-transition',
            once(data) {
                // Animation for the initial page load
            },
            leave(data) {
                const currentContainer = data.current.container;
                const currentOverlay = document.querySelector('.page-transition-overlay');

                gsap.set(currentOverlay, {
                    display: 'block',
                    clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)', 
                });

                const tl = gsap.timeline();
                tl.to(currentOverlay, {
                    clipPath: 'polygon(100% 75%, 100% 100%, 75% 100%, 0% 0%)',
                    duration: 0.5,
                    ease: 'power4.inOut'
                });
                tl.to(currentOverlay, {
                    clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)',
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: () => {
                        currentContainer.remove();
                    }
                });
                return tl;
            },
            enter(data) {
                const nextContainer = data.next.container;
                const nextOverlay = document.querySelector('.page-transition-overlay');

                gsap.set(nextOverlay, {
                    display: 'block', 
                    clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)',
                });

                const tl = gsap.timeline();
                tl.to(nextOverlay, {
                    clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 0% 0%)',
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        gsap.set(nextOverlay, { display: 'none' });
                    }
                })
                return tl;
            }
        }
    ]
})