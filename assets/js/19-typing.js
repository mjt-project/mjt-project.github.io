/*
==========================================
MJT Project
Typing Animation
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Typing',
    init() {
        this.elements = MJT.selectAll(
            '[data-typing]'
        );
        if (!this.elements.length) {
            return;
        }
        this.elements.forEach(element => {
            this.prepare(element);
        });
    },
    prepare(element) {
        const texts = element.dataset.typing
            .split('|')
            .map(text => text.trim());
        this.type(
            element,
            texts,
            0
        );
    },
    async type(
        element,
        texts,
        index
    ) {
        const text =
            texts[index];
        element.textContent = '';
        for (
            let i = 0; i <= text.length; i++
        ) {
            element.textContent =
                text.slice(0, i);
            await sleep(45);
        }
        await sleep(1800);
        for (
            let i = text.length; i >= 0; i--
        ) {
            element.textContent =
                text.slice(0, i);
            await sleep(18);
        }
        this.type(
            element,
            texts,
            (index + 1) % texts.length
        );
    }
});
