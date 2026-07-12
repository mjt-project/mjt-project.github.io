/*
==========================================
MJT Project
GitHub Contributions
Version : 1.0.0
==========================================
*/
'use strict';
MJT.register({
    name: 'GithubContributions',
    init() {
        this.graph = MJT.select(
            '.contribution-graph'
        );
        if (
            !this.graph
        ) {
            return;
        }
        this.generate();
        this.animate();
    },
    generate() {
        const weeks = 53;
        const days = 7;
        this.graph.innerHTML = '';
        for (
            let week = 0; week < weeks; week++
        ) {
            const column =
                document.createElement(
                    'div'
                );
            column.className =
                'contribution-week';
            for (
                let day = 0; day < days; day++
            ) {
                const cell =
                    document.createElement(
                        'div'
                    );
                const level =
                    this.randomLevel();
                cell.className =
                    `contribution-cell level-${level}`;
                cell.dataset.level =
                    level;
                cell.title =
                    `${level} contribution${level === 1 ? '' : 's'}`;
                column.appendChild(
                    cell
                );
            }
            this.graph.appendChild(
                column
            );
        }
    },
    animate() {
        if (
            typeof anime === 'undefined'
        ) {
            return;
        }
        anime({
            targets: '.contribution-cell',
            opacity: [
                0,
                1
            ],
            scale: [
                .4,
                1
            ],
            delay: anime.stagger(
                3
            ),
            duration: 420,
            easing: 'easeOutBack'
        });
    },
    randomLevel() {
        const value =
            Math.random();
        if (
            value < .42
        ) return 0;
        if (
            value < .67
        ) return 1;
        if (
            value < .84
        ) return 2;
        if (
            value < .95
        ) return 3;
        return 4;
    }
});
