import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Pressable,
    Animated,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import axios from '../api/axios';
import requests from '../api/requests';
import Footer from '../components/footer';
import * as AsyncStorage from '../utiles/AsyncService';
import jwtDecode from 'jwt-decode';

import * as RootNavigation from '../../RootNavigation';
import { FontAwesome } from '@expo/vector-icons';

type BusScreenProps = StackScreenProps<RootStackParamList, 'Bus'>;

interface station {
    bus_id: number;
    name: string;
    lat: string;
    lng: string;
    order: number;
    arrived_time: string;
    id: number;
}

interface Bus {
    region_id: number;
    name: string;
    commute_or_leave: string;
    id: number;
    stations: station[];
    cur: any[];
}

interface jwt {
    exp: number;
    id: number;
    nickname: string;
    region: number;
    role: number;
}

const data = [
    {
        region_id: 200,
        name: '1호차',
        commute_or_leave: 'COMMUTE',
        id: 2,
        stations: [
            {
                bus_id: 1,
                name: '한남오거리',
                lat: '36.1235',
                lng: '121.42356',
                order: 1,
                arrived_time: '07:45',
                id: 1,
            },
            {
                bus_id: 2,
                name: '재뜰네거리',
                lat: '36.13589',
                lng: '121.48431',
                order: 2,
                arrived_time: '07:55',
                id: 2,
            },
        ],
        cur: [],
    },
    {
        region_id: 200,
        name: '2호차',
        commute_or_leave: 'COMMUTE',
        id: 3,
        stations: [
            {
                bus_id: 2,
                name: '한남오거리',
                lat: '36.1235',
                lng: '121.42356',
                order: 1,
                arrived_time: '07:45',
                id: 1,
            },
            {
                bus_id: 2,
                name: '재뜰네거리',
                lat: '36.13589',
                lng: '121.48431',
                order: 2,
                arrived_time: '07:55',
                id: 2,
            },
        ],
        cur: [],
    },
];

const BusScreen: React.FC<BusScreenProps> = (props) => {
    let decoded: jwt;
    const [commuteBusList, setCommuteBusList] = useState<Bus[]>([] as Bus[]);
    const [leaveBustList, setLeaveBusList] = useState<Bus[]>([] as Bus[]);
    const [commuteLeaveState, setCommutLeavState] = useState<boolean>(true);

    let [line, setLine] = useState<any>({
        backgroundColor: '#63B3ED',
        left: 0,
    });

    const slideAnimation = useRef(new Animated.Value(0)).current;
    const slideContentAnimation = useRef(new Animated.Value(0)).current;

    const width = Dimensions.get('window').width;

    const slideStart = () => {
        Animated.timing(slideAnimation, {
            toValue: width / 2,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const slideEnd = () => {
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const slideContentStart = () => {
        Animated.timing(slideContentAnimation, {
            toValue: -width,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const slideContentEnd = () => {
        Animated.timing(slideContentAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        (async () => {
            // 토큰 해석
            let token: string;
            let isDecoded = false;
            await AsyncStorage.getData('token').then((response) => {
                token = response;
                decoded = jwtDecode(token);
                isDecoded = true;
            });

            if (isDecoded) {
                axios
                    .get(requests.shuttlebus, {
                        params: {
                            region_id: decoded.region,
                            commute_or_leave: 'COMMUTE',
                        },
                    })
                    .then((response) => {
                        // console.log(response.data);
                        setCommuteBusList(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                axios
                    .get(requests.shuttlebus, {
                        params: {
                            region_id: decoded.region,
                            commute_or_leave: 'LEAVE',
                        },
                    })
                    .then((response) => {
                        // console.log(response.data);
                        setLeaveBusList(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })();
    }, []);

    const ButtonList = (flag: any) => {
        const result = [];
        const temp = flag === 'COMMUTE' ? commuteBusList : leaveBustList;
        for (let i = 0; i < temp.length; i++) {
            result.push(
                <Pressable
                    key={temp[i].id}
                    onPress={() =>
                        RootNavigation.navigate('Station', {
                            bus_id: temp[i].id,
                            name: temp[i].name,
                            commute_or_leave: temp[i].commute_or_leave,
                        })
                    }
                    style={styles.busCard}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={styles.busCardText}>{temp[i].name}</Text>
                        <FontAwesome
                            style={{ color: '#63b3ed' }}
                            size={20}
                            name="angle-right"
                        />
                    </View>
                </Pressable>
            );
        }
        return result;
    };

    return (
        <View style={styles.container}>
            {commuteLeaveState ? (
                <View style={styles.header}>
                    <Pressable style={{ width: '50%' }}>
                        <Text style={[styles.headerText, styles.active]}>
                            승차 노선
                        </Text>
                    </Pressable>
                    <Pressable style={{ width: '50%' }}>
                        <Text
                            style={[styles.headerText]}
                            onPress={() => {
                                setCommutLeavState(!commuteLeaveState);
                                slideStart();
                                slideContentStart();
                            }}
                        >
                            하차 노선
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.header}>
                    <Pressable style={{ width: '50%' }}>
                        <Text
                            style={[styles.headerText]}
                            onPress={() => {
                                setCommutLeavState(!commuteLeaveState);
                                slideEnd();
                                slideContentEnd();
                            }}
                        >
                            승차 노선
                        </Text>
                    </Pressable>
                    <Pressable style={{ width: '50%' }}>
                        <Text style={[styles.headerText, styles.active]}>
                            하차 노선
                        </Text>
                    </Pressable>
                </View>
            )}
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 70,
                        height: 2,
                        width: '50%',
                        left: 0,
                    },
                    line,
                    {
                        left: slideAnimation,
                    },
                ]}
            />
            {/* 버스 목록 */}
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <Animated.View
                    style={{
                        width: width,
                        alignItems: 'center',
                        transform: [{ translateX: slideContentAnimation }],
                    }}
                >
                    {ButtonList('COMMUTE')}
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{ translateX: slideContentAnimation }],
                        position: 'absolute',
                        right: -width,
                        width: width,
                        alignItems: 'center',
                    }}
                >
                    {ButtonList('LEAVE')}
                </Animated.View>
            </View>

            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    container2: {
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
    },
    active: {
        color: '#63B3ED',
        // borderWidth: 1,
    },
    busCard: {
        borderWidth: 1,
        borderColor: '#63B3ED',
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
    },
    busCardText: {
        fontSize: 16,
        color: '#63B3ED',
    },
});

export default BusScreen;
