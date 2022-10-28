import * as Font from 'expo-font'; // 폰트
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  // 폰트 적용
  const getFonts = async () => {
    await Font.loadAsync({
      Pretendard : require('./assets/fonts/PretendardVariable.ttf')
    })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
