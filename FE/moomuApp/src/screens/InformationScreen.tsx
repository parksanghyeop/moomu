import React, {useState}from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Switch,
} from 'react-native';
import Footer from '../components/footer';
import Button1 from '../components/button1';
import 'react-native-gesture-handler';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation";
import {Logo2} from "../components/logo";
import axios from "../api/axios";
import requests from "../api/requests";
import Login from './login';
import SignUp from './signup';
import * as AsyncStorage from "../utiles/AsyncService"; 

type InformationScreenProps = StackScreenProps<RootStackParamList, "Information">;

const InformationScreen: React.FC<InformationScreenProps> = (props) => {
return (
    <View style={styles.container}>
        <View style={[{flex:1,alignItems:'center', marginTop:100}]}>
        <Logo2 />
        <Text style={styles.text1}>공지사항 페이지입니다.</Text> 
        <Footer/>
    </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor:'#fff',
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
    text1: {
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

    color: '#000000',
    },
    image: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    }
});

export default InformationScreen;