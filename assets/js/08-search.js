/*
==========================================
MJT Project
Search Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Search',
    init() {
        this.input = MJT.select('.project-search input');
        this.repositories = MJT.selectAll('.repository');
        this.empty = MJT.select('.projects-empty');
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
                this.filter(
                    this.input.value.trim().toLowerCase()
                );
            }
        );
    },
    filter(keyword) {
        let visible = 0;
        this.repositories.forEach(repository => {
            const text = repository.textContent
                .toLowerCase();
            const matched =
                keyword === '' ||
                text.includes(keyword);
            repository.style.display =
                matched ?
                '' :
                'none';
            if (matched) {
                visible++;
            }
        });
        if (!this.empty) {
            return;
        }
        if (visible === 0) {
            this.empty.hidden = false;
        } else {
            this.empty.hidden = true;
        }
    }
});
