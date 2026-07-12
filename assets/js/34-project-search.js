/*
==========================================
MJT Project
Project Search
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'ProjectSearch',
    init() {
        this.input = MJT.select(
            '#project-search'
        );
        this.repositories = MJT.selectAll(
            '.repository, .repository-card'
        );
        this.empty = MJT.select(
            '.repository-empty'
        );
        if (
            !this.input ||
            !this.repositories.length
        ) {
            return;
        }
        this.bind();
    },
    bind() {
        this.input.addEventListener(
            'input',
            () => {
                this.search(
                    this.input.value
                );
            }
        );
    },
    search(keyword) {
        keyword = keyword
            .trim()
            .toLowerCase();
        let visible = 0;
        this.repositories.forEach(
            repository => {
                const text =
                    repository.textContent
                    .toLowerCase();
                const matched =
                    keyword === '' ||
                    text.includes(
                        keyword
                    );
                repository.hidden = !matched;
                if (
                    matched
                ) {
                    visible++;
                    if (
                        typeof anime !==
                        'undefined'
                    ) {
                        anime({
                            targets: repository,
                            opacity: [0, 1],
                            translateY: [12, 0],
                            duration: 220,
                            easing: 'easeOutQuad'
                        });
                    }
                }
            }
        );
        if (
            this.empty
        ) {
            this.empty.hidden =
                visible !== 0;
        }
    }
});
