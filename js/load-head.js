(function() {
  'use strict';

  if (window.__hxSharedHeadLoaded) {
    return;
  }
  window.__hxSharedHeadLoaded = true;

  try {
    var request = new XMLHttpRequest();
    request.open('GET', 'includes/head.html', false);
    request.send(null);

    if (request.status >= 200 && request.status < 300) {
      document.head.insertAdjacentHTML('beforeend', request.responseText);
    } else {
      console.warn('Failed to load shared head include (status: ' + request.status + ')');
    }
  } catch (error) {
    console.error('Error loading shared head include:', error);
  }

  if (!document.querySelector('script[data-shared-modernizr="true"]')) {
    var modernizr = document.createElement('script');
    modernizr.src = 'js/modernizr.js';
    modernizr.setAttribute('data-shared-modernizr', 'true');
    document.head.appendChild(modernizr);
  }
})();