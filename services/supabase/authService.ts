import type { AuthError } from '@supabase/supabase-js';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { isSupabaseConfigured, supabase } from './client';

WebBrowser.maybeCompleteAuthSession();

export type OAuthProvider = 'apple' | 'facebook' | 'google';

export type AuthServiceErrorCode =
  | 'email_exists'
  | 'email_not_confirmed'
  | 'invalid_credentials'
  | 'invalid_password'
  | 'missing_config'
  | 'network_error'
  | 'oauth_cancelled'
  | 'session_expired';

export class AuthServiceError extends Error {
  code: AuthServiceErrorCode;

  constructor(code: AuthServiceErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function assertSupabaseConfigured() {
  if (!isSupabaseConfigured) {
    throw new AuthServiceError(
      'missing_config',
      'Missing EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your local environment.',
    );
  }
}

function toAuthServiceError(error: AuthError | Error | null): AuthServiceError {
  const message = error?.message || 'Authentication failed.';
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('already registered') || normalizedMessage.includes('already exists')) {
    return new AuthServiceError('email_exists', message);
  }

  if (normalizedMessage.includes('email not confirmed')) {
    return new AuthServiceError('email_not_confirmed', message);
  }

  if (normalizedMessage.includes('invalid login') || normalizedMessage.includes('invalid credentials')) {
    return new AuthServiceError('invalid_credentials', message);
  }

  if (normalizedMessage.includes('password')) {
    return new AuthServiceError('invalid_password', message);
  }

  if (normalizedMessage.includes('network') || normalizedMessage.includes('fetch')) {
    return new AuthServiceError('network_error', message);
  }

  return new AuthServiceError('network_error', message);
}

function getOAuthParamsFromUrl(url: string) {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  const hashParams = new URLSearchParams(parsedUrl.hash.replace(/^#/, ''));

  hashParams.forEach((value, key) => {
    params.set(key, value);
  });

  return params;
}

async function createSessionFromUrl(url: string) {
  const params = getOAuthParamsFromUrl(url);
  const errorCode = params.get('error_code');
  const errorDescription = params.get('error_description');
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (errorCode) {
    throw new AuthServiceError('network_error', errorDescription || errorCode);
  }

  if (!accessToken || !refreshToken) {
    throw new AuthServiceError('network_error', 'Google sign-in did not return a Supabase session.');
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    throw toAuthServiceError(error);
  }

  return data.session;
}

export async function signInWithEmail(email: string, password: string) {
  assertSupabaseConfigured();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
  });

  if (error) {
    throw toAuthServiceError(error);
  }

  return data;
}

export async function signUpWithEmail({ email, password, name }: { email: string; password: string; name: string }) {
  assertSupabaseConfigured();

  const { data, error } = await supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
    options: {
      data: {
        display_name: name.trim(),
      },
    },
  });

  if (error) {
    throw toAuthServiceError(error);
  }

  return data;
}

export async function resetPasswordForEmail(email: string) {
  assertSupabaseConfigured();

  const redirectTo = process.env.EXPO_PUBLIC_SUPABASE_PASSWORD_RESET_REDIRECT_URL || undefined;
  const { data, error } = await supabase.auth.resetPasswordForEmail(normalizeEmail(email), { redirectTo });

  if (error) {
    throw toAuthServiceError(error);
  }

  return data;
}

export async function signInWithGoogle() {
  assertSupabaseConfigured();

  const redirectTo = makeRedirectUri({
    scheme: 'meikan',
    path: 'auth/callback',
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    throw toAuthServiceError(error);
  }

  if (!data.url) {
    throw new AuthServiceError('network_error', 'Google sign-in URL was not created.');
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (result.type !== 'success') {
    throw new AuthServiceError('oauth_cancelled', 'Google sign-in was cancelled.');
  }

  return createSessionFromUrl(result.url);
}

export async function updateEmail(email: string) {
  assertSupabaseConfigured();

  const { data, error } = await supabase.auth.updateUser({ email: normalizeEmail(email) });

  if (error) {
    throw toAuthServiceError(error);
  }

  return { email: data.user.email ?? normalizeEmail(email) };
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  assertSupabaseConfigured();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    throw new AuthServiceError('session_expired', 'Session expired');
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    throw new AuthServiceError('invalid_password', signInError.message);
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    throw toAuthServiceError(error);
  }

  return { updated: true };
}

export async function signOut() {
  assertSupabaseConfigured();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw toAuthServiceError(error);
  }

  return { signed_out: true };
}

export async function linkOAuthProvider(provider: OAuthProvider) {
  return Promise.resolve({ provider, linked: true });
}

export async function unlinkOAuthProvider(provider: OAuthProvider) {
  return Promise.resolve({ provider, linked: false });
}
