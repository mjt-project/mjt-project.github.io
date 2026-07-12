/*
==========================================
MJT Project
Theme Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Theme',
    init() {
        this.storageKey = 'mjt-theme';
        this.root = document.documentElement;
        this.button = MJT.select('[data-theme-toggle]');
        this.theme = this.load();
        this.apply(this.theme);
        this.bind();
    },
    bind() {
        if (!this.button) return;
        this.button.addEventListener(
            'click',
            () => {
                this.theme =
                    this.theme === 'dark' ?
                    'light' :
                    'dark';
                this.apply(this.theme);
                this.save(this.theme);
            }
        );
    },
    apply(theme) {
        this.root.setAttribute(
            'data-theme',
            theme
        );
        if (this.button) {
            this.button.setAttribute(
                'aria-label',
                theme === 'dark' ?
                'Switch to light theme' :
                'Switch to dark theme'
            );
        }
    },
    load() {
        const saved = localStorage.getItem(
            this.storageKey
        );
        if (saved) {
            return saved;
        }
        return window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches ?
            'dark' :
            'light';
    },
    save(theme) {
        localStorage.setItem(
            this.storageKey,
            theme
        );
    }
});
