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

export async function getPreferences() {
  return Promise.resolve({ ...mockPreferences, preferred_scales: [...mockPreferences.preferred_scales] });
}

export async function updatePreferences(data: ShoppingPreferencesUpdateInput) {
  mockPreferences = {
    ...mockPreferences,
    ...data,
    preferred_scales: data.preferred_scales ? [...data.preferred_scales] : mockPreferences.preferred_scales,
    updated_at: new Date().toISOString(),
  };

  return Promise.resolve({ ...mockPreferences, preferred_scales: [...mockPreferences.preferred_scales] });
}
