import React, {useState}from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import Button1 from '../components/button1';
import axios from "../api/axios";
import requests from "../api/requests";
import jwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import * as AsyncStorage from "../utiles/AsyncService"; // 로컬 저장을 위한 AsyncStorage 사용 함수
import * as RootNavigation from '../../RootNavigation';

const Logout = () => {
      try {
        AsyncStorage.removeData("token");
        RootNavigation.navigate('Start');
        //  console.log("지워짐");
        } catch (error) {
        // console.log(error);
        }
      };

export default Logout;


// const logoutbutton = () => {
//     Alert.alert(
//       "로그아웃",
//       "정말로 로그아웃 하시겠습니까?",
//       [
//         {
//           text:"예",
//           onPress: () => console.log("확인"),
//         },
//         { 
//           text: "아니오", 
//           onPress: () => console.log("취소"),
//           style:"cancel",
//          }, 
//       ],
//       {cancelable:false}
//     );
//   }


