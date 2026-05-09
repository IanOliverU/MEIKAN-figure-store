export const appInfo = {
  name: 'MEIKAN',
  version: '1.0.0',
  build: 'MVP',
  environment: 'Development',
  websiteUrl: '',
  instagramUrl: '',
  twitterUrl: '',
  facebookUrl: '',
};

export type LegalInfoId = 'terms' | 'privacy' | 'licenses';

export const legalInfo: Record<
  LegalInfoId,
  {
    title: string;
    lastUpdated: string;
    content: string[];
  }
> = {
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'May 10, 2026',
    content: [
      'These mock terms describe how MEIKAN may present shopping, pre-order, wishlist, and account features in a future production release.',
      'Purchases, payments, shipping estimates, and account services are placeholders in this local build until real backend services are connected.',
      'Future production terms should be reviewed with legal counsel before launch.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'May 10, 2026',
    content: [
      'This mock privacy policy explains the intended direction for account, profile, shopping preference, and notification data handling.',
      'The current app uses local mock state for settings flows. No external analytics, social links, or backend persistence are connected here.',
      'Future production privacy details should cover Supabase data storage, authentication, device tokens, support requests, and account deletion.',
    ],
  },
  licenses: {
    title: 'Licenses',
    lastUpdated: 'May 10, 2026',
    content: [
      'MEIKAN uses open-source libraries from the Expo and React Native ecosystem in this local build.',
      'A production licenses screen can later generate package notices from installed dependencies.',
      'Anime figure product names, characters, and brand references should remain attributed to their respective rights holders.',
    ],
  },
};
