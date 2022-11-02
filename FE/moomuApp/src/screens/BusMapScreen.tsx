import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

type BusMapScreenProps = StackScreenProps<RootStackParamList,"BusMap"> 



const BusMapScreen: React.FC<BusMapScreenProps> = (props) => {
  const [location, setLocation] = useState();

  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  const mapRef = React.useRef<any>();

  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        const { coords:{latitude, longitude} } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced,
          timeInterval: 5});

        //let location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: true});
        // console.log(location);
        setLocation(location);
        setLatitude(latitude);
        setLongitude(longitude);
    })();
  }, []);

  

  const goToMyLocation = async () => {
    mapRef.current.animateCamera({center: {"latitude":latitude, "longitude":longitude}});
  }

  return (
    <View style={styles.container}> 
      <MapView style={styles.map} ref={mapRef} showsUserLocation={true}></MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
});

export default BusMapScreen;