import { isSupabaseConfigured, supabase } from './client';

export type Profile = {
  id: string;
  user_id: string;
  display_name: string;
  username: string;
  avatar_url: string | null;
  bio: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdateInput = Partial<
  Pick<Profile, 'display_name' | 'username' | 'avatar_url' | 'bio'>
>;

export type ProfileServiceErrorCode = 'username_taken' | 'session_expired' | 'network_error';

export class ProfileServiceError extends Error {
  code: ProfileServiceErrorCode;

  constructor(code: ProfileServiceErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export const AVATAR_BUCKET = 'avatars';
export const FUTURE_AVATAR_PATH_PATTERN = '{user_id}/profile.jpg';

const MOCK_DATE = '2026-05-10T00:00:00.000Z';

let mockProfile: Profile = {
  id: 'mock-profile-id',
  user_id: 'mock-user-id',
  display_name: 'Juan dela Cruz',
  username: 'juan_collector',
  avatar_url: null,
  bio: 'Anime figure collector',
  email: 'juan@example.com',
  created_at: MOCK_DATE,
  updated_at: MOCK_DATE,
};

function cloneProfile(profile: Profile): Profile {
  return { ...profile };
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
}

function getDefaultUsername(email: string, userId: string) {
  const baseUsername = normalizeUsername(email.split('@')[0] || 'collector');
  return `${baseUsername}_${userId.slice(0, 8)}`;
}

function toProfileServiceError(error: { code?: string; message?: string } | null) {
  if (error?.code === '23505') {
    return new ProfileServiceError('username_taken', error.message || 'Username already taken');
  }

  return new ProfileServiceError('network_error', error?.message || 'Profile request failed');
}

async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new ProfileServiceError('session_expired', error.message);
  }

  return user;
}

export function getAvatarStoragePath(userId: string) {
  return `${userId}/profile.jpg`;
}

function maybeMockProfileError(data: ProfileUpdateInput) {
  const username = data.username?.trim().toLowerCase();

  if (username === 'taken' || username === 'taken_username') {
    throw new ProfileServiceError('username_taken', 'Username already taken');
  }

  if (username === 'expired_session') {
    throw new ProfileServiceError('session_expired', 'Session expired');
  }

  if (username === 'network_error') {
    throw new ProfileServiceError('network_error', 'Network error');
  }
}

async function createProfileForUser(user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>) {
  const email = user.email ?? '';
  const displayName =
    typeof user.user_metadata?.display_name === 'string' && user.user_metadata.display_name.trim()
      ? user.user_metadata.display_name.trim()
      : email.split('@')[0] || 'Collector';

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: user.id,
      display_name: displayName,
      username: getDefaultUsername(email, user.id),
      email,
    })
    .select('*')
    .single();

  if (error) {
    throw toProfileServiceError(error);
  }

  return data;
}

export async function getProfile() {
  if (!isSupabaseConfigured) {
    return Promise.resolve(cloneProfile(mockProfile));
  }

  const user = await getCurrentUser();

  if (!user) {
    return cloneProfile(mockProfile);
  }

  const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle();

  if (error) {
    throw toProfileServiceError(error);
  }

  return data ?? createProfileForUser(user);
}

export async function updateProfile(data: ProfileUpdateInput) {
  if (!isSupabaseConfigured) {
    maybeMockProfileError(data);

    mockProfile = {
      ...mockProfile,
      ...data,
      display_name: data.display_name?.trim() || mockProfile.display_name,
      username: data.username?.trim() || mockProfile.username,
      bio: data.bio?.trim() ?? mockProfile.bio,
      updated_at: new Date().toISOString(),
    };

    return Promise.resolve(cloneProfile(mockProfile));
  }

  const user = await getCurrentUser();

  if (!user) {
    throw new ProfileServiceError('session_expired', 'Session expired');
  }

  const updates = {
    ...data,
    display_name: data.display_name?.trim() || undefined,
    username: data.username ? normalizeUsername(data.username) : undefined,
    bio: data.bio?.trim() ?? undefined,
    email: user.email ?? '',
  };

  const { data: profile, error } = await supabase
    .from('profiles')
    .upsert(
      {
        user_id: user.id,
        display_name: updates.display_name || user.email?.split('@')[0] || 'Collector',
        username: updates.username || getDefaultUsername(user.email ?? '', user.id),
        avatar_url: updates.avatar_url,
        bio: updates.bio,
        email: updates.email,
      },
      { onConflict: 'user_id' },
    )
    .select('*')
    .single();

  if (error) {
    throw toProfileServiceError(error);
  }

  return profile;
}
