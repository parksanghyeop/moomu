import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import LoginSingUpScreen from "../screens/LoginSingUpScreen";
import BusScreen from "../screens/BusScreen";
import BusMapScreen from "../screens/BusMapScreen";
import StationScreen from "../screens/StationScreen";
import MainScreen from "../screens/MainScreen";
import { RootStackParamList } from "../types/StackNavigation";
import FaqScreen from "../screens/FaqScreen";
import InformationDetailScreen from "../screens/InformationDetailScreen";
import InformationScreen from "../screens/InformationScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SettingScreen from "../screens/SettingScreen";

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Start"
        >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="LoginSignUp" component={LoginSingUpScreen} />
            <Stack.Screen name="Bus" component={BusScreen} />
            <Stack.Screen name="FAQ" component={FaqScreen} />
            <Stack.Screen name="Information" component={InformationScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
                name="BusMap"
                component={BusMapScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen name="Station" component={StationScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="InformationDetail" component={InformationDetailScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
