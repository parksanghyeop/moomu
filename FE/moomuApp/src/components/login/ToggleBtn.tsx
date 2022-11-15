import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export const ToggleBtn = (props: {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { toggle, setToggle } = props;

    const translateX = useSharedValue(toggle ? 0 : 35);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    useEffect(() => {
        translateX.value = withTiming(toggle ? 0 : 35);
    }, [toggle]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => setToggle((state) => !state)}
        >
            <View
                style={{
                    width: 54,
                    height: 3,
                    backgroundColor: '#63B3ED',
                    marginVertical: 8,
                    borderRadius: 10,
                }}
            >
                <Animated.View
                    style={[
                        {
                            position: 'relative',
                            bottom: 8,
                        },
                        animatedStyles,
                    ]}
                >
                    <View
                        style={{
                            width: 19,
                            height: 19,
                            borderRadius: 100 / 2,
                            backgroundColor: '#63B3ED',
                        }}
                    />
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};
