import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation"; 
import Footer from '../components/footer';
import axios from '../api/axios';
import requests from '../api/requests';

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

  const [stationList,setStationList] = useState<[station]>();

  useEffect(() => {
    (async () => {
        // 토큰 해석
        
        // JWT

        axios.get(requests.shuttlebus, {
          params: {
            region_id : 100,
            commute_or_leave : 'COMMUTE'
          }
        })
        .then((response) => {
          
        })
        .catch((error) => {
          console.log(error);
          
        })

    })();
  }, []);

  const renderItem = ( {item} : {item : station}) => <Item name={item.name} />;

  return (
    <View style={styles.container}> 
      <View style={styles.container2}>
        <Text>{props.route.params.bus_id}호차</Text>
      </View>
      <View>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
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
    flexDirection: 'column',
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