/*
==========================================
MJT Project
Mouse Glow
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'MouseGlow',
    init() {
        this.glow = MJT.select('.mouse-glow');
        if (!this.glow) {
            return;
        }
        if (
            window.matchMedia('(pointer:coarse)').matches
        ) {
            this.glow.remove();
            return;
        }
        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        this.position = {
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
        this.position.x = MJT.lerp(
            this.position.x,
            this.mouse.x,
            .08
        );
        this.position.y = MJT.lerp(
            this.position.y,
            this.mouse.y,
            .08
        );
        this.glow.style.transform =
            `translate3d(${this.position.x}px,${this.position.y}px,0)`;
        requestAnimationFrame(
            () => this.animate()
        );
    }
});
