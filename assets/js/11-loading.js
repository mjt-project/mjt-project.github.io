/*
==========================================
MJT Project
Loading Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Loading',
    init() {
        this.loader = MJT.select('.page-loader');
        if (!this.loader) {
            return;
        }
        this.imagesLoaded();
    },
    async imagesLoaded() {
        try {
            await waitForImages();
        } catch {}
        window.requestAnimationFrame(() => {
            this.hide();
        });
    },
    hide() {
        this.loader.classList.add('loaded');
        setTimeout(() => {
            this.loader.remove();
        }, 700);
    }
});
