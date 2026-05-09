import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

type ChatMessage = {
  id: string;
  sender: 'support' | 'user';
  text: string;
};

type MockChatModalProps = {
  visible: boolean;
  onClose: () => void;
};

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'support',
    text: 'Hi, welcome to MEIKAN Support. Tell us what you need help with and we will review it shortly.',
  },
];

export function MockChatModal({ visible, onClose }: MockChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');

  const handleSend = () => {
    const text = draft.trim();

    if (!text) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, sender: 'user', text },
      {
        id: `support-${Date.now()}`,
        sender: 'support',
        text: 'Thanks! Our support team will review this shortly.',
      },
    ]);
    setDraft('');
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView className="flex-1 justify-end bg-black/70" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="max-h-[82%] rounded-t-2xl border border-[#222222] bg-[#0F0F0F] px-5 pb-6 pt-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-semibold text-white">MEIKAN Support</Text>
              <View className="mt-1 flex-row items-center">
                <View className="h-2 w-2 rounded-full bg-emerald-400" />
                <Text className="ml-2 text-sm text-[#A1A1A1]">Online</Text>
              </View>
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]"
              onPress={onClose}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
            >
              <Ionicons name="close" size={18} color="#A1A1A1" />
            </Pressable>
          </View>

          <ScrollView className="mt-5" contentContainerClassName="gap-3 pb-2" showsVerticalScrollIndicator={false}>
            {messages.map((message) => {
              const user = message.sender === 'user';

              return (
                <View key={message.id} className={`max-w-[86%] rounded-2xl px-4 py-3 ${user ? 'self-end bg-[#C6A96B]' : 'self-start bg-[#1A1A1A]'}`}>
                  <Text className={`text-sm leading-5 ${user ? 'text-[#0A0A0A]' : 'text-[#A1A1A1]'}`}>{message.text}</Text>
                </View>
              );
            })}
          </ScrollView>

          <View className="mt-4 flex-row items-center gap-3">
            <TextInput
              className="min-h-11 flex-1 rounded-xl border border-[#222222] bg-[#121212] px-4 py-3 text-sm text-white"
              value={draft}
              placeholder="Type your message..."
              placeholderTextColor="#555555"
              onChangeText={setDraft}
            />
            <Pressable
              className={`h-11 w-11 items-center justify-center rounded-xl ${draft.trim() ? 'bg-[#C6A96B]' : 'bg-[#2A2A2A]'}`}
              disabled={!draft.trim()}
              onPress={handleSend}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
            >
              <Ionicons name="send" size={17} color={draft.trim() ? '#0A0A0A' : '#777777'} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
