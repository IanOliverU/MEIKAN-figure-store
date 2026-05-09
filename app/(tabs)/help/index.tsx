import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContactSupportForm } from '../../../components/help/ContactSupportForm';
import { FAQAccordionItem } from '../../../components/help/FAQAccordionItem';
import { faqs, policies, supportOptions } from '../../../components/help/helpData';
import { MockChatModal } from '../../../components/help/MockChatModal';
import { PolicyRow } from '../../../components/help/PolicyRow';
import { SupportOptionCard, SupportOptionKind } from '../../../components/help/SupportOptionCard';

const ORDERS_ROUTE = '/orders' as Href;

function policyRoute(policyId: string) {
  return `/help/policy/${policyId}` as Href;
}

export default function HelpCenterScreen() {
  const [search, setSearch] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(faqs[0]?.id ?? null);
  const [chatVisible, setChatVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return faqs;
    }

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query),
    );
  }, [search]);

  const handleSupportPress = (kind: SupportOptionKind) => {
    if (kind === 'chat') {
      setChatVisible(true);
      return;
    }

    if (kind === 'email') {
      setContactVisible(true);
      return;
    }

    router.push(ORDERS_ROUTE);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-28 pt-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
            onPress={() => router.back()}
            style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
          >
            <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
          </Pressable>
          <View className="ml-4">
            <Text className="text-xl font-semibold text-white">Help Center</Text>
            <Text className="mt-1 text-sm text-[#A1A1A1]">How can we help?</Text>
          </View>
        </View>

        <View className="mt-7 flex-row items-center rounded-2xl border border-[#222222] bg-[#121212] px-4">
          <Ionicons name="search-outline" size={18} color="#666666" />
          <TextInput
            className="ml-3 h-12 flex-1 text-base text-white"
            value={search}
            placeholder="Search orders, shipping, returns..."
            placeholderTextColor="#555555"
            onChangeText={setSearch}
          />
          {search ? (
            <Pressable
              className="h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A]"
              onPress={() => setSearch('')}
              style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}
            >
              <Ionicons name="close" size={15} color="#A1A1A1" />
            </Pressable>
          ) : null}
        </View>

        <View className="mt-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Contact Us</Text>
          <View className="gap-3">
            {supportOptions.map((option) => (
              <SupportOptionCard
                key={option.id}
                icon={option.icon}
                title={option.title}
                subtitle={option.subtitle}
                badge={option.badge}
                onPress={() => handleSupportPress(option.id)}
              />
            ))}
          </View>
        </View>

        <View className="mt-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Frequently Asked</Text>
          {filteredFaqs.length > 0 ? (
            <View className="gap-3">
              {filteredFaqs.map((faq) => (
                <FAQAccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  category={faq.category}
                  expanded={expandedFaqId === faq.id}
                  onPress={() => setExpandedFaqId((currentId) => (currentId === faq.id ? null : faq.id))}
                />
              ))}
            </View>
          ) : (
            <View className="items-center rounded-2xl border border-[#222222] bg-[#121212] px-5 py-10">
              <Ionicons name="search-outline" size={32} color="#5F5F5F" />
              <Text className="mt-4 text-lg font-semibold text-white">No help articles found</Text>
              <Text className="mt-2 text-center text-sm leading-5 text-[#777777]">Try another keyword or contact support.</Text>
              <Pressable
                className="mt-6 h-12 flex-row items-center justify-center rounded-xl bg-[#C6A96B] px-6"
                onPress={() => setContactVisible(true)}
                style={({ pressed }) => ({ opacity: pressed ? 0.82 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
              >
                <Ionicons name="mail-outline" size={17} color="#0A0A0A" />
                <Text className="ml-2 text-sm font-semibold text-[#0A0A0A]">Contact Support</Text>
              </Pressable>
            </View>
          )}
        </View>

        <View className="mt-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">Policies</Text>
          <View className="rounded-2xl border border-[#222222] bg-[#121212] px-4">
            {policies.map((policy) => (
              <PolicyRow key={policy.id} title={policy.title} onPress={() => router.push(policyRoute(policy.id))} />
            ))}
          </View>
        </View>
      </ScrollView>

      <MockChatModal visible={chatVisible} onClose={() => setChatVisible(false)} />
      <ContactSupportForm visible={contactVisible} onClose={() => setContactVisible(false)} />
    </SafeAreaView>
  );
}
