// web/src/services/analytics.ts
import mixpanel from 'mixpanel-browser';
import { getAmplitude } from '@amplitude/analytics-browser';

mixpanel.init('MIXPANEL_PROJECT_TOKEN');
const amp = getAmplitude();
amp.init('AMPLITUDE_API_KEY');

export const trackEvent = (event: string, props?: any) => {
  mixpanel.track(event, props);
  amp.track(event, props);
};

// Usage
trackEvent('User Liked Profile', { profileId: '123' });