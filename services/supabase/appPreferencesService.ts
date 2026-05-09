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

// Future localization integration belongs here alongside an app-wide language provider.
// Suggested future files: /i18n/en.json, /i18n/fil.json, and /i18n/ja.json.
export async function getAppPreferences() {
  return Promise.resolve({ ...mockAppPreferences });
}

export async function updateAppPreferences(data: AppPreferencesUpdateInput) {
  mockAppPreferences = {
    ...mockAppPreferences,
    ...data,
    updated_at: new Date().toISOString(),
  };

  return Promise.resolve({ ...mockAppPreferences });
}

// Future cache cleanup can wire Expo Image cache, AsyncStorage, and temporary files here.
export async function clearAppCache() {
  mockAppPreferences = {
    ...mockAppPreferences,
    cache_size: '0 MB',
    updated_at: new Date().toISOString(),
  };

  return Promise.resolve({ cache_size: mockAppPreferences.cache_size, cleared: true });
}
