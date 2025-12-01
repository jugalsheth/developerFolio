/**
 * Analytics utility functions for GA4 and Google Ads tracking
 * 
 * Usage:
 * - trackEvent('button_click', { button_name: 'Schedule Meeting' })
 * - trackConversion('schedule_meeting_completed')
 */

// Check if gtag is available
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track a custom event in GA4
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Additional event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!isGtagAvailable()) {
    console.warn('gtag is not available. Analytics event not tracked:', eventName);
    return;
  }

  try {
    window.gtag('event', eventName, {
      ...eventParams,
      event_category: eventParams.category || 'engagement',
      event_label: eventParams.label || eventName
    });
  } catch (error) {
    console.error('Error tracking GA4 event:', error);
  }
};

/**
 * Track a Google Ads conversion
 * @param {string} conversionLabel - Conversion label from Google Ads
 * @param {string} conversionId - Google Ads conversion ID (optional, can be set in index.html)
 * @param {object} additionalParams - Additional conversion parameters
 */
export const trackConversion = (conversionLabel, conversionId = null, additionalParams = {}) => {
  if (!isGtagAvailable()) {
    console.warn('gtag is not available. Conversion not tracked:', conversionLabel);
    return;
  }

  try {
    if (conversionId) {
      window.gtag('event', 'conversion', {
        'send_to': `${conversionId}/${conversionLabel}`,
        ...additionalParams
      });
    } else {
      // If conversion ID is not provided, it should be set globally in index.html
      window.gtag('event', 'conversion', {
        'send_to': conversionLabel,
        ...additionalParams
      });
    }
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
};

/**
 * Track page view (usually handled automatically by GA4, but can be used for SPA navigation)
 * @param {string} pagePath - Path of the page
 * @param {string} pageTitle - Title of the page
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (!isGtagAvailable()) {
    return;
  }

  try {
    window.gtag('config', process.env.REACT_APP_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX', {
      page_path: pagePath,
      page_title: pageTitle
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Track button clicks
 * @param {string} buttonName - Name/identifier of the button
 * @param {string} location - Where the button is located (e.g., 'connect_modal')
 */
export const trackButtonClick = (buttonName, location = 'unknown') => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
    category: 'user_interaction'
  });
};

/**
 * Track form submissions
 * @param {string} formName - Name/identifier of the form
 * @param {boolean} success - Whether the submission was successful
 */
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
    category: 'form_interaction'
  });
};

/**
 * Track Calendly scheduling events
 * @param {string} action - Action type (e.g., 'opened', 'scheduled', 'cancelled')
 */
export const trackCalendlyEvent = (action) => {
  trackEvent('calendly_interaction', {
    action: action,
    category: 'scheduling'
  });

  // Also track as conversion if scheduled
  if (action === 'scheduled') {
    const conversionLabel = process.env.REACT_APP_GOOGLE_ADS_CONVERSION_LABEL;
    if (conversionLabel) {
      trackConversion(conversionLabel);
    }
  }
};


