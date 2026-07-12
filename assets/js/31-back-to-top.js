/*
==========================================
MJT Project
Back To Top
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'BackToTop',
    init() {
        this.button = MJT.select(
            '.back-to-top'
        );
        if (!this.button) {
            return;
        }
        this.bind();
        this.update();
    },
    bind() {
        window.addEventListener(
            'scroll',
            () => this.update(), {
                passive: true
            }
        );
        this.button.addEventListener(
            'click',
            event => {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        );
    },
    update() {
        const visible =
            window.scrollY > 500;
        this.button.classList.toggle(
            'visible',
            visible
        );
        if (
            typeof anime === 'undefined'
        ) {
            return;
        }
        anime.remove(this.button);
        anime({
            targets: this.button,
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : .85,
            duration: 220,
            easing: 'easeOutQuad'
        });
    }
});
