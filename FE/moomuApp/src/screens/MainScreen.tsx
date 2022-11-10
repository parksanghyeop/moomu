import React, { Component, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Footer from '../components/footer';
import Button2 from '../components/button2';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';

import * as RootNavigation from '../../RootNavigation';
import Logout from './logout';
import * as AsyncStorage from '../utiles/AsyncService';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import jwtDecode from 'jwt-decode';
import instance from '../api/axios';

type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

let token: string;
let decoded: jwt;

interface jwt {
    exp: number;
    id: number;
    nickname: string;
    region: number;
    role: number;
}

const MainScreen: React.FC<MainScreenProps> = (props) => {
    const [user, setUser] = useState<jwt>();
    const [buses, setBuses] = useState<any>();

    useEffect(() => {
        AsyncStorage.getData('token').then((response) => {
            token = response;
            decoded = jwtDecode(token);
            setUser(decoded);
        });
        instance.get('/users/bus').then((response) => {
            let data = {
                commute: null,
                leave: null,
            };

            response.data.map((item: any) => {
                if (item.commute_or_leave === 'COMMUTE') {
                    data.commute = item.bus_name;
                } else {
                    data.leave = item.bus_name;
                }
            });
            setBuses(data);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
            <Logo3 content="main" navigation={props.navigation} />
            <View style={styles.usernameContainer}>
                <Text style={styles.usernameText}>{user?.nickname}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Feather
                        style={styles.iconContent}
                        name="settings"
                        onPress={() => {
                            RootNavigation.navigate('Setting');
                        }}
                    />
                    <AntDesign
                        style={styles.iconContent}
                        name="logout"
                        onPress={() => {
                            Alert.alert(
                                '로그아웃',
                                '정말로 로그아웃 하시겠습니까?',
                                [
                                    {
                                        text: '예',
                                        onPress: () => Logout(),
                                        // console.log("확인"),
                                    },
                                    {
                                        text: '아니오',
                                        onPress: () =>
                                            RootNavigation.navigate('Main'),
                                        style: 'cancel',
                                    },
                                ],
                                { cancelable: false }
                            );
                        }}
                    />
                </View>
            </View>
            {/* 누군가는 이걸 컴포넌트로 분리해주겠죠 */}
            <View style={styles.infoContainer}>
                <View style={styles.infoContentContainer}>
                    <Text style={styles.infoTitle}>소속</Text>
                    <Text style={styles.infoText}>대전 2반</Text>
                </View>
                <View style={styles.infoContentContainer}>
                    <Text style={styles.infoTitle}>승차 노선</Text>
                    <Text style={styles.infoText}>{buses?.commute}</Text>
                </View>
                <View style={styles.infoContentContainer}>
                    <Text style={styles.infoTitle}>하차 노선</Text>
                    <Text style={styles.infoText}>{buses?.leave}</Text>
                </View>
            </View>

            <Button2
                text={'노선조회'}
                onPress={() => {
                    RootNavigation.navigate('Bus');
                }}
            />
            <Button2
                text={'공지사항'}
                onPress={() => {
                    RootNavigation.navigate('Information');
                }}
            />
            <Button2
                text={'FAQ'}
                onPress={() => {
                    RootNavigation.navigate('FAQ');
                }}
            />
            <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 50,
        //  justifyContent: "center",
    },
    container2: {
        flexDirection: 'row',
        paddingTop: 30,
        margin: 20,
    },
    container3: {
        flexDirection: 'row',
        paddingTop: 30,
        margin: 20,
    },
    text: {
        position: 'absolute',
        width: 220,
        height: 21,
        top: 109,

        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '100',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',

        /* BLUE 500 */
        color: '#3182CE',
    },
    text1: {
        width: 220,
        height: 21,

        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '100',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',

        color: '#000000',
    },
    image: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    iconContent: {
        color: '#718096',
        textAlign: 'center',
        fontSize: 20,
        marginLeft: 10,
    },
    usernameContainer: {
        marginTop: 20,
        width: '65%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#63b3ed',
        paddingVertical: 10,
    },
    usernameText: {
        color: '#63b3ed',
        fontSize: 20,
    },
    infoContainer: {
        marginVertical: 20,
        width: '65%',
    },
    infoTitle: {
        fontSize: 20,
        color: '#718096',
    },
    infoText: {
        fontSize: 20,
        color: '#63b3ed',
    },
    infoContentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
});

export default MainScreen;
