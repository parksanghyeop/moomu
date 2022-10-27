import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
// import Footer from '../../components/footer';
import Button1 from '../components/button1';
import 'react-native-gesture-handler';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation";

let Logo = require('../../../assets/images/Logo.png');

type StartScreenProps = StackScreenProps<RootStackParamList, "Start">;

const StartScreen: React.FC<StartScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>소중한, 당신의 시간을 위해</Text>          
      <Image style={styles.image} source={Logo}/>
      <Button1 text={'로그인'} onPress={() => {props.navigation.navigate('LoginSignUp')}} />
      <Button1 text={'회원 등록'} />
      {/* <Footer /> */}
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
      width: 264,
      height: 264,
      resizeMode: 'contain',
    },
  });

  export default StartScreen;