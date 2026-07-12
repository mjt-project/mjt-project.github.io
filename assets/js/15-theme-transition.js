/*
==========================================
MJT Project
Theme Transition Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'ThemeTransition',
    init() {
        this.button = MJT.select('[data-theme-toggle]');
        if (!this.button) {
            return;
        }
        this.bind();
    },
    bind() {
        this.button.addEventListener(
            'click',
            () => {
                this.animate();
            }
        );
    },
    animate() {
        document.documentElement.classList.add(
            'theme-transition'
        );
        if (
            typeof anime !== 'undefined'
        ) {
            anime({
                targets: 'body',
                opacity: [.96, 1],
                duration: 280,
                easing: 'easeOutQuad'
            });
            anime({
                targets: '.card, .repository, .hero-window',
                scale: [.985, 1],
                opacity: [.9, 1],
                duration: 320,
                delay: anime.stagger(18),
                easing: 'easeOutExpo'
            });
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                document.documentElement.classList.remove(
                    'theme-transition'
                );
            },
            350
        );
    }
});
