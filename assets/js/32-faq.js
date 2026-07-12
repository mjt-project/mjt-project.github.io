/*
==========================================
MJT Project
FAQ
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'FAQ',
    init() {
        this.items = MJT.selectAll(
            '.faq-item'
        );
        if (
            !this.items.length
        ) {
            return;
        }
        this.bind();
    },
    bind() {
        this.items.forEach(item => {
            const button =
                item.querySelector(
                    '.faq-question'
                );
            if (!button) {
                return;
            }
            button.addEventListener(
                'click',
                () => {
                    this.toggle(item);
                }
            );
        });
    },
    toggle(item) {
        const active =
            item.classList.contains(
                'active'
            );
        this.items.forEach(faq => {
            faq.classList.remove(
                'active'
            );
        });
        if (active) {
            return;
        }
        item.classList.add(
            'active'
        );
        const content =
            item.querySelector(
                '.faq-answer'
            );
        if (
            content &&
            typeof anime !== 'undefined'
        ) {
            anime({
                targets: content,
                opacity: [0, 1],
                duration: 320,
                easing: 'easeOutQuad'
            });
        }
    }
});
