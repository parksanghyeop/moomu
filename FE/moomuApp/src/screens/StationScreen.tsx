import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import axios from '../api/axios';
import instance from '../api/axios';
import requests from '../api/requests';
import Mapsvg from '../../assets/icons/map.svg';
import Refreshsvg from '../../assets/icons/refresh.svg';
import * as RootNavigation from '../../RootNavigation';
import Button1 from '../components/button1';
import { station, myStation } from '../types/types';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

type StationScreenProps = StackScreenProps<RootStackParamList, 'Station'>;

const StationScreen: React.FC<StationScreenProps> = (props) => {
    const [stationList, setStationList] = useState<station[]>([] as station[]);
    const [useselect, setUseSelect] = useState<boolean>(false);
    const [mystation, setMystation] = useState<myStation>({} as myStation);
    const [mytemp, setMytemp] = useState<myStation>({} as myStation);
    const [co_or_le, setco_or_le] = useState<string>(
        props.route.params.commute_or_leave
    );
    const [busName, setBusName] = useState<String>(props.route.params.name);
    const [busOrder, setBusOrder] = useState<number>(props.route.params.order);

    useEffect(() => {
        (async () => {
            // 셔틀버스 노선 조회
            refresh();
            // 승차/하차 등록 지점 조회
            await axios
                .get(requests.station)
                .then((response) => {
                    setMystation(response.data);
                    setMytemp(response.data);
                    // console.log(response.data);
                    // console.log(mystation);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);

    const myStationOnpress = (id: any) => {
        if (co_or_le == 'COMMUTE') {
            setMytemp({ ...mytemp, start_station_id: id });
        } else if (co_or_le != 'COMMUTE') {
            setMytemp({ ...mytemp, end_station_id: id });
        }
    };

    const unStationOnpress = (id: any) => {
        if (id == mytemp.start_station_id && co_or_le == 'COMMUTE') {
            setMytemp({ ...mytemp, start_station_id: null });
        } else if (id == mytemp.end_station_id && co_or_le != 'COMMUTE') {
            setMytemp({ ...mytemp, end_station_id: null });
        }
    };

    const canclePress = () => {
        setMytemp(mystation);
        setUseSelect(false);
    };

    const confirmPress = async () => {
        // console.log(mytemp);

        if (mystation == mytemp) {
            console.log('변경사항이 없습니다.');
            return;
        }

        if (
            (mystation.start_station_id != null &&
                mytemp.start_station_id == null) ||
            (mystation.end_station_id != null && mytemp.end_station_id == null)
        ) {
            await instance
                .delete(
                    requests.station_delete + '?commute_or_leave=' + co_or_le
                )
                .then((response) => {
                    setMystation(mytemp);
                    setUseSelect(false);
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        }
        // axios 요청으로 변경된 내용 서버로 전송

        await instance
            .put(
                requests.station_edit +
                    '?station_id=' +
                    (co_or_le == 'COMMUTE'
                        ? mytemp.start_station_id
                        : mytemp.end_station_id) +
                    '&commute_or_leave=' +
                    co_or_le
            )
            .then((response) => {
                setMystation(mytemp);
                setUseSelect(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const commute_or_leave = useselect ? (
        <Button1 text={'선택 확정'} onPress={confirmPress} />
    ) : co_or_le == 'COMMUTE' ? (
        <Button1 text={'승차지점변경'} onPress={() => setUseSelect(true)} />
    ) : (
        <Button1 text={'하차지점변경'} onPress={() => setUseSelect(true)} />
    );

    const back_or_cancle = useselect ? (
        <Button1 text={'취소'} onPress={canclePress} />
    ) : (
        <Button1 text={'이전으로'} onPress={() => RootNavigation.goBack()} />
    );

    const refresh = async () => {
        await axios
            .get(requests.shuttlebus_notion + props.route.params.bus_id)
            .then((response) => {
                setBusOrder(response.data.order);
                setStationList(response.data.stations);
                // console.log(stationList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const stationSelected = (id: number) => {
        if (
            id == mystation.start_station_id ||
            id == mystation.end_station_id
        ) {
            return (
                // <Text style={styles.title}>
                //     {co_or_le == 'COMMUTE' ? '내 승차지점' : '내 하차지점'}
                // </Text>
                <MaskedView
                    style={{
                        height: 18,
                        width: 100,
                        marginLeft: 8,
                    }}
                    maskElement={
                        <Text style={styles.time}>
                            {co_or_le == 'COMMUTE'
                                ? '내 승차지점'
                                : '내 하차지점'}
                        </Text>
                    }
                >
                    <LinearGradient
                        colors={['#28C9F5', '#37A6F8']}
                        start={{ x: 0.2, y: 0.2 }}
                        end={{ x: 1, y: 1 }}
                        style={{ flex: 1 }}
                    />
                </MaskedView>
            );
        } else return;
    };

    const arriveTime = (arrived_time: any) => {
        if (arrived_time != null) {
            return (
                <Text style={styles.time}>
                    {co_or_le == 'COMMUTE'
                        ? arrived_time.substring(0, 5)
                        : +arrived_time.substring(0, 2) -
                          12 +
                          arrived_time.substring(2, 5)}
                    {co_or_le == 'COMMUTE' ? ' AM' : ' PM'}
                </Text>
            );
        }
    };

    const select_or_selectd = (id: number, order: number) => {
        if (useselect) {
            if (id == mytemp.start_station_id || id == mytemp.end_station_id) {
                return (
                    <Text
                        style={[styles.title, styles.select]}
                        onPress={() => unStationOnpress(id)}
                    >
                        선택됨
                    </Text>
                );
            } else {
                if (co_or_le == 'COMMUTE' && order == stationList.length - 1) {
                    return;
                } else if (co_or_le == 'LEAVE' && order == 0) {
                    return;
                } else {
                    return (
                        <Text
                            style={[styles.title, styles.select]}
                            onPress={() => myStationOnpress(id)}
                        >
                            선택
                        </Text>
                    );
                }
            }
        }
    };

    const Item = ({
        id,
        name,
        arrived_time,
        order,
    }: {
        id: number;
        name: string;
        arrived_time: any;
        order: number;
    }) => (
        <View style={styles.item}>
            <View>
                <Text style={order <= busOrder ? styles.title_l : styles.title}>
                    {name}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    {arriveTime(arrived_time)}
                    <View>{stationSelected(id)}</View>
                </View>
            </View>

            {select_or_selectd(id, order)}

            <View
                style={[order <= busOrder ? styles.circle_full : styles.circle]}
            />
        </View>
    );

    const renderItem = ({ item }: { item: station }) => (
        <Item
            id={item.id}
            name={item.name}
            arrived_time={item.arrived_time}
            order={item.order}
        />
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container2}>
                <Text style={styles.name}>{props.route.params.name}</Text>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                        {
                            width: 40,
                            height: 35,
                            marginTop: 5,
                            marginLeft: 30,
                        },
                    ]}
                    onPress={refresh}
                >
                    <Refreshsvg width={27} height={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                        {
                            width: 40,
                            height: 35,
                            marginTop: 5,
                            marginLeft: 30,
                        },
                    ]}
                    onPress={() => {
                        RootNavigation.navigate('BusMap', {
                            stationList: stationList,
                            commute_or_leave: co_or_le,
                            name: busName,
                        });
                    }}
                >
                    <Mapsvg width={27} height={24} />
                </TouchableOpacity>
            </SafeAreaView>

            <View
                style={[
                    {
                        left: '1%',
                        width: '99%',
                        height: '70%',
                        borderBottomColor: '#DDDDDD',
                        borderBottomWidth: 1,
                        borderTopColor: '#DDDDDD',
                        borderTopWidth: 1,
                    },
                ]}
            >
                <FlatList
                    data={stationList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.line} />
            </View>

            <View style={[{ flexDirection: 'row' }]}>
                {back_or_cancle}
                {commute_or_leave}
            </View>
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
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 16,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',
    },
    title: {
        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 21,
        color: '#000000',
    },
    title_l: {
        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 21,
        color: '#E0E0E0',
    },
    time: {
        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 17,
        color: '#718096',
    },
    line: {
        height: '100%',
        width: 3,
        position: 'absolute',
        backgroundColor: '#63B3ED',
        right: 40,
        top: 0,
        zIndex: -1,
    },
    circle: {
        top: 10,
        right: 14,
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 100 / 2,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#63B3ED',
    },
    circle_full: {
        top: 10,
        right: 14,
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 100 / 2,
        backgroundColor: '#63B3ED',
        borderWidth: 2,
        borderColor: '#63B3ED',
    },
    select: {
        position: 'absolute',
        right: 50,
        top: 10,
    },
    name: {
        fontFamily: 'Pretendard Variable',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 24,
        lineHeight: 29,
        textAlign: 'center',
    },
});

export default StationScreen;
