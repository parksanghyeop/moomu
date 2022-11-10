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
    const [busName, setBusName] = useState<String>(
        props.route.params.name
    )

    const [lat, setLatitude] = useState<number>();
    const [lon, setLongitude] = useState<number>();
    const [bus_lat, setBusLat] = useState<number>();
    const [bus_lng, setBusLng] = useState<number>();
    const [visible, setVisible] = useState(false);

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
        })();
        
        ws.current = new WebSocket(`ws://k7b202.p.ssafy.io:8000/shuttlebus/ws/` + busName )
        // ws.current = new WebSocket(`ws://10.0.2.2:8000/shuttlebus/ws/` + busName )
        console.log(ws.current)
        ws.current.onopen = () => {
            // connection opened
            console.log('connected')
        };

        ws.current.onmessage = (e: any) => {
            let gps: Location = JSON.parse(e.data); 
            // console.log(e);
            console.log(gps)
            if (gps.lat == null || gps.lng == null) {
                setVisible(false)
                setBusLat(0)
                setBusLng(0)
            }
            else {
                setVisible(true)
                setBusLat(gps.lat)
                setBusLng(gps.lng)
            }

            // console.log(gps.lat);
        };

        ws.current.onerror = (e: React.SyntheticEvent<HTMLInputElement>) => {
            setVisible(false)
            setBusLat(0)
            setBusLng(0)
            // an error occurred
            console.log(e);
        };

        ws.current.onclose = (e: React.SyntheticEvent<HTMLInputElement>) => {
            // connection closed
            console.log(e);
        };

        return () => {
            console.log("동작")
            ws.current.close();
        };
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

    const Gps = () => {
        if(bus_lat != null && bus_lng != null)
            return (<Marker coordinate={{latitude: +bus_lat, longitude: +bus_lng}} title={"버스"} />)
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                ref={mapRef}
                showsUserLocation={true}
                provider={'google'}
                initialRegion={{
                    latitude: 36.38,
                    longitude: 127.51,
                    latitudeDelta: 3,
                    longitudeDelta: 4,
                }}
            >
                {MarkList()}
                {visible ? Gps() : null}
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
        height: '95%',
        position: 'absolute',
        bottom: 5,
    },
});

export default BusMapScreen;
