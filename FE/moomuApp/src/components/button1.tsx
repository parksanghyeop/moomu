import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ButtonProps,
    TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props extends TouchableOpacityProps {
    text: string | number;
}

const Button1 = (props: Props) => {
    return (
        <LinearGradient
            colors={['#3182CE', '#4BC9FF']}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={[styles.gradient, props.style]}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={props.onPress}
                disabled={props.disabled}
            >
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        width: 122,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        padding: 1,
    },
    button: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '100',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',

        /* BLUE 500 */
        color: '#3182CE',
    },
});

export default Button1;
