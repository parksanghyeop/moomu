import React from 'react';
import { StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as RootNavigation from '../../../RootNavigation';
import { Ionicons } from '@expo/vector-icons';

const LogoModifyContent = (props: any) => {
    return (
        <Text
            style={styles.logoContent}
            onPress={() => {
                RootNavigation.navigate('Modfiy');
                // console.log('clicked');
            }}
        >
            <Ionicons name="key-outline" size={16} />
            &nbsp;
            <Text>개인정보 수정</Text>
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

export default LogoModifyContent;
