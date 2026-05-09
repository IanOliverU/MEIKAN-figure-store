import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddressInput, SavedAddress } from './AddressContext';
import { AddressLabel, AddressLabelBadge } from './AddressLabelBadge';

type AddressFormProps = {
  title: string;
  initialAddress?: SavedAddress;
  onBack: () => void;
  onSave: (input: AddressInput) => void;
};

type FieldName =
  | 'recipientName'
  | 'phone'
  | 'street'
  | 'barangay'
  | 'city'
  | 'province'
  | 'postalCode'
  | 'country';

const labels: AddressLabel[] = ['Home', 'Office', 'Other'];

function FormInput({
  label,
  value,
  placeholder,
  focused,
  error,
  keyboardType = 'default',
  onFocus,
  onBlur,
  onChangeText,
}: {
  label: string;
  value: string;
  placeholder: string;
  focused: boolean;
  error?: string;
  keyboardType?: 'default' | 'phone-pad' | 'numeric';
  onFocus: () => void;
  onBlur: () => void;
  onChangeText: (value: string) => void;
}) {
  return (
    <View>
      <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">{label}</Text>
      <TextInput
        className={`min-h-12 rounded-xl border bg-[#121212] px-4 py-3 text-base text-white ${
          focused ? 'border-[#C6A96B]' : error ? 'border-red-500/40' : 'border-[#222222]'
        }`}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#555555"
        keyboardType={keyboardType}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />
      {error ? <Text className="mt-2 text-xs text-red-300">{error}</Text> : null}
    </View>
  );
}

