import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import Footer from '../components/footer';
import axios from '../api/axios';
import requests from '../api/requests';
import Mapsvg from '../../assets/icons/map.svg';
import * as RootNavigation from '../../RootNavigation';
import Button1 from '../components/button1';
import * as AsyncStorage from '../utiles/AsyncService';

type StationScreenProps = StackScreenProps<RootStackParamList, 'Station'>;

interface station {
  bus_id: number;
  name: string;
  lat: string;
  lng: string;
  order: number;
  arrived_time: any;
  id: number;
}

interface myStation{
  start_station_id: any;
  end_station_id: any;
  id : number;
}

const data : myStation = {
  start_station_id : 64,
  end_station_id: 2,
  id : 1,
}

const StationScreen: React.FC<StationScreenProps> = (props) => {
  const [stationList, setStationList] = useState<station[]>();
  const [select,setSelect] = useState<boolean>(false);
  const [mystation,setMystation] = useState<myStation>();

  useEffect(() => {
    (async () => {
      // 셔틀버스 노선 조회
      axios
        .get(requests.shuttlebus_notion + props.route.params.bus_id)
        .then((response) => {
          setStationList(response.data.stations);
          // console.log(stationList);
        })
        .catch((error) => {
          console.log(error);
        });
      // 승차/하차 등록 지점 조회
      setMystation(data);
      axios.get(requests.station)
        .then((response) => {
            // setMystation(response.data);
            setMystation(data);
            console.log(response);
            console.log(mystation);
        })
        .catch((error) => {
          
          console.log(error);
        });

    })();
  }, []);

  const commute_or_leave = select ?
  <Button1 text={"선택 확정"} onPress={() => setSelect(false)} /> :
  <Button1 text={"승차지점변경"} onPress={() => setSelect(true)} />

  const arriveTime = ( arrived_time : any) => {
    if(arrived_time != null){
      return (<Text style={styles.time}>
        {props.route.params.commute_or_leave == "COMMUTE" ? arrived_time.substring(0,5) : +arrived_time.substring(0,1)-12 + arrived_time.substring(2,5) }
        {props.route.params.commute_or_leave == "COMMUTE" ? " AM" : " PM"}
        </Text>);
    }
  }

  const stationSelected = (id : number) => {
    if(id == mystation?.start_station_id){
      return(<Text style={[styles.title]}>내 승차지점</Text>);
    }
    else if (id == mystation?.end_station_id){
      return(<Text style={[styles.title]}>내 하차지점</Text>);
    }else return;
  }

  const select_or_selectd = (id : number) => {
    if(id == mystation?.start_station_id || id == mystation?.end_station_id){
      return(<Text style={[styles.title,styles.select]}>선택됨</Text>);
    }
    else {
      return(<Text style={[styles.title,styles.select]}>선택</Text>);
    };
  }


  const Item = ({ id,name, arrived_time }: { id:number,name: string, arrived_time : any }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      {arriveTime(arrived_time)}
      {stationSelected(id)}

      {select_or_selectd(id)}

      <View style={styles.circle}/>

    </View>
  );

  const renderItem = ({ item }: { item: station }) => <Item id={item.id} name={item.name} arrived_time={item.arrived_time}/>;

  return (
    <View style={styles.container}>
      
      <SafeAreaView style={styles.container2}>
        <Text>{props.route.params.name}</Text>
        <Mapsvg
          style={[{ width: 27, height: 24 }]}
          onPress={() => {
            RootNavigation.navigate('BusMap');
          }}
        />
      </SafeAreaView>
      
      <View style={[{width: '100%', height: '70%'}]}>
        <FlatList
          data={stationList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.line}/>
      <View style={[{flexDirection: 'row'}]}>
        <Button1 text={"이전으로"} onPress={() => RootNavigation.goBack()} />
        {commute_or_leave}
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
  container2: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontFamily: 'Pretendard Variable',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
    color: '#000000',
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
    height: '80%',
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
  select:{
    position: 'absolute',
    right: 50,
    top: 10,
  }
});

export default StationScreen;
