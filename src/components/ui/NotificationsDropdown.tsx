import React, { useState } from 'react';
import { Bell, X, Clock, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Processing Complete',
    message: 'Payment batch #12345 has been successfully processed with 1,500 transactions.',
    type: 'success',
    timestamp: '2025-07-08 10:30 AM',
    read: false,
  },
  {
    id: '2',
    title: 'Job Execution Failed',
    message: 'Data reconciliation job failed with 25 errors. Please review the logs.',
    type: 'error',
    timestamp: '2025-07-08 09:45 AM',
    read: false,
  },
  {
    id: '3',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance window on 2025-07-10 from 2:00 AM to 4:00 AM EST.',
    type: 'warning',
    timestamp: '2025-07-08 08:15 AM',
    read: true,
  },
  {
    id: '4',
    title: 'New Merchant Onboarded',
    message: 'Merchant "TechCorp Solutions" has been successfully onboarded to the platform.',
    type: 'info',
    timestamp: '2025-07-08 07:30 AM',
    read: true,
  },
  {
    id: '5',
    title: 'Fraud Alert',
    message: 'Suspicious activity detected on account #67890. Please investigate immediately.',
    type: 'error',
    timestamp: '2025-07-08 06:45 AM',
    read: false,
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'error':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'info':
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getNotificationBgColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200';
    case 'error':
      return 'bg-red-50 border-red-200';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200';
    case 'info':
    default:
      return 'bg-blue-50 border-blue-200';
  }
};

export const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  const closeNotificationDetail = () => {
    setSelectedNotification(null);
  };

  if (selectedNotification) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getNotificationIcon(selectedNotification.type)}
                <h3 className="text-lg font-semibold">{selectedNotification.title}</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={closeNotificationDetail}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600 mb-4">{selectedNotification.message}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {selectedNotification.timestamp}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-96">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50 border border-blue-100' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium truncate ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};