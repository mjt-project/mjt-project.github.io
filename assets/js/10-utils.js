/*
==========================================
MJT Project
Utility Module
Version : 1.0.0
==========================================
*/
'use strict';
window.$ = function(
    selector,
    scope = document
) {
    return scope.querySelector(selector);
};
window.$$ = function(
    selector,
    scope = document
) {
    return [...scope.querySelectorAll(selector)];
};
window.debounce = function(
    callback,
    delay = 200
) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(
            () => callback(...args),
            delay
        );
    };
};
window.throttle = function(
    callback,
    delay = 100
) {
    let waiting = false;
    return (...args) => {
        if (waiting) return;
        waiting = true;
        callback(...args);
        setTimeout(() => {
            waiting = false;
        }, delay);
    };
};
window.copy = async function(
    text
) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
};
window.uuid = function() {
    return crypto.randomUUID();
};
window.sleep = function(
    ms
) {
    return new Promise(
        resolve =>
        setTimeout(resolve, ms)
    );
};
window.isMobile = function() {
    return window.matchMedia(
        '(max-width:768px)'
    ).matches;
};
window.formatNumber = function(
    value
) {
    return new Intl.NumberFormat().format(value);
};
window.formatDate = function(
    value
) {
    return new Intl.DateTimeFormat(
        'vi-VN', {
            dateStyle: 'medium'
        }
    ).format(new Date(value));
};
window.scrollTopSmooth = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
window.preloadImage = function(
    src
) {
    return new Promise(
        (resolve, reject) => {
            const image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = src;
        }
    );
};
window.waitForImages = async function() {
    const images = $$('img');
    await Promise.all(
        images.map(image => {
            if (image.complete)
                return Promise.resolve();
            return new Promise(resolve => {
                image.onload = resolve;
                image.onerror = resolve;
            });
        })
    );
};
window.toggleClass = function(
    element,
    className
) {
    element.classList.toggle(className);
};
window.addClass = function(
    element,
    className
) {
    element.classList.add(className);
};
window.removeClass = function(
    element,
    className
) {
    element.classList.remove(className);
};
