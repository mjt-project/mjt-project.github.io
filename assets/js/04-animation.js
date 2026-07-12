/*
==========================================
MJT Project
Animation Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Animation',
    init() {
        this.hero();
        this.cards();
        this.buttons();
        this.parallax();
    },
    hero() {
        if (
            typeof anime === 'undefined'
        ) return;
        anime.timeline({
                easing: 'easeOutExpo',
                duration: 900
            })
            .add({
                targets: '.hero-badge',
                opacity: [0, 1],
                translateY: [30, 0]
            })
            .add({
                targets: '.hero-title',
                opacity: [0, 1],
                translateY: [40, 0]
            }, '-=500')
            .add({
                targets: '.hero-description',
                opacity: [0, 1],
                translateY: [30, 0]
            }, '-=450')
            .add({
                targets: '.hero-actions .btn',
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(120)
            }, '-=400')
            .add({
                targets: '.hero-stat',
                opacity: [0, 1],
                translateY: [16, 0],
                delay: anime.stagger(80)
            }, '-=300');
    },
    cards() {
        if (
            typeof anime === 'undefined'
        ) return;
        const cards = MJT.selectAll('.card');
        if (!cards.length) return;
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime.remove(card);
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: 250,
                    easing: 'easeOutQuad'
                });
            });
            card.addEventListener('mouseleave', () => {
                anime.remove(card);
                anime({
                    targets: card,
                    scale: 1,
                    duration: 250,
                    easing: 'easeOutQuad'
                });
            });
        });
    },
    buttons() {
        const buttons = MJT.selectAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (
                    typeof anime === 'undefined'
                ) return;
                anime.remove(button);
                anime({
                    targets: button,
                    scale: 1.03,
                    duration: 180,
                    easing: 'easeOutQuad'
                });
            });
            button.addEventListener('mouseleave', () => {
                if (
                    typeof anime === 'undefined'
                ) return;
                anime({
                    targets: button,
                    scale: 1,
                    duration: 180,
                    easing: 'easeOutQuad'
                });
            });
        });
    },
    parallax() {
        const glow = MJT.select('.hero-glow');
        if (!glow) return;
        window.addEventListener(
            'mousemove',
            event => {
                const x =
                    (event.clientX / window.innerWidth - .5) * 30;
                const y =
                    (event.clientY / window.innerHeight - .5) * 30;
                glow.style.transform =
                    `translate(${x}px, ${y}px)`;
            }, {
                passive: true
            }
        );
    }
});
