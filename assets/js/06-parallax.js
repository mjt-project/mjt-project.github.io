/*
==========================================
MJT Project
Parallax Module
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Parallax',
    init() {
        this.elements = MJT.selectAll('[data-parallax]');
        if (!this.elements.length) return;
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
            }, {
                passive: true
            }
        );
    },
    animate() {
        const update = () => {
            this.current.x = MJT.lerp(
                this.current.x,
                this.mouse.x,
                .08
            );
            this.current.y = MJT.lerp(
                this.current.y,
                this.mouse.y,
                .08
            );
            const offsetX =
                this.current.x / window.innerWidth - .5;
            const offsetY =
                this.current.y / window.innerHeight - .5;
            this.elements.forEach(element => {
                const speed = Number(
                    element.dataset.parallax || .04
                );
                const rotate = Number(
                    element.dataset.rotate || 0
                );
                const x =
                    offsetX * speed * 100;
                const y =
                    offsetY * speed * 100;
                element.style.transform =
                    `
                    translate3d(${x}px,${y}px,0)
                    rotate(${offsetX * rotate}deg)
                    `;
            });
            requestAnimationFrame(update);
        };
        update();
    }
});
