import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Platform,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import Button1 from '../button1';
import axios from '../../api/axios';
import requests from '../../api/requests';
import jwtDecode from 'jwt-decode';
import * as AsyncStorage from '../../utiles/AsyncService'; // 로컬 저장을 위한 AsyncStorage 사용 함수

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as RootNavigation from '../../../RootNavigation';
import { SimpleInput } from '../common/SimpleInput';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export const UserInputForm = (props: { isLogin: boolean }) => {
    const { isLogin } = props;

    const exposure = useSharedValue(isLogin ? 0 : 80);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            overflow: 'hidden',
            height: withTiming(exposure.value),
        };
    });

    useEffect(() => {
        exposure.value = isLogin ? 0 : 120;
    }, [isLogin]);

    // 입력값
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pwcheck, setPWCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [region, setRegion] = useState<number>();
    const [group, setGroup] = useState<number>();

    // 지역 정보
    const [regions, setRegions] = useState<
        {
            name: string;
            id: number;
        }[]
    >([]);

    // 로그인 요청
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
                const token = response.data.access_token;
                AsyncStorage.storeData('token', token);
                const decoded = jwtDecode(token);

                RootNavigation.navigate('Main');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
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
            <Animated.View style={[animatedStyles]}>
                <SimpleInput
                    placeholder="비밀번호 확인"
                    value={pwcheck}
                    onChangeText={(t) => setPWCheck(t)}
                    secureTextEntry
                ></SimpleInput>
                <SimpleInput
                    placeholder="이름"
                    value={nickname}
                    onChangeText={(t) => setNickname(t)}
                ></SimpleInput>
            </Animated.View>
            <Button1
                text={'로그인'}
                onPress={loginbutton}
                disabled={!(username && password)}
            ></Button1>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
