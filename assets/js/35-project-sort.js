/*
==========================================
MJT Project
Project Sort
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'ProjectSort',
    init() {
        this.select = MJT.select(
            '#project-sort'
        );
        this.container = MJT.select(
            '.repository-grid, .repositories'
        );
        if (
            !this.select ||
            !this.container
        ) {
            return;
        }
        this.bind();
    },
    bind() {
        this.select.addEventListener(
            'change',
            () => {
                this.sort(
                    this.select.value
                );
            }
        );
    },
    sort(type) {
        const repositories =
            Array.from(
                this.container.children
            );
        repositories.sort(
            (a, b) => {
                switch (type) {
                    case 'stars':
                        return this.number(
                                b.dataset.stars
                            ) -
                            this.number(
                                a.dataset.stars
                            );
                    case 'updated':
                        return this.date(
                                b.dataset.updated
                            ) -
                            this.date(
                                a.dataset.updated
                            );
                    case 'name':
                        return (
                            a.dataset.name ||
                            ''
                        ).localeCompare(
                            b.dataset.name ||
                            ''
                        );
                    default:
                        return 0;
                }
            }
        );
        repositories.forEach(
            repository => {
                this.container.appendChild(
                    repository
                );
            }
        );
        if (
            typeof anime !==
            'undefined'
        ) {
            anime({
                targets: repositories,
                opacity: [0, 1],
                translateY: [18, 0],
                delay: anime.stagger(
                    35
                ),
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    },
    number(value) {
        return Number(
            value || 0
        );
    },
    date(value) {
        return new Date(
            value || 0
        ).getTime();
    }
});
