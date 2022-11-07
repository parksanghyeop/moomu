import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Switch,
    TouchableOpacity,
    GestureResponderEvent,
    TranslateXTransform,
} from 'react-native';
import Footer from '../components/footer';
import 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo2 } from '../components/logo';
import Login from './login';
import SignUp from './signup';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

type LoginSignUpScreenProps = StackScreenProps<
    RootStackParamList,
    'LoginSignUp'
>;

const LoginSignUpScreen: React.FC<LoginSignUpScreenProps> = (props) => {
    // 화면 렌더링시 로그인인지 회원가입인지 확인
    const [isLogin, setIsLogin] = useState(
        props.route.params.id == 1 ? true : false
    );

    useEffect(() => {
        translateX.value = withTiming(isLogin ? 0 : 35);
    }, [isLogin]);

    const toggle = () => {
        setIsLogin((state) => !state);
    };
    const translateX = useSharedValue(isLogin ? 0 : 35);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const renderConditionInput = isLogin ? (
        <Login />
    ) : (
        <SignUp condition={setIsLogin} />
    );

    return (
        <View style={styles.container}>
            <View style={[{ alignItems: 'center', marginTop: 100 }]}>
                <Logo2 />
            </View>
            <View style={styles.container2}>
                <Text style={[styles.text, { width: 53, height: 19 }]}>
                    LOGIN
                </Text>
                <View
                    style={{
                        width: 54,
                        height: 3,
                        backgroundColor: '#63B3ED',
                        marginLeft: 12,
                        marginRight: 4,
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
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                width: 19,
                                height: 19,
                                borderRadius: 100 / 2,
                                backgroundColor: '#63B3ED',
                            }}
                            onPress={toggle}
                        />
                    </Animated.View>
                </View>

                {/* <Switch style={styles.toggle} onValueChange={toggle} value={condition}></Switch> */}
                <Text style={[styles.text, { width: 72, height: 15 }]}>
                    SIGN UP
                </Text>
            </View>
            {renderConditionInput}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flexDirection: 'row',
        marginTop: 57,
        position: 'relative',
    },
    text: {
        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '100',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',

        /* BLUE 500 */
        color: '#3182CE',
    },
    toggle: {},
    circleSignup: {},
});

export default LoginSignUpScreen;
