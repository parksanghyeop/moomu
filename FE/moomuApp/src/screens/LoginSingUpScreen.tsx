import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Footer from '../components/footer';
import 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo2 } from '../components/logo';
import Login from './login';
import SignUp from './signup';

type LoginSignUpScreenProps = StackScreenProps<
  RootStackParamList,
  'LoginSignUp'
>;

const LoginSignUpScreen: React.FC<LoginSignUpScreenProps> = (props) => {
  // 화면 렌더링시 로그인인지 회원가입인지 확인
  const [condition, setCondition] = useState(
    props.route.params.id == 1 ? true : false
  );
  // const[condition, setCondition] = useState(false);
  const toggle = () => setCondition(!condition);

  const renderConditionInput = condition ? (
    <Login />
  ) : (
    <SignUp condition={setCondition} />
  );

  return (
    <View style={styles.container}>
      <View style={[{ alignItems: 'center', marginTop: 100 }]}>
        <Logo2 />
      </View>
      <View style={styles.container2}>
        <Text style={[styles.text, { width: 53, height: 19 }]}>LOGIN</Text>
        <View
          style={{
            width: 41,
            height: 3,
            backgroundColor: '#63B3ED',
            marginTop: 5,
            marginLeft: 5,
          }}
        />
        <TouchableOpacity style={styles.circleLogin} onPress={toggle} />
        {/* <Switch style={styles.toggle} onValueChange={toggle} value={condition}></Switch> */}
        <Text style={[styles.text, { width: 72, height: 15 }]}>SIGN UP</Text>
      </View>
      {renderConditionInput}
      <Footer />
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
    paddingTop: 57,
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
  toggle: {},
  circleLogin: {
    right: 45,
    width: 16,
    height: 16,
    borderRadius: 100 / 2,
    backgroundColor: '#63B3ED',
  },
  circleSignup: {},
});

export default LoginSignUpScreen;
