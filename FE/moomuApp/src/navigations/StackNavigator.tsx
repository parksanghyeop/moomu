import React from "react";
import { createStackNavigator,StackNavigationProp } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import LoginSingUpScreen from "../screens/LoginSingUpScreen";
import { RootStackParamList} from "../types/StackNavigation";


const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions = {{ headerShown: false }} initialRouteName="Start">
      <Stack.Screen name='Start' component={StartScreen}/>
      <Stack.Screen name='LoginSignUp' component={LoginSingUpScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;