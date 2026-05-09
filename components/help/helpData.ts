import type { SupportOptionKind } from './SupportOptionCard';

export type HelpFAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type HelpPolicy = {
  id: string;
  title: string;
  content: string[];
  updatedAt: string;
};

export type HelpSupportOption = {
  id: SupportOptionKind;
  title: string;
  subtitle: string;
  icon: 'chatbubble-ellipses-outline' | 'mail-outline' | 'cube-outline';
  badge?: string;
};

export const supportOptions: HelpSupportOption[] = [
  {
    id: 'chat',
    title: 'Live Chat',
    subtitle: 'Usually replies in a few minutes',
    icon: 'chatbubble-ellipses-outline',
    badge: 'Online',
  },
  {
    id: 'email',
    title: 'Email Support',
    subtitle: 'Send order or account questions',
    icon: 'mail-outline',
  },
  {
    id: 'orders',
    title: 'Track an Order',
    subtitle: 'View recent orders and shipping status',
    icon: 'cube-outline',
  },
];

export const faqs: HelpFAQ[] = [
  {
    id: 'shipping-time',
    question: 'How long does JP to PH shipping take?',
    answer: 'Standard JP to PH shipping usually takes 7-14 business days after the item reaches our warehouse.',
    category: 'Shipping',
  },
  {
    id: 'cancel-preorder',
    question: 'Can I cancel a pre-order?',
    answer: 'Pre-orders can be cancelled before the supplier confirms allocation. Confirmed allocations may be final.',
    category: 'Pre-orders',
  },
  {
    id: 'authentic-products',
    question: 'Are products authentic?',
    answer: 'Yes. MEIKAN only lists authentic figures sourced from official distributors and trusted JP partners.',
    category: 'Products',
  },
  {
    id: 'wallets',
    question: 'Do you accept GCash or Maya?',
    answer: 'GCash and Maya are supported as mock wallet options in this build. Real wallet processing is not connected yet.',
    category: 'Payments',
  },
  {
    id: 'damaged-figure',
    question: 'What happens if my figure arrives damaged?',
    answer: 'Contact support with photos of the box, figure, and shipping label so the team can review replacement options.',
    category: 'Returns',
  },
];

export const policies: HelpPolicy[] = [
  {
    id: 'shipping',
    title: 'Shipping Policy',
    updatedAt: 'May 10, 2026',
    content: [
      'MEIKAN provides estimated delivery windows based on supplier release schedules and courier timelines.',
      'Japan to Philippines shipments typically arrive within 7-14 business days after warehouse dispatch.',
      'Tracking updates are shown when available, but this mock build does not connect to live courier APIs.',
    ],
  },
  {
    id: 'preorder',
    title: 'Pre-order Policy',
    updatedAt: 'May 10, 2026',
    content: [
      'Pre-order dates may change based on manufacturer release schedules.',
      'Allocation and cancellation terms can vary by supplier and product type.',
      'MEIKAN will surface release and shipping estimates clearly once backend order data is connected.',
    ],
  },
  {
    id: 'returns',
    title: 'Return & Refund Policy',
    updatedAt: 'May 10, 2026',
    content: [
      'Damaged or incorrect items should be reported with photos and order details.',
      'Return eligibility depends on product condition, packaging, and supplier review.',
      'This mock screen is informational only and does not submit real return requests.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    updatedAt: 'May 10, 2026',
    content: [
      'MEIKAN account and order data will be handled securely once real backend services are connected.',
      'Payment details should be tokenized by a payment provider in a future integration.',
      'This prototype uses local mock data only and does not send personal information to a server.',
    ],
  },
];
