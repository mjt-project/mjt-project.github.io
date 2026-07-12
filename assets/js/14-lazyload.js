/*
==========================================
MJT Project
Lazy Load Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'LazyLoad',
    init() {
        this.images = MJT.selectAll(
            'img[data-src]'
        );
        this.backgrounds = MJT.selectAll(
            '[data-bg]'
        );
        if (
            !this.images.length &&
            !this.backgrounds.length
        ) {
            return;
        }
        this.createObserver();
    },
    createObserver() {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }
                    const element = entry.target;
                    if (
                        element.dataset.src
                    ) {
                        this.loadImage(element);
                    }
                    if (
                        element.dataset.bg
                    ) {
                        this.loadBackground(element);
                    }
                    observer.unobserve(element);
                });
            }, {
                rootMargin: '200px',
                threshold: .01
            }
        );
        this.images.forEach(image => {
            observer.observe(image);
        });
        this.backgrounds.forEach(background => {
            observer.observe(background);
        });
    },
    loadImage(image) {
        const source = image.dataset.src;
        if (!source) {
            return;
        }
        const loader = new Image();
        loader.onload = () => {
            image.src = source;
            image.removeAttribute(
                'data-src'
            );
            image.classList.add(
                'loaded'
            );
        };
        loader.src = source;
    },
    loadBackground(element) {
        const source =
            element.dataset.bg;
        if (!source) {
            return;
        }
        const loader = new Image();
        loader.onload = () => {
            element.style.backgroundImage =
                `url("${source}")`;
            element.removeAttribute(
                'data-bg'
            );
            element.classList.add(
                'loaded'
            );
        };
        loader.src = source;
    }
});
