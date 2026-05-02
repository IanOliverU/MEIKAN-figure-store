import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export type TimelineStepState = 'completed' | 'current' | 'pending';

export type TrackingStep = {
  id: string;
  title: string;
  time: string;
  state: TimelineStepState;
};

type TimelineItemProps = {
  step: TrackingStep;
  isLast?: boolean;
};

export function TimelineItem({ step, isLast = false }: TimelineItemProps) {
  const isCompleted = step.state === 'completed';
  const isCurrent = step.state === 'current';
  const circleClass = isCompleted
    ? 'bg-emerald-400'
    : isCurrent
      ? 'border-4 border-[#C6A96B] bg-[#121212]'
      : 'border border-[#333333] bg-[#121212]';
  const titleClass = isCurrent ? 'text-[#C6A96B]' : isCompleted ? 'text-white' : 'text-[#555555]';
  const timeClass = isCurrent ? 'text-[#9F8958]' : isCompleted ? 'text-[#A1A1A1]' : 'text-[#555555]';

  return (
    <View className="flex-row">
      <View className="w-6 items-center">
        <View className={`h-5 w-5 items-center justify-center rounded-full ${circleClass}`}>
          {isCompleted ? <Ionicons name="checkmark" size={12} color="#0A0A0A" /> : null}
        </View>
        {!isLast ? <View className="w-px flex-1 bg-[#2A2A2A]" /> : null}
      </View>
      <View className="flex-1 pb-5 pl-3">
        <Text className={`text-base font-semibold ${titleClass}`}>{step.title}</Text>
        <Text className={`mt-0.5 text-xs ${timeClass}`}>{step.time}</Text>
      </View>
    </View>
  );
}
