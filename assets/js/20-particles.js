/*
==========================================
MJT Project
Particles Background
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'Particles',
    init() {
        this.canvas = MJT.select(
            '#particles'
        );
        if (!this.canvas) {
            return;
        }
        this.context =
            this.canvas.getContext('2d');
        this.resize();
        this.create();
        this.bind();
        this.render();
    },
    bind() {
        window.addEventListener(
            'resize',
            () => this.resize()
        );
    },
    resize() {
        this.width =
            this.canvas.width =
            window.innerWidth;
        this.height =
            this.canvas.height =
            window.innerHeight;
    },
    create() {
        const total =
            Math.max(
                40,
                Math.floor(
                    this.width / 35
                )
            );
        this.particles = [];
        for (
            let i = 0; i < total; i++
        ) {
            this.particles.push({
                x: Math.random() *
                    this.width,
                y: Math.random() *
                    this.height,
                r: Math.random() * 2 + .5,
                vx: (Math.random() - .5) * .35,
                vy: (Math.random() - .5) * .35
            });
        }
    },
    render() {
        this.context.clearRect(
            0,
            0,
            this.width,
            this.height
        );
        this.context.fillStyle =
            'rgba(59,130,246,.55)';
        this.particles.forEach(a => {
            a.x += a.vx;
            a.y += a.vy;
            if (
                a.x < 0 ||
                a.x > this.width
            ) a.vx *= -1;
            if (
                a.y < 0 ||
                a.y > this.height
            ) a.vy *= -1;
            this.context.beginPath();
            this.context.arc(
                a.x,
                a.y,
                a.r,
                0,
                Math.PI * 2
            );
            this.context.fill();
        });
        this.context.strokeStyle =
            'rgba(59,130,246,.08)';
        for (
            let i = 0; i < this.particles.length; i++
        ) {
            for (
                let j = i + 1; j < this.particles.length; j++
            ) {
                const a =
                    this.particles[i];
                const b =
                    this.particles[j];
                const dx =
                    a.x - b.x;
                const dy =
                    a.y - b.y;
                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );
                if (
                    distance < 130
                ) {
                    this.context.globalAlpha =
                        1 -
                        distance / 130;
                    this.context.beginPath();
                    this.context.moveTo(
                        a.x,
                        a.y
                    );
                    this.context.lineTo(
                        b.x,
                        b.y
                    );
                    this.context.stroke();
                    this.context.globalAlpha =
                        1;
                }
            }
        }
        requestAnimationFrame(
            () => this.render()
        );
    }
});
