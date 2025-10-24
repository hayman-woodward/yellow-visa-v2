'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { YVModal, YVText, YVButton } from '@/components/YV';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const getNotificationConfig = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return {
        icon: CheckCircle,
        iconColor: 'text-green-600',
        iconBg: 'bg-green-100',
        titleColor: 'text-green-900',
        messageColor: 'text-green-700'
      };
    case 'error':
      return {
        icon: XCircle,
        iconColor: 'text-red-600',
        iconBg: 'bg-red-100',
        titleColor: 'text-red-900',
        messageColor: 'text-red-700'
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        iconColor: 'text-yellow-600',
        iconBg: 'bg-yellow-100',
        titleColor: 'text-yellow-900',
        messageColor: 'text-yellow-700'
      };
    case 'info':
      return {
        icon: Info,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        titleColor: 'text-blue-900',
        messageColor: 'text-blue-700'
      };
  }
};

export default function Notification({
  type,
  title,
  message,
  isOpen,
  onClose,
  autoClose = true,
  duration = 3000
}: NotificationProps) {
  const config = getNotificationConfig(type);
  const Icon = config.icon;

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration, onClose]);

  return (
    <YVModal
      open={isOpen}
      onOpenChange={onClose}
      size="sm"
      showCloseButton={false}
      className="pointer-events-auto"
    >
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`${config.iconColor}`} size={20} />
          </div>
          
          <div className="flex-1 min-w-0">
            <YVText className={`font-semibold ${config.titleColor} mb-1`}>
              {title}
            </YVText>
            {message && (
              <YVText className={`text-sm ${config.messageColor}`}>
                {message}
              </YVText>
            )}
          </div>

          <YVButton
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-500" />
          </YVButton>
        </div>
    </YVModal>
  );
}

// Hook para usar notificações facilmente
export function useNotification() {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    title: string;
    message?: string;
    isOpen: boolean;
  }>({
    type: 'info',
    title: '',
    message: '',
    isOpen: false
  });

  const showNotification = (
    type: NotificationType,
    title: string,
    message?: string
  ) => {
    setNotification({
      type,
      title,
      message,
      isOpen: true
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  const NotificationComponent = () => (
    <Notification
      type={notification.type}
      title={notification.title}
      message={notification.message}
      isOpen={notification.isOpen}
      onClose={hideNotification}
    />
  );

  return {
    showSuccess: (title: string, message?: string) => showNotification('success', title, message),
    showError: (title: string, message?: string) => showNotification('error', title, message),
    showWarning: (title: string, message?: string) => showNotification('warning', title, message),
    showInfo: (title: string, message?: string) => showNotification('info', title, message),
    NotificationComponent
  };
}