export function AddressForm({ title, initialAddress, onBack, onSave }: AddressFormProps) {
  const [addressLabel, setAddressLabel] = useState<AddressLabel>(initialAddress?.label ?? 'Home');
  const [recipientName, setRecipientName] = useState(initialAddress?.recipientName ?? '');
  const [phone, setPhone] = useState(initialAddress?.phone ?? '');
  const [street, setStreet] = useState(initialAddress?.street ?? '');
  const [barangay, setBarangay] = useState(initialAddress?.barangay ?? '');
  const [city, setCity] = useState(initialAddress?.city ?? '');
  const [province, setProvince] = useState(initialAddress?.province ?? '');
  const [postalCode, setPostalCode] = useState(initialAddress?.postalCode ?? '');
  const [country, setCountry] = useState(initialAddress?.country ?? 'Philippines');
  const [isDefault, setIsDefault] = useState(initialAddress?.isDefault ?? false);
  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const errors = useMemo(
    () => ({
      recipientName: recipientName.trim() ? undefined : 'Recipient name is required.',
      phone: phone.trim() ? undefined : 'Phone number is required.',
      street: street.trim() ? undefined : 'Street address is required.',
      barangay: barangay.trim() ? undefined : 'Barangay or area is required.',
      city: city.trim() ? undefined : 'City is required.',
      province: province.trim() ? undefined : 'Province is required.',
      postalCode: postalCode.trim() ? undefined : 'Postal code is required.',
      country: country.trim() ? undefined : 'Country is required.',
    }),
    [recipientName, phone, street, barangay, city, province, postalCode, country],
  );

  const handleSave = () => {
    setSubmitted(true);

    if (
      errors.recipientName ||
      errors.phone ||
      errors.street ||
      errors.barangay ||
      errors.city ||
      errors.province ||
      errors.postalCode ||
      errors.country
    ) {
      return;
    }

    setSaving(true);
    setTimeout(() => {
      onSave({
        label: addressLabel,
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        street: street.trim(),
        barangay: barangay.trim(),
        city: city.trim(),
        province: province.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        isDefault,
      });
    }, 350);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-32 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center">
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
              onPress={onBack}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
            >
              <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
            </Pressable>
            <Text className="ml-4 text-xl font-semibold text-white">{title}</Text>
          </View>

          <View className="mt-8">
            <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Address Label</Text>
            <View className="flex-row flex-wrap gap-2">
              {labels.map((label) => {
                const active = addressLabel === label;

                return (
                  <Pressable
                    key={label}
                    className={`rounded-full border px-1 py-1 ${active ? 'border-[#C6A96B] bg-[#1A1710]' : 'border-[#222222] bg-[#121212]'}`}
                    onPress={() => setAddressLabel(label)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
                  >
                    <AddressLabelBadge label={label} />
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mt-6 gap-5">
            <FormInput
              label="Recipient Name"
              value={recipientName}
              placeholder="Juan dela Cruz"
              focused={focusedField === 'recipientName'}
              error={submitted ? errors.recipientName : undefined}
              onFocus={() => setFocusedField('recipientName')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setRecipientName}
            />
            <FormInput
              label="Phone Number"
              value={phone}
              placeholder="+63 917 123 4567"
              focused={focusedField === 'phone'}
              error={submitted ? errors.phone : undefined}
              keyboardType="phone-pad"
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setPhone}
            />
            <FormInput
              label="Street Address"
              value={street}
              placeholder="House no., street, building"
              focused={focusedField === 'street'}
              error={submitted ? errors.street : undefined}
              onFocus={() => setFocusedField('street')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setStreet}
            />
            <FormInput
              label="Barangay / Area"
              value={barangay}
              placeholder="Barangay or area"
              focused={focusedField === 'barangay'}
              error={submitted ? errors.barangay : undefined}
              onFocus={() => setFocusedField('barangay')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setBarangay}
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <FormInput
                  label="City"
                  value={city}
                  placeholder="City"
                  focused={focusedField === 'city'}
                  error={submitted ? errors.city : undefined}
                  onFocus={() => setFocusedField('city')}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={setCity}
                />
              </View>
              <View className="flex-1">
                <FormInput
                  label="Province"
                  value={province}
                  placeholder="Province"
                  focused={focusedField === 'province'}
                  error={submitted ? errors.province : undefined}
                  onFocus={() => setFocusedField('province')}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={setProvince}
                />
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <FormInput
                  label="Postal Code"
                  value={postalCode}
                  placeholder="3023"
                  focused={focusedField === 'postalCode'}
                  error={submitted ? errors.postalCode : undefined}
                  keyboardType="numeric"
                  onFocus={() => setFocusedField('postalCode')}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={(value) => setPostalCode(value.replace(/\D/g, '').slice(0, 6))}
                />
              </View>
              <View className="flex-1">
                <FormInput
                  label="Country"
                  value={country}
                  placeholder="Philippines"
                  focused={focusedField === 'country'}
                  error={submitted ? errors.country : undefined}
                  onFocus={() => setFocusedField('country')}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={setCountry}
                />
              </View>
            </View>
          </View>

          <Pressable
            className={`mt-6 flex-row items-center rounded-2xl border px-4 py-4 ${
              isDefault ? 'border-[#5F5131] bg-[#1A1710]' : 'border-[#222222] bg-[#121212]'
            }`}
            onPress={() => setIsDefault((value) => !value)}
            style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
          >
            <Ionicons name={isDefault ? 'checkmark-circle' : 'ellipse-outline'} size={20} color={isDefault ? '#C6A96B' : '#666666'} />
            <View className="ml-3 flex-1">
              <Text className="text-base font-semibold text-white">Set as Default</Text>
              <Text className="mt-1 text-xs text-[#777777]">Use this as the primary shipping address.</Text>
            </View>
          </Pressable>

          <Pressable
            className={`mt-8 h-12 flex-row items-center justify-center rounded-xl px-5 ${saving ? 'bg-[#8F7A4E]' : 'bg-[#C6A96B]'}`}
            disabled={saving}
            onPress={handleSave}
            style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
          >
            <Ionicons name={saving ? 'hourglass-outline' : 'checkmark'} size={18} color="#0A0A0A" />
            <Text className="ml-2 text-base font-semibold text-[#0A0A0A]">{saving ? 'Saving...' : 'Save Address'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
