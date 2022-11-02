import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation"; 
import Footer from '../components/footer';
import axios from '../api/axios';
import requests from '../api/requests';
import Mapsvg from '../../assets/icons/map.svg';

type StationScreenProps = StackScreenProps<RootStackParamList,"Station"> 

interface station {
  bus_id : number,
  name : string,
  lat : string,
  lng : string,
  order : number,
  arrived_time : string,
  id : number
};

const DATA = [
  { 
    bus_id : 1,
    name : "한남오거리",
    lat : "36.1235",
    lng : "121.42356",
    order : 1,
    arrived_time : "07:45",
    id : 1
  },
  { 
    bus_id : 1,
    name : "재뜰네거리",
    lat : "36.13589",
    lng : "121.48431",
    order : 2,
    arrived_time : "07:55",
    id : 2
  },
  { 
    bus_id : 1,
    name : "정부청사역",
    lat : "36.13589",
    lng : "121.48431",
    order : 3,
    arrived_time : "07:55",
    id : 3
  }
];

const Item = ( {name} : {name:string}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const StationScreen: React.FC<StationScreenProps> = (props) => {

  const [stationList,setStationList] = useState<station[]>();

  useEffect(() => {
    (async () => {
        // 토큰 해석
        
        // JWT

        axios.get(requests.shuttlebus_notion+props.route.params.bus_id, {
        })
        .then((response) => {
          setStationList(response.data.stations);
          // console.log(stationList);
          
        })
        .catch((error) => {
          console.log(error);
          
        })

    })();
  }, []);

  const renderItem = ( {item} : {item : station}) => <Item name={item.name} />;

  return (
    <View style={styles.container}> 
      <SafeAreaView style={styles.container2}>
        <Text>{props.route.params.name}</Text>
        <Mapsvg style={[{width:27, height:24}]} onPress={() => {props.navigation.navigate('BusMap')}} />
      </SafeAreaView>
      <View>
        <FlatList data={stationList} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
      </View>
      <Footer/>
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
  container2: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default StationScreen;