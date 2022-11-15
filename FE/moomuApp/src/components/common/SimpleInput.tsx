import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from 'react-native';

export const SimpleInput = (props: TextInputProps) => {
    const [focus, setFocus] = useState(false);

    return (
        <View
            style={[
                {
                    position: 'relative',
                    width: 220,
                    height: 38,
                    marginBottom: 10,
                },
                props.style,
            ]}
        >
            <TextInput
                {...props}
                style={[
                    {
                        width: '100%',
                        height: '100%',
                        paddingHorizontal: 8,
                        backgroundColor: 'white',
                    },
                    focus ? styles.onfocus : styles.onblur,
                ]}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                selectionColor="#63B3ED"
            ></TextInput>
            <LinearGradient
                colors={['#63B3ED', '#9DECF9']}
                style={{
                    height: focus ? 3 : 2,
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            ></LinearGradient>
        </View>
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
