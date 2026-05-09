import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { ActiveSession } from '../../../services/supabase/securityService';

type SessionCardProps = {
  session: ActiveSession;
  loading?: boolean;
  onRevoke: () => void;
};

export function SessionCard({ session, loading = false, onRevoke }: SessionCardProps) {
  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="flex-row items-start">
        <View className="h-11 w-11 items-center justify-center rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]">
          <Ionicons name={session.is_current_device ? 'phone-portrait-outline' : 'desktop-outline'} size={20} color="#C6A96B" />
        </View>
        <View className="ml-4 min-w-0 flex-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="text-base font-semibold text-white">{session.device_name}</Text>
            {session.is_current_device ? (
              <View className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1">
                <Text className="text-[10px] font-semibold text-emerald-300">Current Device</Text>
              </View>
            ) : null}
          </View>
          <Text className="mt-1 text-sm text-[#A1A1A1]">{session.client_info}</Text>
          <Text className="mt-2 text-xs text-[#777777]">
            {session.location} - {session.last_active_at}
          </Text>
        </View>
      </View>

      {!session.is_current_device ? (
        <Pressable
          accessibilityRole="button"
          className="mt-4 h-10 flex-row items-center justify-center rounded-xl border border-[#7F2A2A] bg-[#2A1212] px-4"
          disabled={loading}
          onPress={onRevoke}
          style={({ pressed }) => ({ opacity: loading ? 0.6 : pressed ? 0.78 : 1 })}
        >
          {loading ? <ActivityIndicator size="small" color="#F87171" /> : <Ionicons name="log-out-outline" size={16} color="#F87171" />}
          <Text className="ml-2 text-sm font-semibold text-[#F87171]">{loading ? 'Revoking...' : 'Revoke Session'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
