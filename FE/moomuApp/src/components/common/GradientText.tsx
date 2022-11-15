import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextProps } from 'react-native';
import { LinearTextGradient } from 'react-native-text-gradient';

export const GradientText = (props: TextProps) => {
    return (
        <MaskedView maskElement={<Text {...props}></Text>}>
            {/* Shows behind the mask, you can put anything here, such as an image */}
            <LinearGradient
                colors={['#3182CE', '#4BC9FF', '#9DECF9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};

const styles = StyleSheet.create({
    onfocus: {
        color: '#63B3ED',
    },
    onblur: {
        color: '#718096',
    },
});
