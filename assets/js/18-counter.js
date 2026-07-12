/*
==========================================
MJT Project
Counter Animation
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Counter',
    init() {
        this.items = MJT.selectAll('[data-counter]');
        if (!this.items.length) {
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
                    this.animate(entry.target);
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: .35
            }
        );
        this.items.forEach(item => {
            observer.observe(item);
        });
    },
    animate(element) {
        const end = Number(
            element.dataset.counter
        );
        const start = 0;
        const duration = Number(
            element.dataset.duration || 1800
        );
        if (
            typeof anime !== 'undefined'
        ) {
            const object = {
                value: start
            };
            anime({
                targets: object,
                value: end,
                duration,
                easing: 'easeOutExpo',
                round: 1,
                update: () => {
                    element.textContent =
                        this.format(
                            object.value
                        );
                }
            });
        } else {
            let current = start;
            const step = Math.max(
                1,
                Math.ceil(end / 60)
            );
            const timer = setInterval(() => {
                current += step;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }
                element.textContent =
                    this.format(current);
            }, 16);
        }
    },
    format(value) {
        return new Intl.NumberFormat(
            'en-US'
        ).format(value);
    }
});
