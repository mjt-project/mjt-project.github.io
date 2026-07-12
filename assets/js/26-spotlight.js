/*
==========================================
MJT Project
Spotlight Effect
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Spotlight',
    init() {
        this.cards = MJT.selectAll(
            '.card, .repository, .glass-card'
        );
        if (!this.cards.length) {
            return;
        }
        this.bind();
    },
    bind() {
        this.cards.forEach(card => {
            card.addEventListener(
                'mousemove',
                event => {
                    const rect =
                        card.getBoundingClientRect();
                    const x =
                        event.clientX - rect.left;
                    const y =
                        event.clientY - rect.top;
                    card.style.setProperty(
                        '--spotlight-x',
                        `${x}px`
                    );
                    card.style.setProperty(
                        '--spotlight-y',
                        `${y}px`
                    );
                }
            );
            card.addEventListener(
                'mouseenter',
                () => {
                    card.classList.add(
                        'spotlight'
                    );
                }
            );
            card.addEventListener(
                'mouseleave',
                () => {
                    card.classList.remove(
                        'spotlight'
                    );
                }
            );
        });
    }
});
