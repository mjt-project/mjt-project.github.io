/*
==========================================
MJT Project
Projects Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Projects',
    init() {
        this.repositories = MJT.selectAll('.repository');
        if (!this.repositories.length) {
            return;
        }
        this.hover();
        this.featured();
    },
    hover() {
        this.repositories.forEach(repository => {
            repository.addEventListener(
                'mouseenter',
                () => {
                    if (
                        typeof anime === 'undefined'
                    ) return;
                    anime.remove(repository);
                    anime({
                        targets: repository,
                        translateY: -8,
                        scale: 1.01,
                        duration: 250,
                        easing: 'easeOutQuad'
                    });
                }
            );
            repository.addEventListener(
                'mouseleave',
                () => {
                    if (
                        typeof anime === 'undefined'
                    ) return;
                    anime.remove(repository);
                    anime({
                        targets: repository,
                        translateY: 0,
                        scale: 1,
                        duration: 250,
                        easing: 'easeOutQuad'
                    });
                }
            );
        });
    },
    featured() {
        const featured = MJT.select('.repository-featured');
        if (!featured) {
            return;
        }
        if (
            typeof anime === 'undefined'
        ) {
            return;
        }
        anime({
            targets: featured,
            boxShadow: [
                '0 0 0 rgba(59,130,246,0)',
                '0 0 45px rgba(59,130,246,.18)',
                '0 0 0 rgba(59,130,246,0)'
            ],
            duration: 4000,
            easing: 'easeInOutSine',
            loop: true
        });
    }
});
