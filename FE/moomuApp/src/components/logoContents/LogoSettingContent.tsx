import React from 'react';
import { StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from '../../../RootNavigation';
import { Feather } from '@expo/vector-icons';

const LogoSettingContent = (props: any) => {
    return (
        <Text
            style={styles.logoContent}
            onPress={() => {
                RootNavigation.navigate('Setting');
                // console.log('clicked');
            }}
        >
            <Feather name="settings" size={16} />
            &nbsp;
            <Text>개인정보 관리</Text>
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

export default LogoSettingContent;
