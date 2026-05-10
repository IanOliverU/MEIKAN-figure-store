import { isSupabaseConfigured, supabase } from './client';

export type AppLanguage = 'en' | 'fil' | 'ja';
export type AppTheme = 'dark';

export type AppPreferences = {
  preferred_language: AppLanguage;
  theme: AppTheme;
  cache_size: string;
  updated_at: string;
};

export type AppPreferencesUpdateInput = Partial<Pick<AppPreferences, 'preferred_language' | 'theme'>>;

const MOCK_DATE = '2026-05-10T00:00:00.000Z';

let mockAppPreferences: AppPreferences = {
  preferred_language: 'en',
  theme: 'dark',
  cache_size: '128 MB',
  updated_at: MOCK_DATE,
};

async function getCurrentUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

async function createAppPreferences(userId: string) {
  const { data, error } = await supabase
    .from('app_preferences')
    .insert({ user_id: userId })
    .select('preferred_language, theme, cache_size, updated_at')
    .single();

  if (error) {
    throw error;
  }

  return data as AppPreferences;
}

// Future localization integration belongs here alongside an app-wide language provider.
// Suggested future files: /i18n/en.json, /i18n/fil.json, and /i18n/ja.json.
export async function getAppPreferences() {
  if (!isSupabaseConfigured) {
    return Promise.resolve({ ...mockAppPreferences });
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return { ...mockAppPreferences };
  }

  const { data, error } = await supabase
    .from('app_preferences')
    .select('preferred_language, theme, cache_size, updated_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? (data as AppPreferences) : createAppPreferences(userId);
}

export async function updateAppPreferences(data: AppPreferencesUpdateInput) {
  if (!isSupabaseConfigured) {
    mockAppPreferences = {
      ...mockAppPreferences,
      ...data,
      updated_at: new Date().toISOString(),
    };

    return Promise.resolve({ ...mockAppPreferences });
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error('Session expired');
  }

  const { data: preferences, error } = await supabase
    .from('app_preferences')
    .upsert({ user_id: userId, ...data }, { onConflict: 'user_id' })
    .select('preferred_language, theme, cache_size, updated_at')
    .single();

  if (error) {
    throw error;
  }

  return preferences as AppPreferences;
}

// Future cache cleanup can wire Expo Image cache, AsyncStorage, and temporary files here.
export async function clearAppCache() {
  if (!isSupabaseConfigured) {
    mockAppPreferences = {
      ...mockAppPreferences,
      cache_size: '0 MB',
      updated_at: new Date().toISOString(),
    };

    return Promise.resolve({ cache_size: mockAppPreferences.cache_size, cleared: true });
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error('Session expired');
  }

  const { data, error } = await supabase
    .from('app_preferences')
    .upsert({ user_id: userId, cache_size: '0 MB' }, { onConflict: 'user_id' })
    .select('cache_size')
    .single();

  if (error) {
    throw error;
  }

  return { cache_size: data.cache_size, cleared: true };
}
