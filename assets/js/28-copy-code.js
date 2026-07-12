/*
==========================================
MJT Project
Copy Code
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'CopyCode',
    init() {
        this.buttons = MJT.selectAll(
            '.code-copy'
        );
        if (
            !this.buttons.length
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
                    this.copy(button);
                }
            );
        });
    },
    async copy(button) {
        const block =
            button.closest(
                '.code-block'
            );
        if (!block) {
            return;
        }
        const code =
            block.querySelector(
                'pre code'
            );
        if (!code) {
            return;
        }
        try {
            await navigator.clipboard.writeText(
                code.innerText
            );
            this.success(button);
        } catch {
            this.failed(button);
        }
    },
    success(button) {
        const text =
            button.textContent;
        button.textContent =
            'Copied';
        button.classList.add(
            'success'
        );
        setTimeout(() => {
            button.textContent =
                text;
            button.classList.remove(
                'success'
            );
        }, 1800);
    },
    failed(button) {
        const text =
            button.textContent;
        button.textContent =
            'Failed';
        button.classList.add(
            'error'
        );
        setTimeout(() => {
            button.textContent =
                text;
            button.classList.remove(
                'error'
            );
        }, 1800);
    }
});
