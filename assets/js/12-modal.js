/*
==========================================
MJT Project
Modal Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Modal',
    init() {
        this.modals = MJT.selectAll('.modal');
        if (!this.modals.length) {
            return;
        }
        this.bind();
    },
    bind() {
        MJT.selectAll('[data-modal]').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.modal;
                const modal = MJT.select(`#${id}`);
                if (!modal) return;
                this.open(modal);
            });
        });
        MJT.selectAll('[data-modal-close]').forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (!modal) return;
                this.close(modal);
            });
        });
        this.modals.forEach(modal => {
            modal.addEventListener('click', event => {
                if (event.target === modal) {
                    this.close(modal);
                }
            });
        });
        document.addEventListener('keydown', event => {
            if (event.key !== 'Escape') {
                return;
            }
            this.modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    this.close(modal);
                }
            });
        });
    },
    open(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (typeof anime !== 'undefined') {
            anime({
                targets: modal.querySelector('.modal-dialog'),
                opacity: [0, 1],
                translateY: [40, 0],
                scale: [.96, 1],
                duration: 280,
                easing: 'easeOutQuad'
            });
        }
    },
    close(modal) {
        if (typeof anime !== 'undefined') {
            anime({
                targets: modal.querySelector('.modal-dialog'),
                opacity: [1, 0],
                translateY: [0, 30],
                scale: [1, .96],
                duration: 180,
                easing: 'easeInQuad',
                complete: () => {
                    modal.classList.remove('active');
                }
            });
        } else {
            modal.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
});
