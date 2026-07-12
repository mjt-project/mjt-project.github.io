/*
==========================================
MJT Project
Scroll Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Scroll',
    init() {
        this.sections = MJT.selectAll('[data-reveal]');
        this.progress = MJT.select('.scroll-progress');
        this.createObserver();
        this.createProgressBar();
        this.smoothAnchor();
    },
    createObserver() {
        if (!this.sections.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '0px 0px -10% 0px',
                threshold: .15
            }
        );
        this.sections.forEach(section => {
            observer.observe(section);
        });
    },
    createProgressBar() {
        if (!this.progress) return;
        MJT.onScroll(() => {
            const scrollTop =
                window.scrollY;
            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;
            const percent =
                documentHeight <= 0 ?
                0 :
                (scrollTop / documentHeight) * 100;
            this.progress.style.width =
                `${percent}%`;
        });
    },
    smoothAnchor() {
        document.addEventListener(
            'click',
            event => {
                const link = event.target.closest('a[href^="#"]');
                if (!link) return;
                const target =
                    document.querySelector(
                        link.getAttribute('href')
                    );
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.replaceState(
                    null,
                    '',
                    link.getAttribute('href')
                );
            }
        );
    }
});
0
