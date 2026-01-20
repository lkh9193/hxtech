// Load header and footer from includes folder
(function() {
  'use strict';
  
  // Function to load HTML content from a file
  function loadHTML(path, elementId) {
    return fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load ' + path);
        }
        return response.text();
      })
      .then(html => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = html;
        }
      })
      .catch(error => {
        console.error('Error loading ' + path + ':', error);
      });
  }
  
  // Load includes when document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadIncludes();
    });
  } else {
    loadIncludes();
  }
  
  function loadIncludes() {
    // Determine the base path depending on directory structure
    const currentPath = window.location.pathname;
    let basePath = '';
    
    // If in root directory, includes folder is directly accessible
    if (currentPath.endsWith('.html') || currentPath === '/') {
      basePath = './includes/';
    }
    
    // Load header if the container exists
    if (document.getElementById('site-header-container')) {
      loadHTML(basePath + 'header.html', 'site-header-container')
        .then(() => {
          // Re-initialize Bootstrap components after loading
          if (typeof $ !== 'undefined') {
            // Reinitialize dropdown menus
            $('.dropdown-toggle').dropdown();
          }
        });
    }
    
    // Load footer if the container exists
    if (document.getElementById('site-footer-container')) {
      loadHTML(basePath + 'footer.html', 'site-footer-container');
    }
  }
})();
