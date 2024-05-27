(function () {
  'use strict';

  var body = document.body;
  var navToggle = document.getElementById('sea-mobile-nav-toggle');
  var dimmer = document.getElementById('sea-mobile-nav-dimmer');
  var CLASS_NAME = 'sea-mobile-nav-on';
  if (!navToggle) return;

  navToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    body.classList.toggle(CLASS_NAME);
  });

  dimmer.addEventListener('click', function (e) {
    if (!body.classList.contains(CLASS_NAME)) return;

    e.preventDefault();
    body.classList.remove(CLASS_NAME);
  });
}());
