import React, { useState } from 'react';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import LoginSingUpScreen from '../screens/LoginSingUpScreen';
import BusScreen from '../screens/BusScreen';
import BusMapScreen from '../screens/BusMapScreen';
import StationScreen from '../screens/StationScreen';
import MainScreen from '../screens/MainScreen';
import { RootStackParamList } from '../types/StackNavigation';
import FaqScreen from '../screens/FaqScreen';
import InformationDetailScreen from '../screens/InformationDetailScreen';
import InformationScreen from '../screens/InformationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingScreen from '../screens/SettingScreen';
import FaqDetailScreen from '../screens/FaqDetailScreen';
import SplashScreen from '../screens/Splashscreen';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
            }}
            initialRouteName="Splash"
        >
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Start"
                component={StartScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LoginSignUp"
                component={LoginSingUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Bus"
                component={BusScreen}
                options={{ title: '노선조회' }}
            />
            <Stack.Screen
                name="FAQ"
                component={FaqScreen}
                options={{ title: '건의사항' }}
            />
            <Stack.Screen
                name="FaqDetail"
                component={FaqDetailScreen}
                options={{ title: '건의사항' }}
            />
            <Stack.Screen
                name="Information"
                component={InformationScreen}
                options={{ title: '공지사항' }}
            />
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BusMap"
                component={BusMapScreen}
                options={{ title: '노선정보' }}
            />
            <Stack.Screen
                name="Station"
                component={StationScreen}
                options={({ route }) => ({
                    title: route.params.stationName,
                })}
            />
            <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ title: '알림' }}
            />
            <Stack.Screen
                name="Setting"
                component={SettingScreen}
                options={{ title: '개인정보 관리' }}
            />
            <Stack.Screen
                name="InformationDetail"
                component={InformationDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
