import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

export default class Carousel {
    constructor() {
        this.init();
    }

    init() {
        gsap.registerPlugin(SplitText, CustomEase);
        CustomEase.create(
            "hop",
            "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
        );
        this.setupCarousel();
    }

    setupCarousel() {
        this.carouselSlides = [
            {
                title: "Les magnifiques paysages",
                image: "/img/spir-hero.webp"
            },
            {
                title: "Construire et améliorer le bateau",
                image: "/img/spir-construction.webp"
            },
            {
                title: "Pêcher des poissons",
                image: "/img/spir-peche.webp"
            },
            {
                title: "Partager des moments conviviaux",
                image: "/img/spir-convivialite.webp"
            },
            {
                title: "Réconforter les esprits",
                image: "/img/spir-reconfort.webp"
            },
            {
                title: "Récolter des ressources",
                image: "/img/spir-activite.webp"
            },
            {
                title: "Faire pousser son jardin",
                image: "/img/spir-ressources.webp"
            },
        ];

        this.currentIndex = 0;
        this.carouselTextElements = [];
        this.splitTextInstances = [];
        this.isAnimating = false;

        this.initCarousel();
    }


    initCarousel() {
        this.carousel = document.querySelector('.carousel');
        this.carouselImages = document.querySelector('.carousel-images');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');

        this.createCarouselTitles();
        this.createInitialSlide();
        this.bindCarouselControls();

        document.fonts.ready.then(() => {
            this.splitTitles();
            this.initFirstSlide();
        });
    }

    createCarouselTitles() {
        this.carouselSlides.forEach((slide) => {
            const slideTitleContainer = document.createElement('div');
            slideTitleContainer.classList.add('slide-title-container');

            const slideTitle = document.createElement('h2');
            slideTitle.classList.add('slide-title');
            slideTitle.textContent = slide.title;

            slideTitleContainer.appendChild(slideTitle);
            this.carousel.appendChild(slideTitleContainer);

            this.carouselTextElements.push(slideTitleContainer);
        })
    }

    createInitialSlide() {
        const initialSlideImgContainer = document.createElement('div');
        initialSlideImgContainer.classList.add('img');

        const initialSlideImg = document.createElement('img');
        initialSlideImg.src = this.carouselSlides[0].image;

        initialSlideImgContainer.appendChild(initialSlideImg);
        this.carouselImages.appendChild(initialSlideImgContainer);
    }

    splitTitles() {
        this.carouselTextElements.forEach((slide) => {
            const slideTitle = slide.querySelector('.slide-title');
            const splitText = new SplitText(slideTitle, {
                type: 'words',
                wordsClass: 'word',
            });
            this.splitTextInstances.push(splitText);
        });
    }

    bindCarouselControls() {
        this.nextBtn.addEventListener('click', () => {
            if (this.isAnimating) return;
            this.currentIndex = (this.currentIndex + 1) % this.carouselSlides.length;
            this.animateSlide('right');
        });
        this.prevBtn.addEventListener('click', () => {
            if (this.isAnimating) return;
            this.currentIndex = (this.currentIndex - 1 + this.carouselSlides.length) % this.carouselSlides.length;
            this.animateSlide('left');
        })
    }

    initFirstSlide() {
        const initialSlideWords = this.carouselTextElements[0].querySelectorAll('.word');
        gsap.to(initialSlideWords, {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
        });

        const currentWords = this.carouselTextElements[this.currentIndex].querySelectorAll('.word');
        gsap.to(currentWords, {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
            overwrite: true,
            onComplete: () => {
                gsap.set(currentWords, {
                    filter: 'blur(0px)',
                    opacity: 1,
                })
            }
        })
    }

    animateSlide(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const viewportWidth = window.innerWidth;
        const slideOffset = Math.min(viewportWidth * 0.5, 500);

        const currentSlide = this.carouselImages.querySelector('.img:last-child');
        const currentSlideImage = currentSlide.querySelector('img');

        const newSlideImgContainer = document.createElement('div');
        newSlideImgContainer.classList.add('img');

        const newSlideImg = document.createElement('img');
        newSlideImg.src = this.carouselSlides[this.currentIndex].image;

        gsap.set(newSlideImg, {
            x: direction === 'left' ? -slideOffset : slideOffset,
        });

        newSlideImgContainer.appendChild(newSlideImg);
        this.carouselImages.appendChild(newSlideImgContainer);

        gsap.to(currentSlideImage, {
            x: direction === 'left' ? slideOffset : -slideOffset,
            duration: 1.5,
            ease: 'hop',
        })

        gsap.fromTo(newSlideImgContainer, {
            clipPath: direction === 'left' ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        },
            {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.5,
                ease: 'hop',
                onComplete: () => {
                    this.cleanupCarouselSlides();
                    this.isAnimating = false;
                },
            });

        gsap.to(newSlideImg, {
            x: 0,
            duration: 1.5,
            ease: 'hop',
        });

        this.updateActiveTextSlide();
    }

    updateActiveTextSlide() {
        this.carouselTextElements.forEach((element, index) => {
            const words = element.querySelectorAll('.word');
            if (index !== this.currentIndex) {
                gsap.to(words, {
                    filter: 'blur(75px)',
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        });

        const currentWords = this.carouselTextElements[this.currentIndex].querySelectorAll('.word');
        gsap.to(currentWords, {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3
        });
    }

    cleanupCarouselSlides() {
        const imgElements = this.carouselImages.querySelectorAll('.img');
        if (imgElements.length > 1) {
            for (let i = 0; i < imgElements.length - 1; i++) {
                imgElements[i].remove();
            }
        }
    }

}