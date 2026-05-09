export type ActiveSession = {
  id: string;
  device_name: string;
  client_info: string;
  location: string;
  last_active_at: string;
  is_current_device: boolean;
};

export type SecuritySettings = {
  user_id: string;
  two_factor_enabled: boolean;
  active_sessions: ActiveSession[];
  last_login_at: string;
};

const MOCK_DATE = '2026-05-10T00:00:00.000Z';

let mockSecuritySettings: SecuritySettings = {
  user_id: 'mock-user-id',
  two_factor_enabled: false,
  last_login_at: MOCK_DATE,
  active_sessions: [
    {
      id: 'mock-session-current',
      device_name: 'iPhone 15 Pro',
      client_info: 'MEIKAN App on iOS',
      location: 'San Jose del Monte, PH',
      last_active_at: 'Active now',
      is_current_device: true,
    },
    {
      id: 'mock-session-desktop',
      device_name: 'Windows Desktop',
      client_info: 'Chrome on Windows',
      location: 'Quezon City, PH',
      last_active_at: '2 hours ago',
      is_current_device: false,
    },
    {
      id: 'mock-session-tablet',
      device_name: 'iPad Air',
      client_info: 'Safari on iPadOS',
      location: 'Tokyo, JP',
      last_active_at: '3 days ago',
      is_current_device: false,
    },
  ],
};

function cloneSettings(settings: SecuritySettings): SecuritySettings {
  return {
    ...settings,
    active_sessions: settings.active_sessions.map((session) => ({ ...session })),
  };
}

// Future auth integration belongs here: Supabase Auth sessions, OTP verification,
// device/session tracking, account deletion, and re-authentication for sensitive actions.
export async function getSecuritySettings() {
  return Promise.resolve(cloneSettings(mockSecuritySettings));
}

export async function enableTwoFactor(method: 'authenticator' | 'sms', verificationCode: string) {
  mockSecuritySettings = {
    ...mockSecuritySettings,
    two_factor_enabled: true,
  };

  return Promise.resolve({
    two_factor_enabled: mockSecuritySettings.two_factor_enabled,
    method,
    verified: Boolean(verificationCode.trim()),
  });
}

export async function disableTwoFactor() {
  mockSecuritySettings = {
    ...mockSecuritySettings,
    two_factor_enabled: false,
  };

  return Promise.resolve({ two_factor_enabled: mockSecuritySettings.two_factor_enabled });
}

export async function getActiveSessions() {
  return Promise.resolve(mockSecuritySettings.active_sessions.map((session) => ({ ...session })));
}

export async function revokeSession(sessionId: string) {
  mockSecuritySettings = {
    ...mockSecuritySettings,
    active_sessions: mockSecuritySettings.active_sessions.filter((session) => session.id !== sessionId),
  };

  return Promise.resolve({ session_id: sessionId, revoked: true });
}

export async function requestAccountDeletion(confirmation: string) {
  return Promise.resolve({
    requested: confirmation === 'DELETE',
    user_id: mockSecuritySettings.user_id,
  });
}
