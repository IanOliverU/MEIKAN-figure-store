import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';

type ConfirmationModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: 'warning' | 'danger' | 'success';
  loading?: boolean;
  children?: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmationModal({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  tone = 'warning',
  loading = false,
  children,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  const toneColor = tone === 'danger' ? '#F87171' : tone === 'success' ? '#34D399' : '#F59E0B';
  const toneBg = tone === 'danger' ? '#2A1212' : tone === 'success' ? '#102016' : '#2A2112';
  const toneBorder = tone === 'danger' ? '#7F2A2A' : tone === 'success' ? '#1F6B3B' : '#7C5A1F';

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 justify-end bg-black/70 px-5 pb-8">
        <View className="rounded-2xl border border-[#222222] bg-[#121212] p-5">
          <View className="flex-row items-start">
            <View className="h-11 w-11 items-center justify-center rounded-xl border" style={{ backgroundColor: toneBg, borderColor: toneBorder }}>
              <Ionicons
                name={tone === 'danger' ? 'warning-outline' : tone === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline'}
                size={22}
                color={toneColor}
              />
            </View>
            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-lg font-semibold text-white">{title}</Text>
              <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">{message}</Text>
            </View>
          </View>

          {children ? <View className="mt-5">{children}</View> : null}

          <View className="mt-6 flex-row gap-3">
            <Pressable
              className="h-12 flex-1 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]"
              disabled={loading}
              onPress={onCancel}
              style={({ pressed }) => ({ opacity: loading ? 0.6 : pressed ? 0.78 : 1 })}
            >
              <Text className="text-sm font-semibold text-white">{cancelLabel}</Text>
            </Pressable>
            <Pressable
              className="h-12 flex-1 flex-row items-center justify-center rounded-xl px-4"
              disabled={loading}
              onPress={onConfirm}
              style={({ pressed }) => ({
                opacity: loading ? 0.6 : pressed ? 0.78 : 1,
                backgroundColor: toneBg,
                borderColor: toneBorder,
                borderWidth: 1,
              })}
            >
              {loading ? <ActivityIndicator size="small" color={toneColor} /> : null}
              <Text className="text-sm font-semibold" style={{ color: toneColor, marginLeft: loading ? 8 : 0 }}>
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
