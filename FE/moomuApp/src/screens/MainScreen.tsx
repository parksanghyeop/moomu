import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Footer from '../components/footer';
import Button2 from '../components/button2';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation";

let Logo = require('../../assets/Logo.png');

type MainScreenProps = StackScreenProps<RootStackParamList, "Main">; 

const MainScreen: React.FC<MainScreenProps> = (props)  => {
        return (
          <View style={styles.container}>
              <Image style={styles.image} source={Logo}/>
              <Text style={styles.text1}>김싸피</Text> 
              <Text style={styles.text1}>소속</Text> 
              <Text style={styles.text1}>최근노선</Text> 
              <Button2 text={'노선조회'} onPress={() =>  {props.navigation.navigate('BusSearch')}} />
              <Button2 text={'공지사항'} onPress={() => {props.navigation.navigate('Information')}}/>
              <Button2 text={'FAQ'} onPress={() => {props.navigation.navigate('FAQ')}}/>
              <Footer />
          </View>
        )
    }

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

  export default MainScreen;