/*
==========================================
MJT Project
Project View
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'ProjectView',
    init() {
        this.buttons = MJT.selectAll(
            '[data-view]'
        );
        this.container = MJT.select(
            '.repository-grid'
        );
        if (
            !this.buttons.length ||
            !this.container
        ) {
            return;
        }
        this.storageKey =
            'mjt-project-view';
        this.restore();
        this.bind();
    },
    bind() {
        this.buttons.forEach(button => {
            button.addEventListener(
                'click',
                () => {
                    this.change(
                        button.dataset.view
                    );
                }
            );
        });
    },
    restore() {
        const view =
            localStorage.getItem(
                this.storageKey
            ) || 'grid';
        this.change(
            view,
            false
        );
    },
    change(
        view,
        animate = true
    ) {
        localStorage.setItem(
            this.storageKey,
            view
        );
        this.buttons.forEach(button => {
            button.classList.toggle(
                'active',
                button.dataset.view === view
            );
        });
        this.container.classList.remove(
            'view-grid',
            'view-list',
            'view-compact'
        );
        this.container.classList.add(
            `view-${view}`
        );
        if (
            animate &&
            typeof anime !== 'undefined'
        ) {
            anime({
                targets: this.container.children,
                opacity: [0, 1],
                translateY: [16, 0],
                scale: [.98, 1],
                delay: anime.stagger(
                    35
                ),
                duration: 280,
                easing: 'easeOutQuad'
            });
        }
    }
});
