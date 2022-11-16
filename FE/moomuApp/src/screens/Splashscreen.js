import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen';
import * as AsyncService from '../utiles/AsyncService';
import * as RootNavigation from '../../RootNavigation';

const SplashScreen = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            AsyncService.containsKey('token')
                .then((value) => {
                    if (value) {
                        RootNavigation.navigate('Main');
                    } else {
                        RootNavigation.navigate('Start');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(true);
        }, 2000);
    }, []);

    return (
        <AnimatedSplash
            translucent={true}
            isLoaded={props.loading}
            logoImage={require('../../assets/images/Logo.png')}
            backgroundColor={'#fff'}
            logoHeight={160}
            logoWidth={160}
        ></AnimatedSplash>
    );
};

export default SplashScreen;
