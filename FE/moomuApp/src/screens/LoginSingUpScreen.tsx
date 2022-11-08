import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
import { ToggleBtn } from '../components/login/ToggleBtn';
import { GradientText } from '../components/common/GradientText';
import { UserInputForm } from '../components/login/UserInputForm';

type LoginSignUpScreenProps = StackScreenProps<
    RootStackParamList,
    'LoginSignUp'
>;

const LoginSignUpScreen: React.FC<LoginSignUpScreenProps> = (props) => {
    // 화면 렌더링시 로그인인지 회원가입인지 확인
    const [isLogin, setIsLogin] = useState(
        props.route.params.id == 1 ? true : false
    );

    const renderConditionInput = isLogin ? (
        <Login />
    ) : (
        <SignUp condition={setIsLogin} />
    );

    return (
        <View style={styles.container}>
            <View style={[{ alignItems: 'center', marginTop: 88 }]}>
                <Logo2 />
            </View>
            <View style={styles.container2}>
                <Text style={[styles.text, { width: 72 }]}>LOGIN</Text>
                <ToggleBtn toggle={isLogin} setToggle={setIsLogin} />
                <Text style={[styles.text, { width: 72 }]}>SIGNUP</Text>
            </View>
            <UserInputForm isLogin={isLogin} />

            {/* {renderConditionInput} */}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container2: {
        flexDirection: 'row',
        marginTop: 54,
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
        color: '#63B3ED',
    },
});

export default LoginSignUpScreen;
