(function () {
    'use strict';

    var body = document.body;
    var navToggle = document.getElementById('sea-mobile-nav-toggle');
    var CLASS_NAME = 'sea-mobile-nav-on';
    if (!navToggle) return;

    navToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        body.classList.toggle(CLASS_NAME);
    });
}());
