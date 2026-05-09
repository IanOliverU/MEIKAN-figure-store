import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  ReturnKeyTypeOptions,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
};

export function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  iconName,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete,
  textContentType,
  returnKeyType,
  onSubmitEditing,
}: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const shouldHideText = secureTextEntry && !isPasswordVisible;
  const borderColor = error ? '#7F2A2A' : isFocused ? '#C6A96B' : '#242424';
  const labelColor = error ? '#D06A63' : isFocused ? '#C6A96B' : '#A1A1A1';

  return (
    <View>
      <Text className="mb-2.5 text-[11px] font-medium uppercase tracking-wide" style={{ color: labelColor }}>
        {label}
      </Text>
      <View
        className="flex-row items-center rounded-2xl bg-[#1A1A1A] px-4"
        style={{ borderColor, borderWidth: 1, height: 58 }}
      >
        {iconName ? <Ionicons name={iconName} size={18} color={error ? '#D06A63' : '#777777'} /> : null}
        <TextInput
          className="ml-3 h-full min-w-0 flex-1 py-0 text-base text-white"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          textContentType={textContentType}
          secureTextEntry={shouldHideText}
          selectionColor="#C6A96B"
          cursorColor="#C6A96B"
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            className="ml-3 h-10 w-10 items-center justify-center rounded-full"
            onPress={() => setIsPasswordVisible((current) => !current)}
            style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}
          >
            <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={18} color="#777777" />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="mt-2 text-xs text-[#D06A63]">{error}</Text> : null}
    </View>
  );
}
