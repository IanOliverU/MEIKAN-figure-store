import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const COLORS = {
  bg: '#0f0f0f',
  surface: '#1a1a1a',
  border: '#2a2a2a',
  borderInner: '#1e1e1e',
  gold: '#c8a96e',
  goldDim: '#c8a96e44',
  goldBg: '#2a1f10',
  goldBorder: '#4a3010',
  text: '#f0ede8',
  textMuted: '#888',
  textDim: '#555',
  textDimmer: '#333',
  textGhost: '#222',
  green: '#5ec98a',
  greenBg: '#1e3a2a',
  greenBorder: '#2d5a3a',
  greenDim: '#2d5a3a',
  red: '#c0392b',
  redBg: '#2a0e0e',
  redBorder: '#6b1a1a',
};

export const FONTS = {
  heading: { fontSize: 21, fontWeight: '500' as const, color: COLORS.text },
  subhead: { fontSize: 13, color: COLORS.textDim },
  label: { fontSize: 10, color: '#444', letterSpacing: 0.8, textTransform: 'uppercase' as const },
  body: { fontSize: 13, color: '#e8e5e0' },
  caption: { fontSize: 11, color: COLORS.textDim },
  price: { fontSize: 24, fontWeight: '500' as const, color: COLORS.text },
};

type OrderConfirmationCardProps = {
  title: string;
  children: ReactNode;
};

export function OrderConfirmationCard({ title, children }: OrderConfirmationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 12,
  },
});
