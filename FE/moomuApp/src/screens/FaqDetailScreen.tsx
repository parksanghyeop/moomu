import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import Footer from '../components/footer';
import Button1 from '../components/button1';
import 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';
import * as RootNavigation from '../../RootNavigation';
import { ScrollView } from 'react-native-gesture-handler';

type FaqDetailScreenProps = StackScreenProps<RootStackParamList, 'FaqDetail'>;

const FaqDetailScreen: React.FC<FaqDetailScreenProps> = (props) => {
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
                    <Text style={styles.titleText}>
                        {props.route.params.faq?.title}
                    </Text>
                </View>
                <Text>{props.route.params.faq?.title}</Text>
                <Text>{props.route.params.faq?.created_date}</Text>
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

export default FaqDetailScreen;
