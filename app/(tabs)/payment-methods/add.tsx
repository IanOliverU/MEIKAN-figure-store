import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePaymentMethods } from '../../../components/payment/PaymentMethodsContext';
import { SecurityNotice } from '../../../components/payment/SecurityNotice';

const PAYMENT_METHODS_ROUTE = '/payment-methods' as Href;

type FieldName = 'cardholderName' | 'cardNumber' | 'expiry' | 'cvv' | 'billingAddress';

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim();
}

function formatExpiry(value: string) {
  const compact = value.replace(/\D/g, '').slice(0, 4);

  if (compact.length <= 2) {
    return compact;
  }

  return `${compact.slice(0, 2)}/${compact.slice(2)}`;
}

function FormInput({
  label,
  value,
  placeholder,
  focused,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  onFocus,
  onBlur,
  onChangeText,
}: {
  label: string;
  value: string;
  placeholder: string;
  focused: boolean;
  error?: string;
  keyboardType?: 'default' | 'numeric';
  secureTextEntry?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChangeText: (value: string) => void;
}) {
  return (
    <View>
      <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">{label}</Text>
      <TextInput
        className={`h-12 rounded-xl border bg-[#121212] px-4 text-base text-white ${
          focused ? 'border-[#C6A96B]' : error ? 'border-red-500/40' : 'border-[#222222]'
        }`}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#555555"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />
      {error ? <Text className="mt-2 text-xs text-red-300">{error}</Text> : null}
    </View>
  );
}

export default function AddCardScreen() {
  const { addCard } = usePaymentMethods();
  const [focusedField, setFocusedField] = useState<FieldName | null>(null);
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const errors = useMemo(
    () => ({
      cardholderName: cardholderName.trim() ? undefined : 'Cardholder name is required.',
      cardNumber: cardNumber.trim() ? undefined : 'Card number is required.',
      expiry: expiry.trim() ? undefined : 'Expiration date is required.',
      cvv: cvv.trim() ? undefined : 'CVV is required.',
    }),
    [cardholderName, cardNumber, expiry, cvv],
  );

  const handleSave = () => {
    setSubmitted(true);

    if (errors.cardholderName || errors.cardNumber || errors.expiry || errors.cvv) {
      return;
    }

    setSaving(true);
    setTimeout(() => {
      addCard({
        cardholderName: cardholderName.trim(),
        cardNumber,
        expiry,
        billingAddress,
      });
      router.replace(PAYMENT_METHODS_ROUTE);
    }, 450);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-28 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center">
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
              onPress={() => router.back()}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
            >
              <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
            </Pressable>
            <Text className="ml-4 text-xl font-semibold text-white">Add New Card</Text>
          </View>

          <View className="mt-8 rounded-2xl border border-[#222222] bg-[#121212] p-4">
            <View className="h-28 justify-between rounded-2xl border border-[#5F5131] bg-[#1A1710] p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs font-semibold uppercase tracking-wider text-[#C6A96B]">MEIKAN Secure Card</Text>
                <Ionicons name="lock-closed-outline" size={16} color="#C6A96B" />
              </View>
              <Text className="text-lg font-semibold tracking-wide text-white">
                {cardNumber || '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022'}
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="max-w-[70%] text-xs font-semibold uppercase text-[#A1A1A1]" numberOfLines={1}>
                  {cardholderName || 'Cardholder Name'}
                </Text>
                <Text className="text-xs font-semibold text-[#A1A1A1]">{expiry || 'MM/YY'}</Text>
              </View>
            </View>
          </View>

          <View className="mt-6 gap-5">
            <FormInput
              label="Cardholder Name"
              value={cardholderName}
              placeholder="Name on card"
              focused={focusedField === 'cardholderName'}
              error={submitted ? errors.cardholderName : undefined}
              onFocus={() => setFocusedField('cardholderName')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setCardholderName}
            />
            <FormInput
              label="Card Number"
              value={cardNumber}
              placeholder="1234 5678 9012 3456"
              focused={focusedField === 'cardNumber'}
              error={submitted ? errors.cardNumber : undefined}
              keyboardType="numeric"
              onFocus={() => setFocusedField('cardNumber')}
              onBlur={() => setFocusedField(null)}
              onChangeText={(value) => setCardNumber(formatCardNumber(value))}
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <FormInput
                  label="Expiration Date"
                  value={expiry}
                  placeholder="MM/YY"
                  focused={focusedField === 'expiry'}
                  error={submitted ? errors.expiry : undefined}
                  keyboardType="numeric"
                  onFocus={() => setFocusedField('expiry')}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={(value) => setExpiry(formatExpiry(value))}
                />
              </View>
              <View className="flex-1">
                <FormInput
                  label="CVV"
                  value={cvv}
                  placeholder="123"
                  focused={focusedField === 'cvv'}
                  error={submitted ? errors.cvv : undefined}
                  keyboardType="numeric"
                  secureTextEntry
                  onFocus={() => setFocusedField('cvv')}
                  onBlur={() => setFocusedField(null)}
                  onChangeText={(value) => setCvv(value.replace(/\D/g, '').slice(0, 4))}
                />
              </View>
            </View>
            <FormInput
              label="Billing Address"
              value={billingAddress}
              placeholder="Optional billing address"
              focused={focusedField === 'billingAddress'}
              onFocus={() => setFocusedField('billingAddress')}
              onBlur={() => setFocusedField(null)}
              onChangeText={setBillingAddress}
            />
          </View>

          <Pressable
            className={`mt-8 h-12 flex-row items-center justify-center rounded-xl px-5 ${saving ? 'bg-[#8F7A4E]' : 'bg-[#C6A96B]'}`}
            onPress={handleSave}
            disabled={saving}
            style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
          >
            <Ionicons name={saving ? 'hourglass-outline' : 'checkmark'} size={18} color="#0A0A0A" />
            <Text className="ml-2 text-base font-semibold text-[#0A0A0A]">{saving ? 'Saving...' : 'Save Card'}</Text>
          </Pressable>

          <View className="mt-4">
            <SecurityNotice />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
