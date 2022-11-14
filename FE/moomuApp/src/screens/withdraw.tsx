import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button1 from '../components/button1';
import instance from '../api/axios';
import requests from '../api/requests';
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import * as AsyncStorage from '../utiles/AsyncService';
import * as RootNavigation from '../../RootNavigation';

const Withdraw = () => {
    instance
        .delete(requests.withdraw, {
            url: 'https://k7b202.p.ssafy.io/api/users/profile/delete',
        })
        .then((res) => {
            // console.log(res);
            RootNavigation.navigate('/');
            AsyncStorage.deleteData('token');
            AsyncStorage.deleteData('expoToken');

        })
        .catch((err) => {
            // console.log(err);
            alert('회원 탈퇴에 실패했습니다.')
        });
};

export default Withdraw;
