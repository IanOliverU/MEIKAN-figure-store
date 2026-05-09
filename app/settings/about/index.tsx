import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appInfo, LegalInfoId } from '../../../config/appInfo';
import { AboutBrandCard } from '../../../components/settings/about/AboutBrandCard';
import { AboutInfoRow } from '../../../components/settings/about/AboutInfoRow';
import { LegalInfoRow } from '../../../components/settings/about/LegalInfoRow';
import { SocialLinkRow } from '../../../components/settings/about/SocialLinkRow';

function Header() {
  return (
    <View className="flex-row items-center">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        className="h-10 w-10 items-center justify-center rounded-xl border border-[#222222] bg-[#121212]"
        onPress={() => router.back()}
        style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}
      >
        <Ionicons name="chevron-back" size={18} color="#A1A1A1" />
      </Pressable>
      <View className="ml-4 min-w-0 flex-1">
        <Text className="text-xl font-semibold text-white">About MEIKAN</Text>
        <Text className="mt-1 text-sm text-[#A1A1A1]">Premium anime figure shopping</Text>
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View>
      <Text className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#666666]">{title}</Text>
      <View className="overflow-hidden rounded-2xl border border-[#222222] bg-[#121212]">{children}</View>
    </View>
  );
}

function legalRoute(id: LegalInfoId) {
  return `/about/${id}` as Href;
}

export default function AboutSettingsScreen() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPlaceholderFeedback = (label: string) => {
    console.log(label);
    setStatusMessage(`${label} will open when links are configured.`);

    if (statusTimer.current) {
      clearTimeout(statusTimer.current);
    }

    statusTimer.current = setTimeout(() => setStatusMessage(null), 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1" contentContainerClassName="px-5 pb-28 pt-5" showsVerticalScrollIndicator={false}>
        <Header />

        <View className="mt-8">
          <AboutBrandCard />
        </View>

        <View className="mt-7">
          <Section title="App Version">
            <AboutInfoRow iconName="information-circle-outline" title="Version" subtitle={`Build ${appInfo.build}`} meta={appInfo.version} showDivider />
            <AboutInfoRow iconName="code-slash-outline" title="Environment" subtitle="Current local build" meta={appInfo.environment} />
          </Section>
        </View>

        <View className="mt-7">
          <Section title="Rate the App">
            <AboutInfoRow
              iconName="star-outline"
              title="Rate the App"
              subtitle="Support MEIKAN with a review"
              onPress={() => showPlaceholderFeedback('Rate the App')}
            />
          </Section>
        </View>

        <View className="mt-7">
          <Section title="Follow Us">
            <SocialLinkRow iconName="logo-instagram" platform="Instagram" handle="@meikan.app" showDivider onPress={() => showPlaceholderFeedback('Instagram')} />
            <SocialLinkRow iconName="logo-twitter" platform="X / Twitter" handle="@meikan_app" showDivider onPress={() => showPlaceholderFeedback('X / Twitter')} />
            <SocialLinkRow iconName="logo-facebook" platform="Facebook" handle="MEIKAN" showDivider onPress={() => showPlaceholderFeedback('Facebook')} />
            <SocialLinkRow iconName="globe-outline" platform="Website" handle="Coming soon" onPress={() => showPlaceholderFeedback('Website')} />
          </Section>
        </View>

        <View className="mt-7">
          <Section title="Legal / Info Links">
            <LegalInfoRow title="Terms of Service" subtitle="Mock terms for the local MVP" showDivider onPress={() => router.push(legalRoute('terms'))} />
            <LegalInfoRow title="Privacy Policy" subtitle="How MEIKAN will handle data later" showDivider onPress={() => router.push(legalRoute('privacy'))} />
            <LegalInfoRow title="Licenses" subtitle="Open-source and attribution notes" onPress={() => router.push(legalRoute('licenses'))} />
          </Section>
        </View>

        <View className="mt-6 min-h-10 justify-center">
          {statusMessage ? (
            <View className="self-start flex-row items-center rounded-full border border-[#C6A96B]/20 bg-[#C6A96B]/10 px-3 py-2">
              <Ionicons name="information-circle-outline" size={14} color="#C6A96B" />
              <Text className="ml-2 text-xs font-semibold text-[#C6A96B]">{statusMessage}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
