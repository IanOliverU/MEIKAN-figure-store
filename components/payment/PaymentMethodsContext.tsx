import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { PaymentCardBrand, SavedPaymentCard } from './PaymentCard';
import { SavedWallet, WalletProvider } from './WalletCard';

type AddCardInput = {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  billingAddress?: string;
};

type PaymentMethodsContextValue = {
  cards: SavedPaymentCard[];
  wallets: SavedWallet[];
  addCard: (input: AddCardInput) => SavedPaymentCard;
  removeCard: (cardId: string) => void;
  setDefaultCard: (cardId: string) => void;
  linkWallet: (provider: WalletProvider) => void;
  unlinkWallet: (provider: WalletProvider) => void;
};

const PaymentMethodsContext = createContext<PaymentMethodsContextValue | null>(null);

const initialCards: SavedPaymentCard[] = [
  {
    id: 'visa-4291',
    type: 'Visa',
    last4: '4291',
    expiry: '09/27',
    isDefault: true,
    cardholderName: 'Juan dela Cruz',
    billingAddress: 'Blk 5 Lot 12 Sampaguita St, San Jose del Monte',
    country: 'Philippines',
  },
  {
    id: 'mastercard-8414',
    type: 'Mastercard',
    last4: '8414',
    expiry: '03/26',
    isDefault: false,
    cardholderName: 'Juan dela Cruz',
    billingAddress: 'Unit 4B Chino Roces Ave, Makati City',
    country: 'Philippines',
  },
];

const initialWallets: SavedWallet[] = [
  {
    id: 'gcash',
    provider: 'GCash',
    linked: true,
    number: '+63 917 \u2022\u2022\u2022 3427',
  },
  {
    id: 'maya',
    provider: 'Maya',
    linked: false,
  },
];

function inferBrand(cardNumber: string): PaymentCardBrand {
  const compact = cardNumber.replace(/\D/g, '');
  return compact.startsWith('5') ? 'Mastercard' : 'Visa';
}

export function PaymentMethodsProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<SavedPaymentCard[]>(initialCards);
  const [wallets, setWallets] = useState<SavedWallet[]>(initialWallets);

  const value = useMemo<PaymentMethodsContextValue>(
    () => ({
      cards,
      wallets,
      addCard: (input) => {
        const compactNumber = input.cardNumber.replace(/\D/g, '');
        const newCard: SavedPaymentCard = {
          id: `mock-card-${Date.now()}`,
          type: inferBrand(compactNumber),
          last4: compactNumber.slice(-4),
          expiry: input.expiry,
          isDefault: cards.length === 0,
          cardholderName: input.cardholderName,
          billingAddress: input.billingAddress?.trim() || 'No billing address added',
          country: 'Philippines',
        };

        setCards((currentCards) => [...currentCards, newCard]);
        return newCard;
      },
      removeCard: (cardId) => {
        setCards((currentCards) => {
          const removedCard = currentCards.find((card) => card.id === cardId);
          const remainingCards = currentCards.filter((card) => card.id !== cardId);

          if (!removedCard?.isDefault || remainingCards.length === 0) {
            return remainingCards;
          }

          return remainingCards.map((card, index) => ({ ...card, isDefault: index === 0 }));
        });
      },
      setDefaultCard: (cardId) => {
        setCards((currentCards) => currentCards.map((card) => ({ ...card, isDefault: card.id === cardId })));
      },
      linkWallet: (provider) => {
        setWallets((currentWallets) =>
          currentWallets.map((wallet) =>
            wallet.provider === provider
              ? { ...wallet, linked: true, number: '+63 917 \u2022\u2022\u2022 0000', linkFailed: false }
              : wallet,
          ),
        );
      },
      unlinkWallet: (provider) => {
        setWallets((currentWallets) =>
          currentWallets.map((wallet) =>
            wallet.provider === provider ? { ...wallet, linked: false, number: undefined, linkFailed: false } : wallet,
          ),
        );
      },
    }),
    [cards, wallets],
  );

  return <PaymentMethodsContext.Provider value={value}>{children}</PaymentMethodsContext.Provider>;
}

export function usePaymentMethods() {
  const context = useContext(PaymentMethodsContext);

  if (!context) {
    throw new Error('usePaymentMethods must be used within PaymentMethodsProvider');
  }

  return context;
}
