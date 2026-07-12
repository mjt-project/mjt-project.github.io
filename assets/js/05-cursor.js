/*
==========================================
MJT Project
Cursor Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Cursor',
    init() {
        if (
            window.matchMedia('(pointer: coarse)').matches
        ) {
            return;
        }
        this.cursor = MJT.select('.cursor');
        this.cursorDot = MJT.select('.cursor-dot');
        if (
            !this.cursor ||
            !this.cursorDot
        ) {
            return;
        }
        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        this.current = {
            x: this.mouse.x,
            y: this.mouse.y
        };
        this.bind();
        this.animate();
    },
    bind() {
        window.addEventListener(
            'mousemove',
            event => {
                this.mouse.x = event.clientX;
                this.mouse.y = event.clientY;
                this.cursorDot.style.transform =
                    `translate3d(${this.mouse.x}px,${this.mouse.y}px,0)`;
            }, {
                passive: true
            }
        );
        const hoverTargets = MJT.selectAll(
            `
            a,
            button,
            .btn,
            .card,
            .project-card,
            .repository,
            .navbar-brand
            `
        );
        hoverTargets.forEach(element => {
            element.addEventListener(
                'mouseenter',
                () => {
                    this.cursor.classList.add('cursor-hover');
                }
            );
            element.addEventListener(
                'mouseleave',
                () => {
                    this.cursor.classList.remove('cursor-hover');
                }
            );
        });
        document.addEventListener(
            'mousedown',
            () => {
                this.cursor.classList.add('cursor-active');
            }
        );
        document.addEventListener(
            'mouseup',
            () => {
                this.cursor.classList.remove('cursor-active');
            }
        );
        document.addEventListener(
            'mouseleave',
            () => {
                this.cursor.classList.add('cursor-hidden');
                this.cursorDot.classList.add('cursor-hidden');
            }
        );
        document.addEventListener(
            'mouseenter',
            () => {
                this.cursor.classList.remove('cursor-hidden');
                this.cursorDot.classList.remove('cursor-hidden');
            }
        );
    },
    animate() {
        const update = () => {
            this.current.x = MJT.lerp(
                this.current.x,
                this.mouse.x,
                0.15
            );
            this.current.y = MJT.lerp(
                this.current.y,
                this.mouse.y,
                0.15
            );
            this.cursor.style.transform =
                `translate3d(${this.current.x}px,${this.current.y}px,0)`;
            requestAnimationFrame(update);
        };
        update();
    }
});
