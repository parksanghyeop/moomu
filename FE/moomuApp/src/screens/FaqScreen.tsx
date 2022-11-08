import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Switch,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import Footer from '../components/footer';
import Button1 from '../components/button1';
import 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import instance from '../api/axios';
import * as RootNavigation from '../../RootNavigation';

type FaqScreenProps = StackScreenProps<RootStackParamList, 'FAQ'>;

const FaqScreen: React.FC<FaqScreenProps> = (props) => {
    let [faqs, setFaqs] = useState([]);

    useEffect(() => {
        instance
            .get('/faq/user')
            .then((res) => {
                setFaqs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View
                style={[
                    {
                        width: '70%',
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 50,
                    },
                ]}
            >
                <Logo3 content="faq" />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>내 건의사항</Text>
                    <FontAwesome
                        name="edit"
                        size={16}
                        color={'#63B3ED'}
                        style={styles.titleText}
                    />
                </View>
                <ScrollView style={{ width: '100%' }}>
                    {faqs.map((faq: any, index: any) => {
                        return (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        RootNavigation.navigate('FaqDetail', {
                                            faq: faq,
                                        });
                                    }}
                                    style={{ width: '85%' }}
                                >
                                    <Text
                                        key={index}
                                        style={styles.listText}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {faq?.title}
                                    </Text>
                                </TouchableOpacity>
                                {/* <FontAwesome
                                    name="check"
                                    size={16}
                                    color={'#63B3ED'}
                                /> */}
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={{ marginBottom: 60 }}>
                    <Button1
                        text={'뒤로가기'}
                        onPress={() => RootNavigation.goBack()}
                    />
                </View>
                <Footer />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        position: 'absolute',
        width: 220,
        height: 21,
        top: 109,

        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '100',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',

        /* BLUE 500 */
        color: '#3182CE',
    },
    text1: {
        position: 'absolute',
        width: 220,
        height: 21,
        top: 109,

        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '100',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',

        color: '#000000',
    },
    image: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#63B3ED',
        width: '100%',
        margin: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        color: '#63B3ED',
    },
    listText: {
        fontSize: 20,
        color: '#63B3ED',
        paddingVertical: 4,
    },
});

export default FaqScreen;
