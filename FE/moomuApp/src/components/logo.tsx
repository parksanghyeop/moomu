import React from 'react';
import { StyleSheet,Image} from 'react-native';

let big = require('../../assets/images/Logo.png');
let small = require('../../assets/images/Logo2.jpg');

export const Logo = () => {
  return (
    <Image style={styles.big} source={big} />
  )
}

export const Logo2 = () => {
  return (
    <Image style={styles.small} source={small} />
  )
}

const styles = StyleSheet.create({
  big: {
    width: 264,
    height: 264,
    resizeMode: 'contain',
  },
  small: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
});