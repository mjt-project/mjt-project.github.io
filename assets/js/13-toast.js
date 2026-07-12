/*
==========================================
MJT Project
Toast Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Toast',
    init() {
        this.container = MJT.select('.toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },
    show({
        title = 'Notification',
        message = '',
        type = 'info',
        duration = 3500
    } = {}) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `

            <div class="toast-icon">

                ${this.icon(type)}

            </div>

            <div class="toast-content">

                <div class="toast-title">

                    ${title}

                </div>

                <div class="toast-message">

                    ${message}

                </div>

            </div>

            <button class="toast-close">

                ✕

            </button>

        `;
        this.container.appendChild(toast);
        if (typeof anime !== 'undefined') {
            anime({
                targets: toast,
                opacity: [0, 1],
                translateX: [40, 0],
                duration: 250,
                easing: 'easeOutQuad'
            });
        }
        const timer = setTimeout(() => {
            this.remove(toast);
        }, duration);
        toast.querySelector('.toast-close')
            .addEventListener('click', () => {
                clearTimeout(timer);
                this.remove(toast);
            });
    },
    remove(toast) {
        if (!toast) return;
        if (typeof anime !== 'undefined') {
            anime({
                targets: toast,
                opacity: [1, 0],
                translateX: [0, 40],
                duration: 220,
                easing: 'easeInQuad',
                complete: () => toast.remove()
            });
        } else {
            toast.remove();
        }
    },
    icon(type) {
        switch (type) {
            case 'success':
                return '✔';
            case 'warning':
                return '⚠';
            case 'error':
                return '✖';
            default:
                return 'ℹ';
        }
    }
});
window.toast = function(
    options
) {
    const module = MJT.modules.find(
        module => module.name === 'Toast'
    );
    if (!module) return;
    module.show(options);
};
