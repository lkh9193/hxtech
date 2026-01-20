// Load header and footer from includes folder
(function() {
  'use strict';
  
  // Function to load HTML content from a file
  function loadHTML(path, elementId) {
    return fetch(path)
      .then(response => {
        if (!response.ok) {
          console.warn('Failed to load ' + path + ' (status: ' + response.status + ')');
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
    // Determine the base path
    let basePath = './includes/';
    
    // Get the current directory path
    const currentPath = window.location.pathname;
    
    // For pages in root or subdirectories, use relative path
    // This works for both local and GitHub Pages deployments
    
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
