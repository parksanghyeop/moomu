import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from '../components/footer';
import Button2 from '../components/button2';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';

import * as RootNavigation from '../../RootNavigation';

type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;

const MainScreen: React.FC<MainScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Logo3 content="main" navigation={props.navigation} />
      <Text style={styles.text1}>김싸피</Text>
      <Button2
        text={'노선조회'}
        onPress={() => {
          RootNavigation.navigate('Bus');
        }}
      />
      <Button2
        text={'공지사항'}
        onPress={() => {
          RootNavigation.navigate('Information');
        }}
      />
      <Button2
        text={'FAQ'}
        onPress={() => {
          RootNavigation.navigate('FAQ');
        }}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    // justifyContent: "center",
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
    width: 220,
    height: 21,

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
  },
});

export default MainScreen;
