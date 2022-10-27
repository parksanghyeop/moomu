import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  text: string | number;
  disabled?: boolean;
  onPress?: () => void;
};

const Button2 = ({
  text,
  onPress = () => null,
  disabled = false,
}: Props) => {
  
  return (
    <LinearGradient
    colors={['#3182CE','#4BC9FF']}
    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
    style={styles.gradient}>
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient:{
    width: 220,
    height: 39,
    alignItems: 'center', 
    justifyContent: 'center',
    margin:15,
  },
  button: {
    width: 218,
    height: 37,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: 'Pretendard Variable',
    fontStyle: 'normal',
    fontWeight: '100',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',

    /* BLUE 500 */
    color: '#3182CE',
  }
});

export default Button2;