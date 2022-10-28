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
import * as AsyncStorage from "../utiles/AsyncService"; // 로컬 저장을 위한 AsyncStorage 사용 함수

type LoginSignUpScreenProps = StackScreenProps<RootStackParamList, "LoginSignUp">;

const LoginSignUpScreen: React.FC<LoginSignUpScreenProps> = (props) => {
  // 화면 렌더링시 로그인인지 회원가입인지 확인
  const[condition, setCondition] = useState(props.route.params.id == 1 ? true : false);
  // const[condition, setCondition] = useState(false);
  const toggle = () => setCondition(!condition);

  const renderConditionInput = condition ? 
    <Login/>
    : 
    <SignUp />

  return (
    <View style={styles.container}>
        <View style={[{flex:1,alignItems:'center', marginTop:100}]}>
          <Logo2 />
        </View>
      <View style={styles.container2}>
        <Text style={[styles.text, {width:53,height:19}]}>LOGIN</Text>
        <Switch style={styles.toggle} onValueChange={toggle} value={condition}></Switch>
        <Text style={[styles.text, {width:72,height:15}]}>SIGN UP</Text>
      </View>
      {renderConditionInput}
      <View style={[{flex:0.5, alignItems: 'center'}]}>
        <Footer/>
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
    container2: {
      flexDirection: 'row',
      height: 40,
    },
    text: {
      fontFamily: 'Pretendard Variable',
      fontStyle: 'normal',
      fontWeight: '100',
      fontSize: 16,
      lineHeight: 19,
      textAlign: 'center',

      /* BLUE 500 */
      color: '#3182CE',
    },
    toggle:{
      
    },
  });

export default LoginSignUpScreen;