/**
 * Google Calendar initialization script
 * 
 * This script initializes Google Calendar widgets in the chat interface
 * It looks for Google Calendar container divs and initializes the booking widget
 */

// Function to initialize all calendar widgets on the page
function initializeCalendarWidgets() {
    // Find all calendar containers
    const containerElements = document.querySelectorAll('#google-calendar-container');
    
    if (containerElements.length === 0) {
      return; // No containers found
    }
    
    // Check if Google Calendar script is loaded
    if (typeof calendar !== 'undefined' && calendar.schedulingButton) {
      containerElements.forEach(container => {
        // Only initialize containers that haven't been initialized yet
        if (container.dataset.initialized !== 'true') {
          try {
            calendar.schedulingButton.load({
              url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rO2EGQWPlDm9BkvW3xAcBBf8MRuJ7MbaBAQFkn99voBUOjnEOXc0WVL2l9jdHkgJIioCGX_s5?gv=true',
              color: '#039BE5',
              label: 'Book an appointment with Binu',
              target: container
            });
            
            // Mark as initialized to avoid duplicate initialization
            container.dataset.initialized = 'true';
          } catch (error) {
            console.error('Error initializing calendar widget:', error);
          }
        }
      });
    } else {
      // Google Calendar script not loaded yet, try again in a moment
      setTimeout(initializeCalendarWidgets, 500);
    }
  }
  
  // Watch for DOM changes to detect dynamically added Google Calendar containers
  function setupCalendarWatcher() {
    // Create a mutation observer to watch for new calendar containers
    const observer = new MutationObserver((mutations) => {
      let shouldCheckForContainers = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // Check if any added nodes contain a calendar container
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && (
                (node.id === 'google-calendar-container') || 
                (node.querySelector && node.querySelector('#google-calendar-container'))
              )) {
              shouldCheckForContainers = true;
            }
          });
        }
      });
      
      if (shouldCheckForContainers) {
        // Initialize any new containers
        initializeCalendarWidgets();
      }
    });
    
    // Start observing the document
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Initial check for containers
    initializeCalendarWidgets();
  }
  
  // Load Google Calendar scripts
  function loadGoogleCalendarScripts() {
    // Add CSS
    if (!document.querySelector('link[href="https://calendar.google.com/calendar/scheduling-button-script.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
      document.head.appendChild(link);
    }
    
    // Add JS (if not already loaded)
    if (!document.querySelector('script[src="https://calendar.google.com/calendar/scheduling-button-script.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      script.onload = function() {
        // Once loaded, set up the watcher
        setupCalendarWatcher();
      };
      document.head.appendChild(script);
    } else {
      // Script already loaded, set up the watcher
      setupCalendarWatcher();
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGoogleCalendarScripts);
  } else {
    loadGoogleCalendarScripts();
  }