/*
==========================================
MJT Project
Repository Filter
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'RepositoryFilter',
    init() {
        this.buttons = MJT.selectAll(
            '[data-filter]'
        );
        this.repositories = MJT.selectAll(
            '.repository'
        );
        if (
            !this.buttons.length ||
            !this.repositories.length
        ) {
            return;
        }
        this.bind();
    },
    bind() {
        this.buttons.forEach(button => {
            button.addEventListener(
                'click',
                () => {
                    this.buttons.forEach(item => {
                        item.classList.remove(
                            'active'
                        );
                    });
                    button.classList.add(
                        'active'
                    );
                    this.filter(
                        button.dataset.filter
                    );
                }
            );
        });
    },
    filter(type) {
        this.repositories.forEach(repository => {
            const category =
                repository.dataset.category ||
                'all';
            const visible =
                type === 'all' ||
                category === type;
            repository.style.display =
                visible ?
                '' :
                'none';
            if (
                visible &&
                typeof anime !== 'undefined'
            ) {
                anime({
                    targets: repository,
                    opacity: [0, 1],
                    translateY: [16, 0],
                    duration: 280,
                    easing: 'easeOutQuad'
                });
            }
        });
    }
});
