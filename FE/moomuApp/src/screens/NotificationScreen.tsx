import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';
import Button1 from '../components/button1';
import Button2 from '../components/button2';
import { Notification } from '../components/notification';
import instance from '../api/axios';

type NotificationScreenProps = StackScreenProps<
  RootStackParamList,
  'Notification'
>;

const pressNotification = (notification: any) => {
  console.log('pressNotification');
  console.log(notification.alarm_type, notification.target_id);
};

const NotificationScreen: React.FC<NotificationScreenProps> = (props) => {
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    instance.get('alarms?page=0').then((res) => {
      console.log(res.data.items[0]);
      setNotifications(res.data.items);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Logo3 content="notification" />
      <ScrollView style={styles.notificationListContainer}>
        {notifications.length > 0 ? (
          notifications.map((notification: any) => (
            <Notification
              key={notification.id}
              item={notification}
              onPress={() => pressNotification(notification)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>알림이 없습니다.</Text>
        )}
      </ScrollView>
      <View style={{ marginBottom: 60 }}>
        <Button1 text="목록 지우기" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  notificationListContainer: {
    marginTop: 20,
    overflow: 'hidden',
    width: '90%',
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    color: '#A0AEC0',
  },
});

export default NotificationScreen;
