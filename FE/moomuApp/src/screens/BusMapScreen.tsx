import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Button1 from '../components/button1';
import { station } from '../types/types';

type BusMapScreenProps = StackScreenProps<RootStackParamList, 'BusMap'>;

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

    const [lat, setLatitude] = useState<number>(36.3550227);
    const [lon, setLongitude] = useState<number>(127.2998406);
    const [isLoding, setIsLoding] = useState<boolean>(false);

    const [avglat, setAvgLat] = useState<number>(36.3550227);
    const [avglon, setAvgLon] = useState<number>(127.2998406);

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

    const mapView = (lat: number, lon: number) => {
        if (isLoding) {
            return (
                <MapView
                    style={styles.map}
                    ref={mapRef}
                    showsUserLocation={true}
                    provider={'google'}
                    initialRegion={{
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4,
                    }}
                >
                    {MarkList()}
                    <Polyline
                        coordinates={line}
                        strokeColor="#F00"
                        strokeWidth={5}
                    />
                </MapView>
            );
        }
    };

    return (
        <View style={styles.container}>
            {mapView(avglat, avglon)}
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
        width: '100%',
        height: '95%',
        flex: 1,
    },
});

export default BusMapScreen;
