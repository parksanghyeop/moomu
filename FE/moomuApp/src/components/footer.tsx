import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Footer = () => {
    return <Text style={styles.text}>© 2022 MOOMU All Rights Reserved</Text>;
};

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        width: 195,
        height: 14,
        // left: 99,
        // top: 796,
        bottom: 34,
        alignItems: 'center',

        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '200',
        fontSize: 12,
        lineHeight: 14,
        textAlign: 'center',

        /* GRAY 500 */
        color: '#718096',
    },
});

export default Footer;
