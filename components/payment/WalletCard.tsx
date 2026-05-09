import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type WalletProvider = 'GCash' | 'Maya';

export type SavedWallet = {
  id: string;
  provider: WalletProvider;
  linked: boolean;
  number?: string;
  linkFailed?: boolean;
};

type WalletCardProps = {
  wallet: SavedWallet;
  onPress?: () => void;
  onLink?: () => void;
};

const walletStyles = {
  GCash: {
    icon: 'phone-portrait-outline' as const,
    className: 'bg-blue-500/20 border-blue-400/30',
    iconColor: '#60A5FA',
  },
  Maya: {
    icon: 'wallet-outline' as const,
    className: 'bg-violet-500/20 border-violet-400/30',
    iconColor: '#A78BFA',
  },
};

export function WalletCard({ wallet, onPress, onLink }: WalletCardProps) {
  const style = walletStyles[wallet.provider];

  return (
    <Pressable
      className={`rounded-2xl border border-[#222222] bg-[#121212] p-4 ${wallet.linked ? '' : 'opacity-75'}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.82 : wallet.linked ? 1 : 0.75, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="flex-row items-center">
        <View className={`h-11 w-11 items-center justify-center rounded-xl border ${style.className}`}>
          <Ionicons name={style.icon} size={20} color={style.iconColor} />
        </View>

        <View className="ml-4 min-w-0 flex-1">
          <Text className="text-base font-semibold text-white">{wallet.provider}</Text>
          <Text className="mt-1 text-sm text-[#A1A1A1]">{wallet.linked ? wallet.number : 'Not linked'}</Text>
        </View>

        {wallet.linked ? (
          <View className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1">
            <Text className="text-[10px] font-semibold text-emerald-300">Linked</Text>
          </View>
        ) : (
          <Pressable
            className="h-9 justify-center rounded-xl px-3"
            onPress={onLink ?? onPress}
            style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}
          >
            <Text className="text-sm font-semibold text-[#C6A96B]">Link</Text>
          </Pressable>
        )}
      </View>

      {wallet.linkFailed ? (
        <View className="mt-3 flex-row items-center rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2">
          <Ionicons name="alert-circle-outline" size={14} color="#F87171" />
          <Text className="ml-2 text-xs text-red-300">Link failed. Try again later.</Text>
        </View>
      ) : null}
    </Pressable>
  );
}
