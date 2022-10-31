import React, {useEffect, useCallback} from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';

// Pretendard : require('./assets/fonts/PretendardVariable.ttf')

const App = () => {
  const getFonts = async () => {
    await Font.loadAsync({
      Pretendard : require('./assets/fonts/PretendardVariable.ttf')
    })
  }

  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;