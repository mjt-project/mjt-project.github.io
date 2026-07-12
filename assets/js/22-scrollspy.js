/*
==========================================
MJT Project
Scroll Spy
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'ScrollSpy',
    init() {
        this.links = MJT.selectAll(
            '.nav-link[href^="#"]'
        );
        this.sections = MJT.selectAll(
            'section[id]'
        );
        if (
            !this.links.length ||
            !this.sections.length
        ) {
            return;
        }
        this.observe();
    },
    observe() {
        const observer =
            new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }
                        const id =
                            entry.target.id;
                        this.links.forEach(
                            link => {
                                const active =
                                    link.getAttribute(
                                        'href'
                                    ) === `#${id}`;
                                link.classList.toggle(
                                    'active',
                                    active
                                );
                            }
                        );
                    });
                }, {
                    rootMargin: '-45% 0px -45% 0px',
                    threshold: .05
                }
            );
        this.sections.forEach(
            section => {
                observer.observe(
                    section
                );
            }
        );
    }
});
