import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type FAQAccordionItemProps = {
  question: string;
  answer: string;
  category: string;
  expanded: boolean;
  onPress: () => void;
};

export function FAQAccordionItem({ question, answer, category, expanded, onPress }: FAQAccordionItemProps) {
  return (
    <Pressable
      className={`rounded-2xl border bg-[#121212] p-4 ${expanded ? 'border-[#5F5131]' : 'border-[#222222]'}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}
    >
      <View className="flex-row items-start">
        <View className="min-w-0 flex-1">
          <Text className="text-[10px] font-semibold uppercase tracking-wider text-[#C6A96B]">{category}</Text>
          <Text className="mt-1 text-base font-semibold leading-5 text-white">{question}</Text>
        </View>
        <Ionicons
          name="chevron-down"
          size={18}
          color="#A1A1A1"
          style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}
        />
      </View>
      {expanded ? (
        <View className="mt-4 border-t border-[#222222] pt-4">
          <Text className="text-sm leading-5 text-[#A1A1A1]">{answer}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}
