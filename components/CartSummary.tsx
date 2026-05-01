import { Text, View } from 'react-native';

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  importFee: number;
  total: number;
};

const formatPrice = (value: number) => `₱${value.toLocaleString('en-US')}`;

function SummaryRow({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className={highlight ? 'text-base font-semibold text-white' : 'text-sm font-medium text-[#A1A1A1]'}>
        {label}
      </Text>
      <Text className={highlight ? 'text-base font-semibold text-white' : 'text-sm text-[#A1A1A1]'}>
        {formatPrice(value)}
      </Text>
    </View>
  );
}

export function CartSummary({ subtotal, shipping, importFee, total }: CartSummaryProps) {
  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <View className="gap-3">
        <SummaryRow label="Subtotal" value={subtotal} />
        <SummaryRow label="Shipping (JP → PH)" value={shipping} />
        <SummaryRow label="Import fee (est.)" value={importFee} />
      </View>

      <View className="my-4 h-px bg-[#2A2A2A]" />

      <SummaryRow label="Total" value={total} highlight />
    </View>
  );
}
