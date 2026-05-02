import { Text, View } from 'react-native';

type CheckoutSummaryProps = {
  itemCount: number;
  itemsTotal: number;
  shipping: number;
  importFee: number;
  total: number;
};

const PESO = '\u20b1';
const formatPrice = (value: number) => `${PESO}${value.toLocaleString('en-US')}`;

function SummaryRow({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className={highlight ? 'text-base font-semibold text-white' : 'text-sm text-[#A1A1A1]'}>{label}</Text>
      <Text className={highlight ? 'text-base font-semibold text-white' : 'text-sm text-[#A1A1A1]'}>
        {formatPrice(value)}
      </Text>
    </View>
  );
}

export function CheckoutSummary({ itemCount, itemsTotal, shipping, importFee, total }: CheckoutSummaryProps) {
  return (
    <View className="rounded-2xl border border-[#222222] bg-[#121212] p-4">
      <Text className="text-base font-semibold text-white">Order summary</Text>
      <View className="mt-4 gap-3">
        <SummaryRow label={`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`} value={itemsTotal} />
        <SummaryRow label="Shipping (JP -> PH)" value={shipping} />
        <SummaryRow label="Import fee (est.)" value={importFee} />
      </View>
      <View className="my-4 h-px bg-[#2A2A2A]" />
      <SummaryRow label="Total" value={total} highlight />
    </View>
  );
}
