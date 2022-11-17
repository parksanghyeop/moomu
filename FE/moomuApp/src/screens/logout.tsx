import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button1 from '../components/button1';
import axios from '../api/axios';
import requests from '../api/requests';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import * as AsyncStorage from '../utiles/AsyncService'; // 로컬 저장을 위한 AsyncStorage 사용 함수
import * as RootNavigation from '../../RootNavigation';

const Logout = () => {
    try {
        AsyncStorage.removeData('token');
        AsyncStorage.getData('expoToken').then((token) => {
            console.log('expo_token before', token);
        });
        AsyncStorage.removeData('expoToken');
        AsyncStorage.getData('expoToken').then((token) => {
            console.log('expo_token after', token);
        });
        RootNavigation.navigate('Start');
        //  console.log("지워짐");
    } catch (error) {
        // console.log(error);
    }
};

export default Logout;
