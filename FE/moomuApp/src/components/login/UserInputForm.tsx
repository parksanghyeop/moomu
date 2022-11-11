import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Alert,
    Text,
    Platform,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Modal,
    Pressable,
    KeyboardAvoidingView,
} from 'react-native';
import Button1 from '../button1';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from '../../api/axios';
import { useHeaderHeight } from '@react-navigation/elements';
import instance from '../../api/axios';

export const UserInputForm = (props: { isLogin: boolean }) => {
    const { isLogin } = props;
    const height = useHeaderHeight();

    // 전환 애니메이션
    const exposure = useSharedValue(isLogin ? 0 : 140);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            overflow: 'hidden',
            height: withTiming(exposure.value),
            marginBottom: 8,
        };
    });
    useEffect(() => {
        exposure.value = isLogin ? 0 : 140;
    }, [isLogin]);

    // 입력값
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pwcheck, setPWCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [region, setRegion] = useState<{
        name: string;
        id: number;
    }>();
    const [group, setGroup] = useState<number>();

    // 지역 정보
    const [regions, setRegions] = useState<
        {
            name: string;
            id: number;
        }[]
    >([]);
    // 지역 받아오기
    useEffect(() => {
        axios
            .get(requests.regions)
            .then((response) => {
                setRegions(response.data);
                console.log('[로그인] 지역정보 조회 성공.');
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // 지역 모달
    const [modalVisible, setModalVisible] = useState(false);

    // 로그인 요청
    const loginFunc = () => {
        if (username && password) {
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
                    console.log('[로그인] 로그인 성공');
                    const token = response.data.access_token;
                    AsyncStorage.storeData('token', token);
                    const decoded = jwtDecode(token);

                    if (Device.isDevice) {
                        // 실제 장치일 경우에만
                        registerForPushNotificationsAsync().then(
                            (expo_token) => {
                                AsyncStorage.storeData('expoToken', expo_token);

                                AsyncStorage.getData('expoToken').then(
                                    (expo_token) => {
                                        // console.log('expoToken', expoToken);
                                        // 푸시알림 토큰 서버에 저장
                                        console.log(
                                            'asyncStore 엑스포토큰',
                                            expo_token
                                        );
                                        instance
                                            .post(
                                                requests.expo_token,
                                                {
                                                    expo_token: expo_token,
                                                },
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                        'Content-Type': `application/json`,
                                                    },
                                                }
                                            )
                                            .then((response) => {
                                                console.log(
                                                    '토큰 서버에 저장 완료'
                                                );
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    }
                                );
                            }
                        );
                    }

                    RootNavigation.resetDefault('Main');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Alert.alert('', '아이디와 패스워드를 입력해주세요.');
        }
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

    // 회원 등록 버튼 onPress
    const signupFunc = () => {
        axios
            .post(
                requests.register,
                {
                    username: username,
                    password: password,
                    nickname: nickname,
                    region_id: region?.id,
                    class_group: group,
                },
                {
                    headers: { 'Content-Type': `application/json` },
                }
            )
            .then((response) => {
                // console.log('회원가입성공');
                Alert.alert(
                    // 말그대로 Alert를 띄운다
                    '회원 등록 완료', // 첫번째 text: 타이틀 제목
                    nickname + '님 감사합니다.', // 두번째 text: 그 밑에 작은 제목
                    [
                        // 버튼 배열
                        {
                            text: '확인', // 버튼 제목
                            onPress: () => console.log('확인'), //onPress 이벤트시 콘솔창에 로그를 찍는다
                        },
                    ],
                    { cancelable: false }
                );
                RootNavigation.reset('LoginSignUp', { id: 1 });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 8,
            }}
            enabled>
            {/* 입력 */}
            <SimpleInput
                placeholder="아이디"
                value={username}
                onChangeText={(t) => setUsername(t)}></SimpleInput>
            <SimpleInput
                placeholder="비밀번호"
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry></SimpleInput>

            {/* 회원가입시에만 입력 */}
            <Animated.View style={[animatedStyles]}>
                <SimpleInput
                    placeholder="비밀번호 확인"
                    value={pwcheck}
                    onChangeText={(t) => setPWCheck(t)}
                    secureTextEntry></SimpleInput>
                <SimpleInput
                    placeholder="이름"
                    value={nickname}
                    onChangeText={(t) => setNickname(t)}></SimpleInput>
                <View style={[{ flexDirection: 'row' }]}>
                    <Pressable onPress={() => setModalVisible((b) => !b)}>
                        <SimpleInput
                            placeholder="지역"
                            value={region?.name}
                            style={{ width: 100, height: 38, marginRight: 20 }}
                            editable={false}></SimpleInput>
                    </Pressable>
                    <SimpleInput
                        placeholder="반"
                        keyboardType="number-pad"
                        value={group ? group.toString() : ''}
                        onChangeText={(t) => setGroup(parseInt(t))}
                        style={{ width: 100, height: 38 }}></SimpleInput>
                </View>
            </Animated.View>

            {/* 버튼 */}
            {isLogin ? (
                <Button1
                    text={'로그인'}
                    onPress={loginFunc}
                    // disabled={!(username && password)}
                ></Button1>
            ) : (
                <Button1
                    text={'회원가입'}
                    onPress={signupFunc}
                    disabled={!(username && password)}></Button1>
            )}

            {/* 모달 */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                style={{ width: 200 }}>
                <Pressable
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#000000bb',
                    }}
                    onPress={() => setModalVisible((b) => !b)}>
                    <View
                        style={{
                            width: 220,
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderColor: '#0BC5EA',
                            borderWidth: 1,
                        }}>
                        {regions.map((item, idx) => (
                            <Pressable
                                key={idx}
                                style={{
                                    height: 40,
                                    width: '100%',
                                    borderBottomColor: '#0BC5EA',
                                    borderBottomWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                    setRegion(item);
                                    setModalVisible((b) => !b);
                                }}>
                                <Text>{item.name}</Text>
                            </Pressable>
                        ))}
                        <View>
                            <Pressable
                                style={{
                                    height: 40,
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => setModalVisible((b) => !b)}>
                                <Text>닫기</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </KeyboardAvoidingView>
    );
};
