import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Modal,
    Alert,
    Pressable,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';
import Button1 from '../components/button1';
import { Notification } from '../components/notification';
import instance from '../api/axios';

const elapsedTime = (date: string) => {
    const start: any = new Date(date);
    const end: any = new Date(); // 현재 날짜

    const diff = end - start; // 경과 시간

    const times = [
        { time: '분', milliSeconds: 1000 * 60 },
        { time: '시간', milliSeconds: 1000 * 60 * 60 },
        { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
        { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
        { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
    ].reverse();

    // 년 단위부터 알맞는 단위 찾기
    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        // 큰 단위는 0보다 작은 소수 단위 나옴
        if (betweenTime > 0) {
            return `${betweenTime}${value.time} 전`;
        }
    }

    // 모든 단위가 맞지 않을 시
    return '방금 전';
};

type NotificationScreenProps = StackScreenProps<
    RootStackParamList,
    'Notification'
>;

const NotificationScreen: React.FC<NotificationScreenProps> = (props) => {
    const [notifications, setNotifications] = useState<any>([]);
    const [notification, setNotification] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const pressNotification = (index: any, id: any) => {
        setNotification(notifications[index]);
        console.log('pressNotification', index);
        console.log('state', notification);
        setModalState();
        instance
            .put(`/alarms/read/${id}`, {
                read: true,
            })
            .then((res) => {
                // console.log('put', res);
                notifications[index].read = true;
            })
            .catch((err) => {
                console.log('put', err);
            });
    };

    const pressRemoveAll = () => {
        console.log('pressRemoveList');
        instance
            .delete('/alarms/delete/all')
            .then((res) => {
                console.log('delete', res.data);
                setNotifications([]);
            })
            .catch((err) => {
                console.log('delete', err);
            });
    };

    const pressReadAll = () => {
        console.log('pressReadAll');
        instance
            .put('/alarms/read/all')
            .then((res) => {
                console.log('put', res.data);
                notifications.map((item: any) => {
                    item.read = true;
                });
            })
            .catch((err) => {
                console.log('put', err);
            });
    };

    const setModalState = () => {
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        instance
            .get('alarms')
            .then((res) => {
                // console.log(res.data);
                setNotifications(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: '#000',
                                marginBottom: 10,
                            }}
                        >
                            {elapsedTime(notification?.created_date)}
                        </Text>
                        <Text style={styles.modalText}>
                            {notification?.content}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            {notification?.alarm_type === 'notice' ||
                            notification?.alarm_type === 'faq' ? (
                                <>
                                    <Button1 text={'게시물 보기'} />
                                    <Button1
                                        text={'닫기'}
                                        onPress={setModalState}
                                    />
                                </>
                            ) : (
                                <Button1
                                    text={'닫기'}
                                    onPress={setModalState}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
            <Logo3 content="notification" />
            <ScrollView style={styles.notificationListContainer}>
                {notifications.length > 0 ? (
                    notifications.map((notification: any, index: any) => (
                        <Notification
                            key={notification.id}
                            item={notification}
                            onPress={() =>
                                pressNotification(index, notification.id)
                            }
                        />
                    ))
                ) : (
                    <Text style={styles.emptyText}>알림이 없습니다.</Text>
                )}
            </ScrollView>
            <View style={{ marginBottom: 60, flexDirection: 'row' }}>
                <Button1 text="모두 읽음" onPress={pressReadAll} />
                <Button1 text="모두 삭제" onPress={pressRemoveAll} />
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
        width: '70%',
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40,
        color: '#A0AEC0',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        // height: '50%',
        // width: '80%',
        margin: 20,
        backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        elevation: 5,
        borderWidth: 1,
        borderColor: '#63B3ED',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default NotificationScreen;
