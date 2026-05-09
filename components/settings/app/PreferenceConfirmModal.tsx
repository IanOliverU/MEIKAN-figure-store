import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';

type PreferenceConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function PreferenceConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  loading = false,
  onCancel,
  onConfirm,
}: PreferenceConfirmModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 justify-end bg-black/70 px-5 pb-8">
        <View className="rounded-2xl border border-[#222222] bg-[#121212] p-5">
          <View className="flex-row items-start">
            <View className="h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
              <Ionicons name="alert-circle-outline" size={22} color="#F59E0B" />
            </View>
            <View className="ml-4 min-w-0 flex-1">
              <Text className="text-lg font-semibold text-white">{title}</Text>
              <Text className="mt-2 text-sm leading-5 text-[#A1A1A1]">{message}</Text>
            </View>
          </View>

          <View className="mt-6 flex-row gap-3">
            <Pressable
              className="h-12 flex-1 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]"
              disabled={loading}
              onPress={onCancel}
              style={({ pressed }) => ({ opacity: loading ? 0.6 : pressed ? 0.78 : 1 })}
            >
              <Text className="text-sm font-semibold text-white">Cancel</Text>
            </Pressable>
            <Pressable
              className="h-12 flex-1 flex-row items-center justify-center rounded-xl border border-[#C6A96B] bg-[#1A1710] px-4"
              disabled={loading}
              onPress={onConfirm}
              style={({ pressed }) => ({ opacity: loading ? 0.6 : pressed ? 0.78 : 1 })}
            >
              {loading ? <ActivityIndicator size="small" color="#C6A96B" /> : null}
              <Text className="text-sm font-semibold text-[#C6A96B]" style={{ marginLeft: loading ? 8 : 0 }}>
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
