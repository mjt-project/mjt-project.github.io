/*
==========================================
MJT Project
Page Loader
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'PageLoader',
    init() {
        this.loader = MJT.select('.page-loader');
        if (!this.loader) {
            return;
        }
        this.progress = MJT.select(
            '.page-loader-progress'
        );
        this.text = MJT.select(
            '.page-loader-text'
        );
        this.value = 0;
        this.start();
    },
    start() {
        const timer = setInterval(() => {
            this.value += Math.random() * 12;
            if (this.value >= 92) {
                clearInterval(timer);
            }
            this.render();
        }, 120);
        window.addEventListener(
            'load',
            () => {
                this.value = 100;
                this.render();
                setTimeout(() => {
                    this.hide();
                }, 350);
            }
        );
    },
    render() {
        if (this.progress) {
            this.progress.style.width =
                `${this.value}%`;
        }
        if (this.text) {
            this.text.textContent =
                `${Math.floor(this.value)}%`;
        }
    },
    hide() {
        if (
            typeof anime !== 'undefined'
        ) {
            anime({
                targets: this.loader,
                opacity: [1, 0],
                duration: 450,
                easing: 'easeOutQuad',
                complete: () => {
                    this.loader.remove();
                }
            });
        } else {
            this.loader.remove();
        }
    }
});
