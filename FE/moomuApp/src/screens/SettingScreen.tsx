import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';
import Button1 from '../components/button1';
import Footer from '../components/footer';
import * as RootNavigation from '../../RootNavigation';
import axios from '../api/axios';
import Withdraw from './withdraw';

type SettingScreenProps = StackScreenProps<RootStackParamList, 'Setting'>;

const SettingScreen: React.FC<SettingScreenProps> = (props) => {
    return (
        <View style={styles.container}>
            <View
                style={[
                    {
                        width: '70%',
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 50,
                    },
                ]}
            >
                <Logo3 content="setting" />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>개인정보 관리</Text>
                </View>
                <View style={{ marginBottom: 60 }}>
                    <Button1
                        text={'회원탈퇴'}
                        onPress={() => {
                            Alert.alert(
                                '회원탈퇴',
                                '정말로 탈퇴 하시겠습니까?',
                                [
                                    {
                                        text: '예',
                                        onPress: () => Withdraw(),
                                        // console.log("확인"),
                                    },
                                    {
                                        text: '아니오',
                                        onPress: () =>
                                            RootNavigation.navigate('Setting'),
                                        style: 'cancel',
                                    },
                                ],
                                { cancelable: false }
                            );
                        }}
                    />
                </View>
                <View style={{ marginBottom: 60 }}>
                    <Button1
                        text={'메인화면'}
                        onPress={() => RootNavigation.goBack()}
                    />
                </View>
                <Footer />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    image: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#63B3ED',
        width: '100%',
        margin: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        color: '#63B3ED',
    },
    listText: {
        fontSize: 20,
        color: '#63B3ED',
        paddingVertical: 4,
    },
    input: {
        width: 219,
        height: 37,
        borderBottomColor: '#63B3ED',
        borderBottomWidth: 1,
    },
});

export default SettingScreen;
