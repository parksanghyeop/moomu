import React, { useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Platform,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import Button1 from '../components/button1';
import axios from '../api/axios';
import requests from '../api/requests';
import jwtDecode from 'jwt-decode';
import * as AsyncStorage from '../utiles/AsyncService'; // 로컬 저장을 위한 AsyncStorage 사용 함수

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as RootNavigation from '../../RootNavigation';
import { SimpleInput } from '../components/common/SimpleInput';

const Login = (props: any) => {
    // 아이디
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 로그인 버튼 onPress
    const loginbutton = () => {
        axios
            .post(
                requests.login,
                {
                    username: username,
                    password: password,
                },
                {
                    headers: { 'Content-Type': `application/json` },
                }
            )
            .then((response) => {
                //console.log(response);
                const token = response.data.access_token;
                AsyncStorage.storeData('token', token);
                const decoded = jwtDecode(token);
                // console.log(decoded);

                RootNavigation.reset('Main');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    return (
        <View style={styles.container3}>
            <SimpleInput
                placeholder="아이디"
                value={username}
                onChangeText={(t) => setUsername(t)}
            ></SimpleInput>
            <SimpleInput
                placeholder="비밀번호"
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry
            ></SimpleInput>
            <Button1
                text={'로그인'}
                onPress={loginbutton}
                disabled={!(username && password)}
            ></Button1>
        </View>
    );
};

const styles = StyleSheet.create({
    container3: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    input: {
        width: 219,
        height: 37,
        borderBottomColor: '#63B3ED',
        borderBottomWidth: 1,
    },
});

export default Login;
