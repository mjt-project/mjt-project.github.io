/*
==========================================
MJT Project
Reveal Animation
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Reveal',
    init() {
        this.elements = MJT.selectAll(
            '[data-reveal]'
        );
        if (!this.elements.length) {
            return;
        }
        this.observe();
    },
    observe() {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    this.animate(
                        entry.target
                    );
                    observer.unobserve(
                        entry.target
                    );
                });
            }, {
                rootMargin: '0px 0px -12% 0px',
                threshold: .12
            }
        );
        this.elements.forEach(element => {
            observer.observe(
                element
            );
        });
    },
    animate(element) {
        const animation =
            element.dataset.animation ||
            'up';
        const delay = Number(
            element.dataset.delay || 0
        );
        if (
            typeof anime !== 'undefined'
        ) {
            const options = {
                targets: element,
                opacity: [0, 1],
                duration: 700,
                delay,
                easing: 'easeOutExpo'
            };
            switch (animation) {
                case 'left':
                    options.translateX = [-40, 0];
                    break;
                case 'right':
                    options.translateX = [40, 0];
                    break;
                case 'down':
                    options.translateY = [-40, 0];
                    break;
                case 'zoom':
                    options.scale = [.92, 1];
                    break;
                default:
                    options.translateY = [40, 0];
                    break;
            }
            anime(options);
        }
        element.classList.add(
            'revealed'
        );
    }
});
