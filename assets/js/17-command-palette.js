/*
==========================================
MJT Project
Command Palette
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'CommandPalette',
    init() {
        this.modal = MJT.select('#command-palette');
        this.input = MJT.select('#command-input');
        this.list = MJT.select('#command-results');
        if (
            !this.modal ||
            !this.input ||
            !this.list
        ) {
            return;
        }
        this.commands = [{
            title: 'Trang chủ',
            keywords: 'home',
            action: () => {
                location.href = '/';
            }
        }, {
            title: 'Projects',
            keywords: 'repository project',
            action: () => {
                location.href = '/projects/';
            }
        }, {
            title: 'GitHub',
            keywords: 'github source',
            action: () => {
                window.open(
                    'https://github.com/mjt-project',
                    '_blank'
                );
            }
        }, {
            title: 'MJT Core',
            keywords: 'core runtime',
            action: () => {
                window.open(
                    'https://github.com/mjt-project/mjt-core',
                    '_blank'
                );
            }
        }];
        this.render(this.commands);
        this.bind();
    },
    bind() {
        document.addEventListener(
            'keydown',
            event => {
                if (
                    event.key.toLowerCase() === 'k' &&
                    (event.ctrlKey || event.metaKey)
                ) {
                    event.preventDefault();
                    this.open();
                }
                if (
                    event.key === 'Escape'
                ) {
                    this.close();
                }
            }
        );
        this.input.addEventListener(
            'input',
            () => {
                this.search(
                    this.input.value
                );
            }
        );
        this.modal.addEventListener(
            'click',
            event => {
                if (
                    event.target === this.modal
                ) {
                    this.close();
                }
            }
        );
    },
    open() {
        this.modal.classList.add(
            'active'
        );
        this.input.focus();
        this.input.select();
    },
    close() {
        this.modal.classList.remove(
            'active'
        );
        this.input.value = '';
        this.render(
            this.commands
        );
    },
    search(keyword) {
        keyword = keyword
            .trim()
            .toLowerCase();
        if (!keyword) {
            this.render(
                this.commands
            );
            return;
        }
        const result = this.commands.filter(
            item =>
            item.title
            .toLowerCase()
            .includes(keyword) ||
            item.keywords
            .includes(keyword)
        );
        this.render(result);
    },
    render(items) {
        this.list.innerHTML = '';
        items.forEach(item => {
            const button =
                document.createElement(
                    'button'
                );
            button.className =
                'command-item';
            button.textContent =
                item.title;
            button.onclick = () => {
                this.close();
                item.action();
            };
            this.list.appendChild(
                button
            );
        });
    }
});
