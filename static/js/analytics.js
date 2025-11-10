/**
 * Analytics Tracking Module
 *
 * Centralized Google Tag Manager dataLayer event tracking.
 * All GTM events should be defined here for easy maintenance and documentation.
 *
 * @author HMBaytam
 */

// =============================================================================
// Core Tracking Function
// =============================================================================

/**
 * Safely pushes an event to the dataLayer
 * Initializes dataLayer if it doesn't exist
 *
 * @param {Object} eventData - The event data object to push
 */
const trackEvent = (eventData) => {
  try {
    // Ensure dataLayer exists (GTM should have initialized it already)
    window.dataLayer = window.dataLayer || [];

    // Push event with timestamp
    const eventWithTimestamp = {
      ...eventData,
      timestamp: new Date().toISOString()
    };

    window.dataLayer.push(eventWithTimestamp);

    // Always log to console for debugging
    console.log('📊 GTM Event Pushed:', eventWithTimestamp);
    console.log('📊 Current dataLayer:', window.dataLayer);

  } catch (error) {
    console.error('❌ Error pushing to dataLayer:', error);
  }
};

// =============================================================================
// Navigation Events
// =============================================================================

/**
 * Tracks when a user clicks on a project link from the homepage
 * Returns false to prevent immediate navigation, allowing event to be tracked
 *
 * @param {string} projectName - The endpoint name of the project (e.g., 'bin2dec')
 * @param {string} projectUrl - The URL path of the project (e.g., '/bin2dec')
 * @param {Event} event - The click event object
 *
 * @example
 * trackProjectClick('bin2dec', '/bin2dec', event);
 */
const trackProjectClick = (projectName, projectUrl, event) => {
  // Prevent default navigation
  if (event) {
    event.preventDefault();
  }

  // Track the event
  trackEvent({
    event: 'project_click',
    project_name: projectName,
    project_url: projectUrl
  });

  // Navigate after a short delay to ensure tracking completes
  setTimeout(() => {
    window.location.href = projectUrl;
  }, 100);

  return false;
};

/**
 * Tracks when a user clicks the "Back to Home" link
 * Returns false to prevent immediate navigation, allowing event to be tracked
 *
 * @param {Event} event - The click event object
 */
const trackBackToHome = (event) => {
  // Prevent default navigation
  if (event) {
    event.preventDefault();
  }

  // Get the href from the clicked element
  const targetUrl = event && event.currentTarget ? event.currentTarget.href : '/';

  // Track the event
  trackEvent({
    event: 'back_to_home_click'
  });

  // Navigate after a short delay to ensure tracking completes
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 100);

  return false;
};

// =============================================================================
// Form Interaction Events
// =============================================================================

/**
 * Tracks when a user submits a form
 *
 * @param {string} formName - The name/type of the form (e.g., 'bin2dec_converter')
 * @param {string} formType - The category of form (e.g., 'converter', 'calculator')
 * @param {boolean} isSuccess - Whether the form submission was successful
 *
 * @example
 * trackFormSubmit('bin2dec_converter', 'converter', true);
 */
const trackFormSubmit = (formName, formType, isSuccess = true) => {
  trackEvent({
    event: 'form_submit',
    form_name: formName,
    form_type: formType,
    form_success: isSuccess
  });
};

/**
 * Tracks when a form submission results in an error
 *
 * @param {string} formName - The name/type of the form
 * @param {string} errorMessage - The error message displayed to user
 *
 * @example
 * trackFormError('bin2dec_converter', 'Invalid Binary Number');
 */
const trackFormError = (formName, errorMessage) => {
  trackEvent({
    event: 'form_error',
    form_name: formName,
    error_message: errorMessage
  });
};


// =============================================================================
// User Engagement Events
// =============================================================================

/**
 * Tracks time spent on a page
 * Call this when user leaves or after a certain duration
 *
 * @param {string} pageName - The name of the page
 * @param {number} timeSeconds - Time spent in seconds
 *
 * @example
 * trackTimeOnPage('bin2dec', 45);
 */
const trackTimeOnPage = (pageName, timeSeconds) => {
  trackEvent({
    event: 'time_on_page',
    page_name: pageName,
    time_seconds: timeSeconds
  });
};



// =============================================================================
// Export functions for use in templates
// =============================================================================

// Make functions available globally
window.trackEvent = trackEvent;
window.trackProjectClick = trackProjectClick;
window.trackBackToHome = trackBackToHome;
window.trackFormSubmit = trackFormSubmit;
window.trackFormError = trackFormError;
window.trackTimeOnPage = trackTimeOnPage;

// Debugging: Log when script loads
console.log('✅ Analytics module loaded successfully');
console.log('📊 DataLayer exists:', typeof window.dataLayer !== 'undefined');
console.log('📊 Current dataLayer:', window.dataLayer);

// Test function to manually verify tracking works
window.testTracking = () => {
  console.log('🧪 Running test tracking...');
  trackEvent({
    event: 'test_event',
    test_parameter: 'test_value'
  });
  console.log('🧪 Test complete. Check console logs above.');
};
