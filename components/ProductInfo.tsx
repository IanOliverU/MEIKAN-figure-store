import { Text, View } from 'react-native';

export type ProductStatus = 'INSTOCK' | 'PREORDER' | 'SOLDOUT';

type ProductInfoProps = {
  brand: string;
  name: string;
  series: string;
  status: ProductStatus;
};

const statusStyles = {
  INSTOCK: {
    label: 'In Stock',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    color: '#34D399',
  },
  PREORDER: {
    label: 'Pre-order',
    borderColor: 'rgba(198, 169, 107, 0.4)',
    backgroundColor: 'rgba(198, 169, 107, 0.1)',
    color: '#C6A96B',
  },
  SOLDOUT: {
    label: 'Sold Out',
    borderColor: '#3A3A3A',
    backgroundColor: '#1A1A1A',
    color: '#A1A1A1',
  },
};

export function ProductInfo({ brand, name, series, status }: ProductInfoProps) {
  const badge = statusStyles[status];

  return (
    <View className="flex-row items-start justify-between gap-4">
      <View className="flex-1">
        <Text className="text-[11px] font-semibold uppercase tracking-wide text-[#C6A96B]">{brand}</Text>
        <Text className="mt-2 text-2xl font-semibold leading-7 text-white" numberOfLines={2}>
          {name}
        </Text>
        <Text className="mt-2 text-sm text-[#A1A1A1]" numberOfLines={1}>
          {series}
        </Text>
      </View>
      <View
        className="rounded-md border px-2.5 py-1"
        style={{ borderColor: badge.borderColor, backgroundColor: badge.backgroundColor }}
      >
        <Text className="text-xs font-semibold" style={{ color: badge.color }}>
          {badge.label}
        </Text>
      </View>
    </View>
  );
}
