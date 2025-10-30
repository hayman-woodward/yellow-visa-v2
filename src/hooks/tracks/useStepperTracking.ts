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
      const eventPayload = {
        event: event_name,
        event_category: event_category,
        event_label: event_label,
        value: value,
        ...(custom_parameters || {})
      };
      
      window.dataLayer.push(eventPayload);
    }

    // Enviar também via gtag (se disponível) para ter certeza
    if (window.gtag) {
      const gtagPayload = {
        event_category: event_category,
        event_label: event_label,
        value: value,
        ...(custom_parameters || {})
      };
      
      window.gtag('event', event_name, gtagPayload);
    }

    // Facebook Pixel - NÃO enviar eventos customizados aqui
    // Eventos padrão do Facebook devem ser enviados diretamente nas funções específicas
    // (ex: trackConversion envia 'Lead' diretamente)

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
      event_name: 'form_step',
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
    // Para Facebook Pixel, usar evento padrão "Lead"
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Visa Form Completed',
        content_category: 'visa_form',
        value: 1,
        currency: 'USD'
      });
    }

    // Para Google Analytics e outros, usar evento customizado
    trackEvent({
      event_name: 'form_conversion',
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
      event_name: 'form_abandonment',
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