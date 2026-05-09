import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from 'react-native';

type ContactSupportFormProps = {
  visible: boolean;
  onClose: () => void;
};

const topics = ['Order Status', 'Pre-order', 'Payment', 'Damaged Item'];

export function ContactSupportForm({ visible, onClose }: ContactSupportFormProps) {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);

    if (!message.trim()) {
      return;
    }

    setMessage('');
    setOrderId('');
    setSubmitted(false);
    onClose();
    setTimeout(() => {
      // Delay lets the modal close before the native alert paints.
      Alert.alert('Support request submitted', 'Thanks. This mock request was saved locally for this session.');
    }, 100);
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView className="flex-1 justify-end bg-black/70" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="rounded-t-2xl border border-[#222222] bg-[#0F0F0F] px-5 pb-7 pt-5">
          <View className="flex-row items-start justify-between gap-4">
            <View className="min-w-0 flex-1">
              <Text className="text-xl font-semibold text-white">Contact Support</Text>
              <Text className="mt-1 text-sm text-[#A1A1A1]">Send a mock request to the MEIKAN team.</Text>
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full border border-[#222222] bg-[#121212]"
              onPress={onClose}
              style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
            >
              <Ionicons name="close" size={18} color="#A1A1A1" />
            </Pressable>
          </View>

          <View className="mt-5">
            <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">Topic</Text>
            <View className="flex-row flex-wrap gap-2">
              {topics.map((item) => {
                const active = topic === item;

                return (
                  <Pressable
                    key={item}
                    className={`rounded-full border px-3 py-2 ${active ? 'border-[#C6A96B] bg-[#1A1710]' : 'border-[#222222] bg-[#121212]'}`}
                    onPress={() => setTopic(item)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
                  >
                    <Text className={`text-xs font-semibold ${active ? 'text-[#C6A96B]' : 'text-[#A1A1A1]'}`}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mt-5">
            <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">Order ID Optional</Text>
            <TextInput
              className="h-12 rounded-xl border border-[#222222] bg-[#121212] px-4 text-base text-white"
              value={orderId}
              placeholder="MKN-20481"
              placeholderTextColor="#555555"
              autoCapitalize="characters"
              onChangeText={setOrderId}
            />
          </View>

          <View className="mt-5">
            <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#666666]">Message</Text>
            <TextInput
              className={`min-h-28 rounded-xl border bg-[#121212] px-4 py-3 text-base text-white ${
                submitted && !message.trim() ? 'border-red-500/40' : 'border-[#222222]'
              }`}
              value={message}
              placeholder="How can we help?"
              placeholderTextColor="#555555"
              multiline
              textAlignVertical="top"
              onChangeText={setMessage}
            />
            {submitted && !message.trim() ? <Text className="mt-2 text-xs text-red-300">Message is required.</Text> : null}
          </View>

          <Pressable
            className={`mt-6 h-12 flex-row items-center justify-center rounded-xl px-5 ${message.trim() ? 'bg-[#C6A96B]' : 'bg-[#2A2A2A]'}`}
            disabled={!message.trim()}
            onPress={handleSubmit}
            style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
          >
            <Ionicons name="mail-outline" size={18} color={message.trim() ? '#0A0A0A' : '#777777'} />
            <Text className={`ml-2 text-base font-semibold ${message.trim() ? 'text-[#0A0A0A]' : 'text-[#777777]'}`}>Submit Request</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
