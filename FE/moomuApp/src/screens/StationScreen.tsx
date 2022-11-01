import React, {useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation"; 
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
}

interface Bus {
  region_id : number,
  name : string,
  commute_or_leave : string,
  id : number,
  stations : [station],
  cur : []
}

const data = {
  region_id : 200,
  name : "1호차",
  commute_or_leave : "COMMUTE",
  id : 1,
  stations : [{
    bus_id : 1,
    name : "한남오거리",
    lat : "36.1235",
    lng : "121.42356",
    order : 1,
    arrived_time : "07:45",
    id : 1},
    {bus_id : 2,
      name : "재뜰네거리",
      lat : "36.13589",
      lng : "121.48431",
      order : 2,
      arrived_time : "07:55",
      id : 2}],
  cur : []
}

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

  return (
    <View style={styles.container}> 
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
});

export default StationScreen;