import { isSupabaseConfigured, supabase } from './client';

export type PreferredCurrency = 'PHP' | 'JPY';
export type PreferredShippingMethod = 'standard' | 'express';
export type PreferredScale = '1/4 Scale' | '1/6 Scale' | '1/7 Scale' | '1/8 Scale' | 'Nendoroid' | 'Figma';
export type ShippingRegion = 'Philippines' | 'Japan' | 'Singapore' | 'United States';

export type ShoppingPreferences = {
  preferred_currency: PreferredCurrency;
  preferred_shipping_method: PreferredShippingMethod;
  preferred_scales: PreferredScale[];
  shipping_region: ShippingRegion;
  updated_at: string;
};

export type ShoppingPreferencesUpdateInput = Partial<
  Pick<ShoppingPreferences, 'preferred_currency' | 'preferred_shipping_method' | 'preferred_scales' | 'shipping_region'>
>;

const MOCK_DATE = '2026-05-10T00:00:00.000Z';

let mockPreferences: ShoppingPreferences = {
  preferred_currency: 'PHP',
  preferred_shipping_method: 'standard',
  preferred_scales: ['1/7 Scale', 'Nendoroid'],
  shipping_region: 'Philippines',
  updated_at: MOCK_DATE,
};

function clonePreferences(preferences: ShoppingPreferences) {
  return { ...preferences, preferred_scales: [...preferences.preferred_scales] };
}

async function getCurrentUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

async function createPreferences(userId: string) {
  const { data, error } = await supabase
    .from('shopping_preferences')
    .insert({ user_id: userId })
    .select('preferred_currency, preferred_shipping_method, preferred_scales, shipping_region, updated_at')
    .single();

  if (error) {
    throw error;
  }

  return data as ShoppingPreferences;
}

export async function getPreferences() {
  if (!isSupabaseConfigured) {
    return Promise.resolve(clonePreferences(mockPreferences));
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return clonePreferences(mockPreferences);
  }

  const { data, error } = await supabase
    .from('shopping_preferences')
    .select('preferred_currency, preferred_shipping_method, preferred_scales, shipping_region, updated_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? (data as ShoppingPreferences) : createPreferences(userId);
}

export async function updatePreferences(data: ShoppingPreferencesUpdateInput) {
  if (!isSupabaseConfigured) {
    mockPreferences = {
      ...mockPreferences,
      ...data,
      preferred_scales: data.preferred_scales ? [...data.preferred_scales] : mockPreferences.preferred_scales,
      updated_at: new Date().toISOString(),
    };

    return Promise.resolve(clonePreferences(mockPreferences));
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error('Session expired');
  }

  const { data: preferences, error } = await supabase
    .from('shopping_preferences')
    .upsert({ user_id: userId, ...data }, { onConflict: 'user_id' })
    .select('preferred_currency, preferred_shipping_method, preferred_scales, shipping_region, updated_at')
    .single();

  if (error) {
    throw error;
  }

  return preferences as ShoppingPreferences;
}
