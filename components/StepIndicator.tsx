import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type StepIndicatorProps = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  { id: 1, label: 'Cart' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Confirm' },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <View className="flex-row items-start">
      {steps.map((step, index) => {
        const isComplete = step.id < currentStep;
        const isActive = step.id === currentStep;
        const circleClass = isComplete || isActive ? 'bg-[#C6A96B]' : 'border border-[#222222] bg-[#121212]';
        const textClass = isComplete || isActive ? 'text-[#C6A96B]' : 'text-[#666666]';

        return (
          <View key={step.id} className="flex-1 flex-row items-start">
            <View className="items-center">
              <View className={`h-8 w-8 items-center justify-center rounded-full ${circleClass}`}>
                {isComplete ? (
                  <Ionicons name="checkmark" size={15} color="#0A0A0A" />
                ) : (
                  <Text className={`text-sm font-semibold ${isActive ? 'text-[#0A0A0A]' : 'text-[#666666]'}`}>
                    {step.id}
                  </Text>
                )}
              </View>
              <Text className={`mt-2 text-[11px] font-semibold ${textClass}`}>{step.label}</Text>
            </View>
            {index < steps.length - 1 ? <View className="mx-2 mt-4 h-px flex-1 bg-[#222222]" /> : null}
          </View>
        );
      })}
    </View>
  );
}
