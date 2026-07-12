/*
==========================================
MJT Project
Application Bootstrap
Version : 1.0.0
==========================================
*/
'use strict';
window.MJT = window.MJT || {};
MJT.version = '1.0.0';
MJT.modules = [];
MJT.register = function(module) {
    if (
        module &&
        typeof module.init === 'function'
    ) {
        MJT.modules.push(module);
    }
};
MJT.start = function() {
    document.documentElement.classList.add('mjt-ready');
    MJT.modules.forEach(module => {
        try {
            module.init();
        } catch (error) {
            console.error(
                `[MJT] ${module.name || 'Module'} failed.`,
                error
            );
        }
    });
};
MJT.ready = function(callback) {
    if (
        document.readyState === 'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            callback
        );
    } else {
        callback();
    }
};
MJT.onResize = function(callback) {
    let timer = null;
    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(callback, 150);
    });
};
MJT.onScroll = function(callback) {
    let ticking = false;
    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    callback(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        }, {
            passive: true
        }
    );
};
MJT.select = function(
    selector,
    scope = document
) {
    return scope.querySelector(selector);
};
MJT.selectAll = function(
    selector,
    scope = document
) {
    return [...scope.querySelectorAll(selector)];
};
MJT.create = function(
    tag,
    className = ''
) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    return element;
};
MJT.clamp = function(
    value,
    min,
    max
) {
    return Math.min(
        Math.max(value, min),
        max
    );
};
MJT.lerp = function(
    start,
    end,
    amount
) {
    return start + (end - start) * amount;
};
MJT.random = function(
    min,
    max
) {
    return Math.random() * (max - min) + min;
};
MJT.ready(() => {
    MJT.start();
});
