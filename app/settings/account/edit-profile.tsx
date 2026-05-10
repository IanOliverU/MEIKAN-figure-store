import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AccountActionButton,
  AccountAvatar,
  AccountCard,
  AccountHeader,
  AccountStatusMessage,
  AccountTextInput,
  getAccountErrorMessage,
} from '../../../components/settings/AccountSettingsUi';
import {
  FUTURE_AVATAR_PATH_PATTERN,
  Profile,
  getAvatarStoragePath,
  getProfile,
  updateProfile,
} from '../../../services/supabase/profileService';

export default function EditProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getProfile()
      .then((currentProfile) => {
        setProfile(currentProfile);
        setDisplayName(currentProfile.display_name);
        setUsername(currentProfile.username);
        setAvatarUrl(currentProfile.avatar_url ?? '');
        setBio(currentProfile.bio);
      })
      .catch((profileError) => {
        setError(getAccountErrorMessage(profileError));
      });
  }, []);

  const displayNameError = submitted && !displayName.trim() ? 'Display name is required.' : undefined;
  const usernameError = submitted && !username.trim() ? 'Username is required.' : undefined;

  const handleSave = async () => {
    setSubmitted(true);
    setSuccess(null);
    setError(null);

    if (!displayName.trim() || !username.trim()) {
      return;
    }

    setLoading(true);

    try {
      const updatedProfile = await updateProfile({
        display_name: displayName,
        username,
        avatar_url: avatarUrl.trim() || null,
        bio,
      });

      setProfile(updatedProfile);
      setSuccess('Profile saved.');
    } catch (saveError) {
      setError(getAccountErrorMessage(saveError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-28 pt-5"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AccountHeader title="Edit Profile" subtitle="Update your Supabase profile fields." onBack={() => router.back()} />

          {profile ? (
            <View className="mt-8">
              <AccountCard>
                <View className="flex-row items-center">
                  <AccountAvatar profile={{ ...profile, display_name: displayName, username }} />
                  <View className="ml-4 min-w-0 flex-1">
                    <Text className="text-base font-semibold text-white">Avatar storage path</Text>
                    <Text className="mt-1 text-xs leading-5 text-[#777777]">
                      Future uploads can target {getAvatarStoragePath(profile.user_id)}.
                    </Text>
                  </View>
                </View>
              </AccountCard>
            </View>
          ) : null}

          <View className="mt-6 gap-5">
            <AccountTextInput
              label="Display Name"
              value={displayName}
              placeholder="Juan dela Cruz"
              iconName="person-outline"
              error={displayNameError}
              autoCapitalize="words"
              onChangeText={setDisplayName}
            />
            <AccountTextInput
              label="Username"
              value={username}
              placeholder="juan_collector"
              iconName="at-outline"
              error={usernameError}
              onChangeText={(value) => setUsername(value.replace(/\s/g, '_').toLowerCase())}
            />
            <AccountTextInput
              label="Avatar URL"
              value={avatarUrl}
              placeholder={FUTURE_AVATAR_PATH_PATTERN}
              iconName="image-outline"
              onChangeText={setAvatarUrl}
            />
            <AccountTextInput
              label="Bio"
              value={bio}
              placeholder="Anime figure collector"
              iconName="chatbubble-ellipses-outline"
              multiline
              autoCapitalize="sentences"
              onChangeText={setBio}
            />
          </View>

          <View className="mt-6 gap-3">
            {success ? <AccountStatusMessage type="success" message={success} /> : null}
            {error ? <AccountStatusMessage type="error" message={error} /> : null}
            <AccountActionButton
              title="Save Profile"
              loadingTitle="Saving profile..."
              iconName="save-outline"
              loading={loading}
              onPress={handleSave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
