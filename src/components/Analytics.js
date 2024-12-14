// src/analytics.js
import ReactGA from 'react-ga4';

export const initializeGA = () => {
  ReactGA.initialize('G-7J8XSLECXP');  // Replace with your GA4 Measurement ID
};

// export const trackEvent = (category, action, label = '') => {
//   ReactGA.event({
//     category: category,
//     action: action,
//     label: label,
//   });
// };
