/*
==========================================
MJT Project
Page Transitions
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'PageTransitions',
    init() {
        this.links = MJT.selectAll(
            'a[href]'
        );
        this.bind();
        this.reveal();
    },
    bind() {
        this.links.forEach(link => {
            const href =
                link.getAttribute('href');
            if (
                !href ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                link.target === '_blank' ||
                link.hasAttribute('download')
            ) {
                return;
            }
            link.addEventListener(
                'click',
                event => {
                    const url =
                        link.href;
                    if (
                        new URL(url).origin !==
                        location.origin
                    ) {
                        return;
                    }
                    event.preventDefault();
                    this.leave(url);
                }
            );
        });
    },
    leave(url) {
        if (
            typeof anime !== 'undefined'
        ) {
            anime({
                targets: 'main',
                opacity: [1, 0],
                translateY: [0, 18],
                duration: 220,
                easing: 'easeInQuad',
                complete: () => {
                    location.href = url;
                }
            });
        } else {
            location.href = url;
        }
    },
    reveal() {
        const main = MJT.select('main');
        if (!main) return;
        if (
            typeof anime !== 'undefined'
        ) {
            anime({
                targets: main,
                opacity: [0, 1],
                translateY: [18, 0],
                duration: 450,
                easing: 'easeOutQuad'
            });
        }
    }
});
