import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Button1 from '../components/button1';
import { station } from '../types/types';

type BusMapScreenProps = StackScreenProps<RootStackParamList, 'BusMap'>;

const DATA = [
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
        bus_id: 1,
        name: '재뜰네거리',
        lat: '36.13589',
        lng: '121.48431',
        order: 2,
        arrived_time: '07:55',
        id: 2,
    },
    {
        bus_id: 1,
        name: '정부청사역',
        lat: '36.13589',
        lng: '121.48431',
        order: 3,
        arrived_time: '07:55',
        id: 3,
    },
];

const line = [
    {
        longitude: 127.2982711,
        latitude: 36.3546486,
    },
    {
        longitude: 127.298249,
        latitude: 36.3546062,
    },
    {
        longitude: 127.2984628,
        latitude: 36.3546742,
    },
    {
        longitude: 127.299044,
        latitude: 36.3548798,
    },
    {
        longitude: 127.2995106,
        latitude: 36.3550546,
    },
    {
        longitude: 127.2995819,
        latitude: 36.3550718,
    },
    {
        longitude: 127.2996443,
        latitude: 36.3550728,
    },
    {
        longitude: 127.2997101,
        latitude: 36.3550711,
    },
    {
        longitude: 127.2998406,
        latitude: 36.3550227,
    },
];

const BusMapScreen: React.FC<BusMapScreenProps> = (props) => {
    const [stationList, setStationList] = useState<any>(
        props.route.params.stationList
    );
    const [location, setLocation] = useState();

    const [lat, setLatitude] = useState<number>();
    const [lon, setLongitude] = useState<number>();

    const mapRef = React.useRef<any>();

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
        })();
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
                />
            );
        }
        return result;
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                ref={mapRef}
                showsUserLocation={true}
                provider={'google'}
            >
                {MarkList()}
                <Polyline
                    coordinates={line}
                    strokeColor="#F00"
                    strokeWidth={5}
                />
            </MapView>
            <View style={[{ position: 'absolute', left: 0 }]}>
                <Button1 text={'내 위치'} onPress={goToMyLocation} />
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
    map: {
        width: '99%',
        height: '80%',
    },
});

export default BusMapScreen;
