import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { useAuth } from '../services/supabase/authContext';

export default function IndexRoute() {
  const { loading, session } = useAuth();

  if (loading) {
    return <View className="flex-1 bg-[#0A0A0A]" />;
  }

  return <Redirect href={(session ? '/(tabs)' : '/login') as never} />;
}
