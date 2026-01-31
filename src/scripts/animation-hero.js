import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Flip);

const initHeroAnimations = () => {
    const navbarBg = document.querySelector('.navbar-background');
    const navbarItems = document.querySelector('.navbar-items');
    const navbarLinks = document.querySelectorAll('.navbar-links');
    const navbarLogo = document.querySelector('.navbar-logo');

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const initialWidth = navbarBg.offsetWidth;
    const initialHeight = navbarBg.offsetHeight;
    const initialLinksWidth = Array.from(navbarLinks).map(
        (link) => link.offsetWidth
    );

    const state = Flip.getState(navbarLogo);
    navbarLogo.classList.add('navbar-logo-pinned');
    gsap.set(navbarLogo, { width: 250 });
    const flip = Flip.from(state, { duration: 1, ease: "none", paused: true });

    ScrollTrigger.create({
        trigger: '.navbar-backdrop',
        start: 'top top',
        end: `+=${viewportHeight}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;

            gsap.set([navbarBg, navbarItems], {
                width: gsap.utils.interpolate(initialWidth, viewportWidth, progress),
                height: gsap.utils.interpolate(initialHeight, viewportHeight, progress),
            });

            navbarLinks.forEach((link, i) => {
                gsap.set(link, {
                    width: gsap.utils.interpolate(
                        link.offsetWidth,
                        initialLinksWidth[i],
                        progress,
                    ),
                });
            });

            flip.progress(progress);
        },
    })
};

document.addEventListener('DOMContentLoaded', () => {
   initHeroAnimations();
   
   let timer;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            ScrollTrigger.getAll().forEach((t) => t.kill());

            const navbarBg = document.querySelector('.navbar-background');
            const navbarItems = document.querySelector('.navbar-items');
            const navbarLinks = document.querySelectorAll('.navbar-links');
            const navbarLogo = document.querySelector('.navbar-logo');

            gsap.set([navbarBg, navbarItems, navbarLogo, ...navbarLinks], { 
                clearProps: 'all'
            });
            navbarLogo.classList.remove('navbar-logo-pinned');

            initHeroAnimations();
        }, 250);
    });
});