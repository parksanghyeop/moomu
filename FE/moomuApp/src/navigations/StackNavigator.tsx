import React from "react";
import { createStackNavigator,StackNavigationProp } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import LoginSingUpScreen from "../screens/LoginSingUpScreen";
import BusScreen from "../screens/BusScreen";
import BusMapScreen from "../screens/BusMapScreen";
import StationScreen from "../screens/StationScreen";
import MainScreen from "../screens/MainScreen";
import { RootStackParamList} from "../types/StackNavigation";


const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name='Start' component={StartScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='LoginSignUp' component={LoginSingUpScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Bus' component={BusScreen}/>
      <Stack.Screen name='Main' component={MainScreen}/>
      <Stack.Screen name='BusMap' component={BusMapScreen}/>
      <Stack.Screen name='Station' component={StationScreen}/>
    </Stack.Navigator>
  );
}

export default StackNavigator;