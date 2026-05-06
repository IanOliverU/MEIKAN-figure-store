import { StyleSheet, Text, View } from 'react-native';

export function SplashTagline() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authentic · Direct from Japan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 52,
    left: 0,
    alignItems: 'center',
  },
  text: {
    color: '#2A2A2A',
    fontSize: 11,
    letterSpacing: 0.7,
  },
});
