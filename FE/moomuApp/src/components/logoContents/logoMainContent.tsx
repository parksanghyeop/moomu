import React from 'react';
import { StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from '../../../RootNavigation';

const LogoMainContent = (props: any) => {
  return (
    <Text
      style={styles.logoContent}
      onPress={() => {
        console.log('clicked');
        RootNavigation.navigate('Notification');
      }}
    >
      <FontAwesome name="bell" size={14} /> 2
    </Text>
  );
};

const styles = StyleSheet.create({
  logoContent: {
    color: '#63B3ED',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default LogoMainContent;
