import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const SimpleInput = (props: {
    placeholder: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { placeholder, value, setValue } = props;
    const [focus, setFocus] = useState(false);

    return (
        <TextInput
            value={value}
            style={[
                {
                    padding: 8,
                    width: 220,
                    height: 36,
                },
                focus ? styles.onfocus : styles.onblur,
            ]}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            selectionColor="#63B3ED"
            placeholder={placeholder}
            onChangeText={(text) => setValue(text)}
        ></TextInput>
    );
};

const styles = StyleSheet.create({
    onfocus: {
        borderBottomColor: '#63B3ED',
        borderBottomWidth: 2,
        color: '#63B3ED',
    },
    onblur: {
        borderBottomColor: '#63B3ED',
        borderBottomWidth: 1,
        color: 'black',
    },
});
