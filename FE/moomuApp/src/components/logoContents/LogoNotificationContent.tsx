import React from 'react';
import { StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from '../../../RootNavigation';

const LogoNotificationContent = (props: any) => {
  return (
    <Text
      style={styles.logoContent}
      onPress={() => {
        RootNavigation.navigate('Notification');
      }}
    >
      <FontAwesome name="bell-o" size={14} />
      &nbsp;
      <Text>알림</Text>
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

export default LogoNotificationContent;
