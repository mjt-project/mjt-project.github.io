/*
==========================================
MJT Project
Navbar Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Navbar',
    init() {
        this.navbar = MJT.select('.navbar');
        this.toggle = MJT.select('.navbar-toggle');
        this.mobile = MJT.select('.navbar-mobile');
        this.links = MJT.selectAll('.nav-link');
        if (!this.navbar) return;
        this.handleScroll();
        this.handleToggle();
        this.handleActiveLink();
        this.handleOutsideClick();
        this.handleEscape();
    },
    handleScroll() {
        MJT.onScroll((scrollY) => {
            if (scrollY > 20) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    },
    handleToggle() {
        if (!this.toggle || !this.mobile) return;
        this.toggle.addEventListener('click', () => {
            this.mobile.classList.toggle('active');
            this.toggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    },
    closeMenu() {
        if (!this.mobile) return;
        this.mobile.classList.remove('active');
        this.toggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
    },
    handleOutsideClick() {
        document.addEventListener('click', (event) => {
            if (!this.mobile) return;
            if (
                this.mobile.contains(event.target) ||
                this.toggle?.contains(event.target)
            ) {
                return;
            }
            this.closeMenu();
        });
    },
    handleEscape() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeMenu();
            }
        });
    },
    handleActiveLink() {
        if (!this.links.length) return;
        const sections = MJT.selectAll('section[id]');
        if (!sections.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    this.links.forEach((link) => {
                        const href = link.getAttribute('href');
                        if (!href?.startsWith('#')) return;
                        link.classList.toggle(
                            'active',
                            href === `#${id}`
                        );
                    });
                });
            }, {
                rootMargin: '-40% 0px -50% 0px',
                threshold: 0
            }
        );
        sections.forEach(section => observer.observe(section));
    }
});
