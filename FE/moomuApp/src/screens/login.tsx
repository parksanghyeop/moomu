import React, {useState}from 'react';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import Button1 from '../components/button1';
import axios from "../api/axios";
import requests from "../api/requests";
import * as AsyncStorage from "../utiles/AsyncService"; // 로컬 저장을 위한 AsyncStorage 사용 함수

const Login = ( navigation : any, route : any) => {

  // 아이디 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 onPress
  const loginbutton = () => {
    axios.post(requests.login,{
      username : username,
      password : password,
    }, {
      headers : {"Content-Type": `application/json`}
    })
    .then((response) => {
      const token = response.data.result;
      AsyncStorage.storeData("token",token);
      navigation.navigate('main');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container3}>
      <TextInput style={styles.input} placeholder='아이디' onChangeText={(text) => setUsername(text)}></TextInput>
      <TextInput style={styles.input} placeholder='비밀번호' onChangeText={(text) => setPassword(text)}></TextInput>
      <Button1 text={'로그인'} onPress={loginbutton} ></Button1>
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    flex:1,
    margin: 10,
  },
  input: {
    width: 219,
    height: 37,
    borderBottomColor: "#63B3ED",
    borderBottomWidth: 1,
  },
});

export default Login;