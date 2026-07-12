/*
==========================================
MJT Project
Search Autocomplete
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'SearchAutocomplete',
    init() {
        this.input = MJT.select(
            '.search-input'
        );
        this.dropdown = MJT.select(
            '.search-dropdown'
        );
        if (
            !this.input ||
            !this.dropdown
        ) {
            return;
        }
        this.items = [{
            title: 'MJT Core',
            description: 'Core Runtime Platform',
            url: '/projects/#mjt-core'
        }, {
            title: 'Projects',
            description: 'Danh sách dự án',
            url: '/projects/'
        }, {
            title: 'GitHub',
            description: 'MJT Project Organization',
            url: 'https://github.com/mjt-project'
        }, {
            title: 'Releases',
            description: 'Release Notes',
            url: '/releases/'
        }, {
            title: 'Documentation',
            description: 'Tài liệu',
            url: '/docs/'
        }];
        this.bind();
    },
    bind() {
        this.input.addEventListener(
            'input',
            () => {
                this.search(
                    this.input.value
                );
            }
        );
        this.input.addEventListener(
            'focus',
            () => {
                this.search(
                    this.input.value
                );
            }
        );
        document.addEventListener(
            'click',
            event => {
                if (
                    event.target.closest(
                        '.search'
                    )
                ) {
                    return;
                }
                this.dropdown.classList.remove(
                    'active'
                );
            }
        );
    },
    search(keyword) {
        keyword = keyword
            .trim()
            .toLowerCase();
        const results =
            keyword ?
            this.items.filter(item =>
                item.title
                .toLowerCase()
                .includes(keyword) ||
                item.description
                .toLowerCase()
                .includes(keyword)
            ) :
            this.items;
        this.render(results);
    },
    render(results) {
        this.dropdown.innerHTML = '';
        if (!results.length) {
            this.dropdown.innerHTML =
                '<div class="search-empty">Không tìm thấy kết quả.</div>';
            this.dropdown.classList.add(
                'active'
            );
            return;
        }
        results.forEach(item => {
            const link =
                document.createElement('a');
            link.className = 'search-item';
            link.href = item.url;
            link.innerHTML = `

                <div>

                    <div class="search-item-title">

                        ${item.title}

                    </div>

                    <div class="search-item-description">

                        ${item.description}

                    </div>

                </div>

            `;
            this.dropdown.appendChild(link);
        });
        this.dropdown.classList.add(
            'active'
        );
    }
});
