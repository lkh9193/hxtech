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

          initHeaderNav();
        });
    }
    
    // Load footer if the container exists
    if (document.getElementById('site-footer-container')) {
      loadHTML(basePath + 'footer.html', 'site-footer-container');
    }
  }

  function initHeaderNav() {
    const header = document.querySelector('.site-header');
    if (!header) {
      return;
    }

    const navRoot = header.querySelector('.navbar-nav');
    if (!navRoot) {
      return;
    }

    if (typeof $ !== 'undefined') {
      const dropdowns = $(header).find('ul.nav li.dropdown');
      dropdowns.off('.hxNav');

      dropdowns.on('mouseenter.hxNav', function() {
        if (window.matchMedia('(min-width: 768px)').matches) {
          $(this).addClass('open');
          $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(220);
        }
      });

      dropdowns.on('mouseleave.hxNav', function() {
        if (window.matchMedia('(min-width: 768px)').matches) {
          $(this).removeClass('open');
          $(this).find('.dropdown-menu').stop(true, true).delay(80).fadeOut(140);
        }
      });
    }

    navRoot.querySelectorAll('li').forEach(item => item.classList.remove('active'));

    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const isHome = path.endsWith('/') || path.endsWith('/hxtech') || path.endsWith('/hxtech/') || path.endsWith('/index.html');

    let activeSelector = '.nav-home';

    if (isHome) {
      activeSelector = '.nav-home';
    } else if (path.endsWith('/about.html')) {
      activeSelector = '.nav-about';
    } else if (
      path.endsWith('/applications.html') ||
      hash === '#microscopy' ||
      hash === '#spectroscopy' ||
      hash === '#laser-photonics' ||
      hash === '#approach'
    ) {
      activeSelector = '.nav-applications';
    } else if (
      path.endsWith('/contact_us.html') ||
      path.endsWith('/contact.html')
    ) {
      activeSelector = '.nav-contact';
    } else if (
      path.endsWith('/products.html') ||
      path.endsWith('/product-microscopy.html') ||
      path.endsWith('/product-spectroscopy.html') ||
      path.endsWith('/product-photonics.html') ||
      path.endsWith('/product-lasers.html') ||
      path.endsWith('/product-detectors.html') ||
      path.endsWith('/product-automation.html') ||
      path.endsWith('/product-detail_01.html') ||
      path.endsWith('/product-detail_02.html') ||
      path.endsWith('/product-detail_03.html') ||
      path.endsWith('/product-detail_04.html')
    ) {
      activeSelector = '.nav-products';
    }

    const activeItem = navRoot.querySelector(activeSelector);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }
})();
