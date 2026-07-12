/*
==========================================
MJT Project
Reading Progress
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'ReadingProgress',
    init() {
        this.bar = MJT.select(
            '.reading-progress'
        );
        if (
            !this.bar
        ) {
            return;
        }
        this.bind();
    },
    bind() {
        window.addEventListener(
            'scroll',
            () => this.update(), {
                passive: true
            }
        );
        this.update();
    },
    update() {
        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;
        if (
            documentHeight <= 0
        ) {
            this.bar.style.width = '100%';
            return;
        }
        const progress =
            (window.scrollY /
                documentHeight) * 100;
        this.bar.style.width =
            `${Math.min(progress,100)}%`;
    }
});
