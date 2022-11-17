import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Button1 from '../components/button1';
import axios from '../api/axios';
import requests from '../api/requests';
import { station } from '../types/types';
import Mylocationsvg from '../../assets/icons/mylocation.svg';

type BusMapScreenProps = StackScreenProps<RootStackParamList, 'BusMap'>;

interface line {
    latitude: any;
    longitude: any;
}

const BusMapScreen: React.FC<BusMapScreenProps> = (props) => {
    const [stationList, setStationList] = useState<any>(
        props.route.params.stationList
    );
    const [location, setLocation] = useState();
    const [busName, setBusName] = useState<String>(props.route.params.name);
    const [co_or_le, setco_or_le] = useState<String>(
        props.route.params.commute_or_leave
    );

    const [lat, setLatitude] = useState<number>();
    const [lon, setLongitude] = useState<number>();
    const [bus_lat, setBusLat] = useState<number>();
    const [bus_lng, setBusLng] = useState<number>();
    const [visible, setVisible] = useState(false);
    const [isLoding, setIsLoding] = useState<boolean>(false);

    const [avglat, setAvgLat] = useState<number>(36.3550227);
    const [avglon, setAvgLon] = useState<number>(127.2998406);
    const [line, setLine] = useState<any>();

    const mapRef = React.useRef<any>();
    const ws = React.useRef<any>();

    interface Location {
        lat: number;
        lng: number;
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                timeInterval: 5,
            });

            //let location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: true});
            // console.log(location);
            //setLocation(location);

            setLatitude(latitude);
            setLongitude(longitude);
            let sumlat = 0;
            let sumlon = 0;
            for (let i = 0; i < stationList.length; i++) {
                sumlat += +stationList[i].lat;
                sumlon += +stationList[i].lng;
            }
            setAvgLat(sumlat / stationList.length);
            setAvgLon(sumlon / stationList.length);

            setIsLoding(true);
        })();
        axios
            .get(requests.polyline + '/' + stationList[0].bus_id)
            .then((response) => {
                // console.log(response.data);
                let polylist = [];
                for (let i = 0; i < response.data.length; i++) {
                    let pos: line = {
                        latitude: +response.data[i].latitude,
                        longitude: +response.data[i].longitude,
                    };
                    polylist.push(pos);
                }
                setLine(polylist);
            })
            .catch((error) => {
                console.log(error);
            });
        const date = new Date();
        const hour = date.getHours();
        if (
            (co_or_le == 'COMMUTE' && hour >= 7 && hour <= 9) ||
            (co_or_le == 'LEAVE' && hour >= 18 && hour <= 21)
        ) {
            let busNameParse = busName.split('호차')[0];
            busNameParse = busNameParse + '호차';
            ws.current = new WebSocket(
                `ws://k7b202.p.ssafy.io:9000/ws/` + busNameParse
            );
        } else {
            ws.current = null;
        }
        if (ws.current != null) {
            console.log(ws.current);
            ws.current.onopen = () => {
                // connection opened
                console.log('connected');
            };

            ws.current.onmessage = (e: any) => {
                let gps: Location = JSON.parse(e.data);
                // console.log(e);
                // console.log(gps)
                if (gps.lat == null || gps.lng == null) {
                    setVisible(false);
                    setBusLat(0);
                    setBusLng(0);
                } else {
                    setVisible(true);
                    setBusLat(gps.lat);
                    setBusLng(gps.lng);
                }

                // console.log(gps.lat);
            };

            ws.current.onerror = (
                e: React.SyntheticEvent<HTMLInputElement>
            ) => {
                setVisible(false);
                setBusLat(0);
                setBusLng(0);
                // an error occurred
                console.log(e);
            };

            ws.current.onclose = (
                e: React.SyntheticEvent<HTMLInputElement>
            ) => {
                // connection closed
                console.log(e);
            };

            return () => {
                console.log('동작');
                ws.current.close();
            };
        }
    }, []);

    const goToMyLocation = async () => {
        mapRef.current.animateCamera({
            center: { latitude: lat, longitude: lon },
            pitch: 2,
            heading: 0,
            altitude: 3000,
            zoom: 14,
        });
    };

    const MarkList = () => {
        const result = [];
        for (let i = 0; i < stationList.length; i++) {
            result.push(
                <Marker
                    key={stationList[i].id}
                    coordinate={{
                        latitude: +stationList[i].lat,
                        longitude: +stationList[i].lng,
                    }}
                    title={stationList[i].name}
                    description={stationList[i].arrived_time}
                >
                    <Image
                        source={require('../../assets/images/bus-stop.png')}
                        style={{ height: 50, width: 35 }}
                    />
                </Marker>
            );
        }
        return result;
    };

    const Gps = () => {
        if (bus_lat != null && bus_lng != null)
            return (
                <Marker
                    coordinate={{ latitude: +bus_lat, longitude: +bus_lng }}
                    title={'버스'}
                >
                    <Image
                        source={require('../../assets/images/bus.png')}
                        style={{ height: 35, width: 35, resizeMode: 'stretch' }}
                    />
                </Marker>
            );
    };
    const mapView = (lat: number, lon: number) => {
        if (isLoding) {
            return (
                <MapView
                    style={styles.map}
                    ref={mapRef}
                    showsUserLocation={false}
                    provider={'google'}
                    initialRegion={{
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4,
                    }}
                >
                    {MarkList()}
                    {visible ? Gps() : null}
                    <Polyline
                        coordinates={line}
                        strokeColor="#63B3ED"
                        strokeWidth={5}
                    />
                </MapView>
            );
        }
    };

    return (
        <View style={styles.container}>
            {mapView(avglat, avglon)}
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    position: 'absolute',
                    right: 24,
                    bottom: 48,
                    backgroundColor: 'white',
                    width: 48,
                    height: 48,
                    borderRadius: 4,
                }}
                onPress={goToMyLocation}
            >
                <Mylocationsvg width={32} height={32} style={{ margin: 8 }} />
            </TouchableOpacity>
            {/* <View style={[{ position: 'absolute', right: 0, bottom: 0 }]}>
                <Button1
                    text={'내 위치'}
                    onPress={goToMyLocation}
                    style={{ borderRadius: 30 }}
                />
            </View> */}
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
    map: {
        width: '100%',
        height: '95%',
        flex: 1,
    },
});

export default BusMapScreen;
