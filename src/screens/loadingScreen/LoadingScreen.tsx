import {SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {styles} from './styles';

export default function LoadingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </SafeAreaView>
  );
}
