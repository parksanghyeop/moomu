import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    TextInput,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import { Logo3 } from '../components/logo';
import Button1 from '../components/button1';
import Footer from '../components/footer';
import * as RootNavigation from '../../RootNavigation';
import axios from '../api/axios';
import instance from '../api/axios';
import requests from '../api/requests';
import * as AsyncStorage from '../utiles/AsyncService';
import jwtDecode from 'jwt-decode';
import SelectDropdown from 'react-native-select-dropdown';

type regions = {
    name: string;
    id: number;
};

type ModifyScreenProps = StackScreenProps<RootStackParamList, 'Modify'>;

const ModifyScreen: React.FC<ModifyScreenProps> = (props) => {
    const [nickname, setNickname] = useState('');
    const [region, setRegion] = useState<number>();
    const [group, setGroup] = useState<number>();
    const [regions, setRegions] = useState<regions[]>([] as regions[]);

    useEffect(() => {
        axios
            .get(requests.regions)
            .then((response) => {
                setRegions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const modifybutton = () => {
        instance
            .put(
                requests.modify,
                {
                    nickname: nickname,
                    region_id: region,
                    class_group: group,
                },
                {
                    headers: { 'Content-Type': `application/json` },
                }
            )
            .then((response) => {
                Alert.alert(
                    '회원 정보수정',
                    nickname +
                        '님' +
                        '  수정완료' +
                        '\n로그아웃 후 이용해주세요',
                    [
                        {
                            text: '확인',
                            onPress: () => console.log('확인'),
                        },
                    ],
                    { cancelable: false }
                );
                RootNavigation.navigate('Setting');
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                <Logo3 content="modify" />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>개인정보 수정</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="닉네임 수정"
                    onChangeText={(text) => setNickname(text)}
                    returnKeyType="next"
                ></TextInput>
                <View style={[{ flexDirection: 'row' }]}>
                    <SelectDropdown
                        data={regions}
                        onSelect={(selectedItem, index) => {
                            // console.log(selectedItem, index);
                            setRegion(selectedItem.id);
                        }}
                        defaultButtonText={'지역선택'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                    <View style={styles.divider} />
                    <TextInput
                        style={[styles.input, { width: 80 }]}
                        keyboardType="number-pad"
                        placeholder="   반"
                        onChangeText={(text) => setGroup(+text)}
                        onSubmitEditing={modifybutton}
                    ></TextInput>
                </View>

                <View style={{ marginBottom: 60 }}>
                    <Button1
                        text={'수정'}
                        onPress={modifybutton}
                        disabled={!(nickname && group)}
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
    input: {
        width: 219,
        height: 37,
        borderBottomColor: '#63B3ED',
        borderBottomWidth: 1,
    },

    dropdownsRow: {
        flexDirection: 'row',
        width: '20%',
        paddingHorizontal: '5%',
    },

    dropdown1BtnStyle: {
        width: 150,
        height: 30,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderBottomColor: '#63B3ED',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#63B3ED',
    },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    divider: { width: 12 },
});

export default ModifyScreen;
