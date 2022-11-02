import React, {useEffect, useCallback} from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';
import useCachedResources from './src/utiles/useCachedResources';

// Pretendard : require('./assets/fonts/PretendardVariable.ttf')

const App = () => {

  const navigationRef = useNavigationContainerRef();

  const isLoaded = useCachedResources();

  if (isLoaded) {
    return (
      <NavigationContainer ref={navigationRef}>
        <StackNavigator/>
      </NavigationContainer>
    );
  } else {
    return null;
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;