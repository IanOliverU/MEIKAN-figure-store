import { isSupabaseConfigured, supabase } from './client';

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

async function getCurrentUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

async function createNotificationPreferences(userId: string) {
  const { data, error } = await supabase
    .from('notification_preferences')
    .insert({ user_id: userId })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Future push integration belongs here: Expo permission request, push token registration,
// device token storage, and backend notification trigger wiring.
export async function getNotificationPreferences() {
  if (!isSupabaseConfigured) {
    return Promise.resolve(clonePreferences(mockNotificationPreferences));
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return clonePreferences(mockNotificationPreferences);
  }

  const { data, error } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ?? createNotificationPreferences(userId);
}

export async function updateNotificationPreferences(data: NotificationPreferencesUpdateInput) {
  if (!isSupabaseConfigured) {
    mockNotificationPreferences = {
      ...mockNotificationPreferences,
      ...data,
      updated_at: new Date().toISOString(),
    };

    return Promise.resolve(clonePreferences(mockNotificationPreferences));
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error('Session expired');
  }

  const { data: preferences, error } = await supabase
    .from('notification_preferences')
    .upsert({ user_id: userId, ...data }, { onConflict: 'user_id' })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return preferences;
}

export async function updateSingleNotificationPreference(
  key: NotificationPreferenceKey,
  value: NotificationPreferences[NotificationPreferenceKey],
) {
  return updateNotificationPreferences({ [key]: value });
}
