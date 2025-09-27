const useAnalytics = () => {
  const trackPage = (
    eventName: string,
    payload: Record<string, unknown> = {},
  ) => {
    if (!window.umami) return;
    window.umami.track((defaultValues) => ({
      ...defaultValues,
      ...payload,
      name: eventName,
    }));
  };

  const trackEvent = (
    eventName: string,
    payload: Record<string, unknown> = {},
  ) => {
    if (!window.umami) return;
    window.umami.track((defaultValues) => ({
      ...defaultValues,
      ...payload,
      name: eventName,
    }));
  };

  const identifySession = (
    sessionId: string,
    sessionData: Record<string, unknown>,
  ) => {
    if (!window.umami) return;
    window.umami.identify(sessionId, sessionData);
  };

  const addDataToAnonymousSession = (sessionData: Record<string, unknown>) => {
    if (!window.umami) return;
    window.umami.identify(sessionData);
  };

  return { trackPage, trackEvent, identifySession, addDataToAnonymousSession };
};

export default useAnalytics;
