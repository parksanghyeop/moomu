import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
//import Footer from '../components/footer';
import Button2 from '../components/button2';

let Logo = require('../../assets/Logo.png');

interface IProps {
  // navigation: any,
}

interface IState {
    text: string
}

export default class MainScreen extends Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            text: "100"
        }
    }

    render(){
        return (
          <View style={styles.container}>
              <Image style={styles.image} source={Logo}/>
              <Button2 text={'노선조회'} onPress={() => {console.log('pressed')}}></Button2>
              <Button2 text={'공지사항'}></Button2>
              <Button2 text={'F&Q'}></Button2>
              {/* <Footer /> */}
          </View>
        )
    }
}

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
      fontSize: 12,
      lineHeight: 21,
      textAlign: 'center',

      /* BLUE 500 */
      color: '#3182CE',
    },
    image: {
      width: 160,
      height: 160,
      resizeMode: 'contain',
    }
  });
