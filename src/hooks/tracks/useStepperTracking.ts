'use client';


declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    analytics?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

interface TrackingEvent {
  event_name: string;
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

export function useStepperTracking() {
  
  const trackEvent = (eventData: TrackingEvent) => {
    if (typeof window === 'undefined') return;

    const { event_name, event_category, event_label, value, custom_parameters } = eventData;

    // Google Analytics / GTM via dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: event_name,
        event_category,
        event_label,
        value,
        ...custom_parameters
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', event_name, {
        content_category: event_category,
        content_name: event_label,
        value,
        ...custom_parameters
      });
    }

    // Segment Analytics
    if (window.analytics) {
      window.analytics.track(event_name, {
        category: event_category,
        label: event_label,
        value,
        ...custom_parameters
      });
    }

  };

  // Evento de início do formulário
  const trackFormStart = () => {
    trackEvent({
      event_name: 'form_start',
      event_category: 'form_interaction',
      event_label: 'Visa Form Started',
      value: 1,
      custom_parameters: {
        form_type: 'visa_form',
        timestamp: new Date().toISOString()
      }
    });
  };

  // Evento de progresso por etapa
  const trackStepProgress = (stepNumber: number, stepName: string, stepData?: unknown) => {
    trackEvent({
      event_name: 'form_progress',
      event_category: 'form_progress',
      event_label: `step = "${stepNumber} ${stepName}"`,
      value: stepNumber,
      custom_parameters: {
        step_number: stepNumber,
        step_name: stepName,
        step_data: stepData,
        timestamp: new Date().toISOString()
      }
    });
  };

  // Evento de conversão final
  const trackConversion = (leadData?: unknown) => {
    trackEvent({
      event_name: 'form_convert',
      event_category: 'conversion',
      event_label: 'Form Completed',
      value: 1,
      custom_parameters: {
        form_type: 'visa_form',
        lead_data: leadData,
        timestamp: new Date().toISOString()
      }
    });
  };

  // Evento de abandono
  const trackAbandonment = (stepNumber: number, stepName: string) => {
    trackEvent({
      event_name: 'form_abandon',
      event_category: 'form_interaction',
      event_label: `Abandoned at Step ${stepNumber}`,
      value: stepNumber,
      custom_parameters: {
        step_number: stepNumber,
        step_name: stepName,
        timestamp: new Date().toISOString()
      }
    });
  };

  return {
    trackFormStart,
    trackStepProgress,
    trackConversion,
    trackAbandonment
  };
}