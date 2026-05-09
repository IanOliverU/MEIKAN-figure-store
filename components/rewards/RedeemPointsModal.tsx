import { Ionicons } from '@expo/vector-icons';
import { Alert, Modal, Pressable, Text, View } from 'react-native';

export type RedeemOption = {
  id: string;
  points: number;
  credit: number;
};

type RedeemPointsModalProps = {
  visible: boolean;
  availablePoints: number;
  options: RedeemOption[];
  onClose: () => void;
  onRedeem: (option: RedeemOption) => void;
};

export function RedeemPointsModal({ visible, availablePoints, options, onClose, onRedeem }: RedeemPointsModalProps) {
  const handleRedeem = (option: RedeemOption) => {
    if (option.points > availablePoints) {
      return;
    }

    Alert.alert(
      `Redeem ${option.points.toLocaleString('en-US')} points?`,
      `This mock flow will create a ₱${option.credit} off reward and update your points locally.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => onRedeem(option),
        },
      ],
    );
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/70">
        <Pressable className="flex-1" onPress={onClose} />
        <View className="rounded-t-2xl border border-[#222222] bg-[#0F0F0F] px-5 pb-8 pt-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-semibold text-white">Redeem Points</Text>
              <Text className="mt-1 text-sm text-[#A1A1A1]">{availablePoints.toLocaleString('en-US')} points available</Text>
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]"
              onPress={onClose}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
            >
              <Ionicons name="close" size={18} color="#A1A1A1" />
            </Pressable>
          </View>

          <View className="mt-5 gap-3">
            {options.map((option) => {
              const disabled = option.points > availablePoints;

              return (
                <Pressable
                  key={option.id}
                  className={`rounded-2xl border p-4 ${
                    disabled ? 'border-[#222222] bg-[#121212] opacity-45' : 'border-[#5F5131] bg-[#1A1710]'
                  }`}
                  disabled={disabled}
                  onPress={() => handleRedeem(option)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.78 : disabled ? 0.45 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
                >
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-base font-semibold text-white">{option.points.toLocaleString('en-US')} pts</Text>
                      <Text className="mt-1 text-sm text-[#A1A1A1]">₱{option.credit} off next order</Text>
                    </View>
                    <Text className={`text-sm font-semibold ${disabled ? 'text-[#666666]' : 'text-[#C6A96B]'}`}>
                      {disabled ? 'Not enough' : 'Redeem'}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}
