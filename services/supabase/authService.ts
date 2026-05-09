export type OAuthProvider = 'apple' | 'facebook' | 'google';

export type AuthServiceErrorCode =
  | 'email_exists'
  | 'invalid_password'
  | 'session_expired'
  | 'network_error';

export class AuthServiceError extends Error {
  code: AuthServiceErrorCode;

  constructor(code: AuthServiceErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

type MockAuthData = {
  email: string;
  oauth_providers: OAuthProvider[];
};

let mockAuthData: MockAuthData = {
  email: 'juan@example.com',
  oauth_providers: ['google'],
};

function maybeMockAuthError(value: string) {
  const normalizedValue = value.trim().toLowerCase();

  if (normalizedValue.includes('exists')) {
    throw new AuthServiceError('email_exists', 'Email already exists');
  }

  if (normalizedValue === 'expired_session') {
    throw new AuthServiceError('session_expired', 'Session expired');
  }

  if (normalizedValue === 'network_error') {
    throw new AuthServiceError('network_error', 'Network error');
  }
}

export async function updateEmail(email: string) {
  maybeMockAuthError(email);

  mockAuthData = {
    ...mockAuthData,
    email: email.trim(),
  };

  return Promise.resolve({ email: mockAuthData.email });
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  maybeMockAuthError(currentPassword);

  if (currentPassword.trim().toLowerCase() === 'invalid' || newPassword.length < 8) {
    throw new AuthServiceError('invalid_password', 'Invalid password');
  }

  return Promise.resolve({ updated: true });
}

export async function linkOAuthProvider(provider: OAuthProvider) {
  mockAuthData = {
    ...mockAuthData,
    oauth_providers: Array.from(new Set([...mockAuthData.oauth_providers, provider])),
  };

  return Promise.resolve({ provider, linked: true });
}

export async function unlinkOAuthProvider(provider: OAuthProvider) {
  mockAuthData = {
    ...mockAuthData,
    oauth_providers: mockAuthData.oauth_providers.filter((currentProvider) => currentProvider !== provider),
  };

  return Promise.resolve({ provider, linked: false });
}
