import React from 'react';
import { StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from '../../../RootNavigation';
import instance from '../../api/axios';

const LogoMainContent = (props: any) => {
    const [notificationCount, setNotificationCount] = React.useState(0);

    React.useEffect(() => {
        instance.get('/alarms/count-not-read').then((response) => {
            setNotificationCount(response.data);
        });
    }, []);

    return (
        <Text
            style={styles.logoContent}
            onPress={() => {
                console.log('clicked');
                RootNavigation.navigate('Notification');
            }}
        >
            <FontAwesome name="bell" size={14} />{' '}
            <Text>{notificationCount}</Text>
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
