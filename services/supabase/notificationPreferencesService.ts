export type NotificationPreferenceKey =
  | 'push_enabled'
  | 'email_enabled'
  | 'wishlist_restock'
  | 'preorder_closing'
  | 'flash_sales'
  | 'order_updates';

export type NotificationPreferences = {
  id: string;
  user_id: string;
  push_enabled: boolean;
  email_enabled: boolean;
  wishlist_restock: boolean;
  preorder_closing: boolean;
  flash_sales: boolean;
  order_updates: boolean;
  created_at: string;
  updated_at: string;
};

export type NotificationPreferencesUpdateInput = Partial<Pick<NotificationPreferences, NotificationPreferenceKey>>;

const MOCK_DATE = '2026-05-10T00:00:00.000Z';

let mockNotificationPreferences: NotificationPreferences = {
  id: 'mock-notification-preferences-id',
  user_id: 'mock-user-id',
  push_enabled: true,
  email_enabled: true,
  wishlist_restock: true,
  preorder_closing: true,
  flash_sales: false,
  order_updates: true,
  created_at: MOCK_DATE,
  updated_at: MOCK_DATE,
};

function clonePreferences(preferences: NotificationPreferences): NotificationPreferences {
  return { ...preferences };
}

// Future push integration belongs here: Expo permission request, push token registration,
// device token storage, and backend notification trigger wiring.
export async function getNotificationPreferences() {
  return Promise.resolve(clonePreferences(mockNotificationPreferences));
}

export async function updateNotificationPreferences(data: NotificationPreferencesUpdateInput) {
  mockNotificationPreferences = {
    ...mockNotificationPreferences,
    ...data,
    updated_at: new Date().toISOString(),
  };

  return Promise.resolve(clonePreferences(mockNotificationPreferences));
}

export async function updateSingleNotificationPreference(
  key: NotificationPreferenceKey,
  value: NotificationPreferences[NotificationPreferenceKey],
) {
  return updateNotificationPreferences({ [key]: value });
}
