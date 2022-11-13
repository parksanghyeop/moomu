import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Switch,
    FlatList,
} from 'react-native';
import Footer from '../components/footer';
import Button1 from '../components/button1';
import 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';
import instance from '../api/axios';
import { ScrollView } from 'react-native-gesture-handler';
import * as RootNavigation from '../../RootNavigation';

type InformationScreenProps = StackScreenProps<
    RootStackParamList,
    'Information'
>;

const InformationScreen: React.FC<InformationScreenProps> = (props) => {
    let [informations, setInformations] = useState([]);

    // const d = new Date(+new Date() + 3240 * 1000)
    //     .toISOString()
    //     .replace('T', ' ');

    useEffect(() => {
        console.log(informations);
        instance
            .get('/notice')
            .then((res) => {
                console.log(res.data.items);
                setInformations(res.data.items);
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
                <Logo3 content="information" />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>대전캠퍼스</Text>
                </View>
                <ScrollView style={{ width: '100%' }}>
                    {informations.map((information: any, index: any) => {
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
                                        RootNavigation.navigate(
                                            'InformationDetail',
                                            {
                                                information: information,
                                            }
                                        );
                                    }}
                                    style={{ width: '85%' }}
                                >
                                    <Text
                                        key={index}
                                        style={styles.listText}
                                        numberOfLines={1}
                                    >
                                        {information.title}
                                    </Text>
                                    <Text
                                        key={index}
                                        style={styles.listText1}
                                        numberOfLines={1}
                                    >
                                        {information.created_date
                                            .replace('T', '   ')
                                            .substring(0, 18)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
                {}
                <View style={{ marginBottom: 60 }}>
                    <Button1
                        text={'메인화면'}
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
    listText1: {
        fontSize: 14,
        color: '#000000',
        paddingVertical: 4,
    },
});

export default InformationScreen;
