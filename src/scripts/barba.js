import { gsap } from 'gsap';
import barba from '@barba/core';
import App from '../main.js';

barba.init({
    transitions : [
        {
            name: 'clip-path-transition',
            once(data) {
                gsap.set('.preloader', { display: 'flex' });
                gsap.set('body', { overflow: 'hidden', height: '100vh' });

                const progressBar = document.querySelector('.preloader-progress');
                const stella = document.querySelector('.stella-progress');

                const tl = gsap.timeline({
                    delay: 0.5,
                    ease: 'power4.inOut',
                    stagger: 0.3,
                    onComplete: () => {
                        gsap.set('body', { overflow: 'auto', height: 'auto' });
                    }
                });
                tl.to(progressBar, {
                    width: '100%',
                    duration: 3,
                    ease: 'power4.inOut',
                }).to(stella, {
                    left: 'calc(100% - 65px)',
                    duration: 3,
                    ease: 'power4.inOut',
                }, "<");

                tl.to('.preloader', {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power4.inOut',
                });
                tl.to('.preloader', {
                    display: 'none',
                });
                
                return tl;
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
                
                gsap.set('body', { overflow: 'hidden', height: '100vh' });

                gsap.set(nextOverlay, {
                    display: 'block', 
                    clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)',
                });

                const tl = gsap.timeline({
                    onStart: () => {
                        new App();
                    },
                    onComplete: () => {
                        gsap.set('body', { overflow: 'auto', height: 'auto' });
                    }
                });
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