import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';

type NotificationScreenProps = StackScreenProps<
  RootStackParamList,
  'Notification'
>;

const NotificationScreen: React.FC<NotificationScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Logo3 content="notification" />
      <Text>NotificationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: "center",
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default NotificationScreen;
