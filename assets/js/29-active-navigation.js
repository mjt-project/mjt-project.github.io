/*
==========================================
MJT Project
Active Navigation
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'ActiveNavigation',
    init() {
        this.links = MJT.selectAll(
            '.navbar a, .footer a'
        );
        if (
            !this.links.length
        ) {
            return;
        }
        this.current =
            this.normalize(
                location.pathname
            );
        this.update();
    },
    update() {
        this.links.forEach(link => {
            const href =
                link.getAttribute('href');
            if (
                !href ||
                href.startsWith('#') ||
                href.startsWith('http')
            ) {
                return;
            }
            const target =
                this.normalize(
                    new URL(
                        href,
                        location.origin
                    ).pathname
                );
            link.classList.toggle(
                'active',
                target === this.current
            );
        });
    },
    normalize(path) {
        path = path
            .replace(/index\.html$/, '')
            .replace(/\/+/g, '/');
        if (
            path.length > 1 &&
            path.endsWith('/')
        ) {
            path =
                path.slice(0, -1);
        }
        return path || '/';
    }
});
