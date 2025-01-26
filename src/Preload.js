import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { PaperProvider } from 'react-native-paper';

export default function Preload() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
