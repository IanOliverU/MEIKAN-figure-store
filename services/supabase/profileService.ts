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
export const FUTURE_AVATAR_PATH_PATTERN = 'avatars/{user_id}/profile.jpg';

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

export function getAvatarStoragePath(userId: string) {
  return `${AVATAR_BUCKET}/${userId}/profile.jpg`;
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

export async function getProfile() {
  return Promise.resolve(cloneProfile(mockProfile));
}

export async function updateProfile(data: ProfileUpdateInput) {
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
