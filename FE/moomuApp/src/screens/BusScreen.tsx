import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/StackNavigation';
import Button1 from '../components/button1';
import axios from '../api/axios';
import requests from '../api/requests';
import Footer from '../components/footer';
import * as AsyncStorage from '../utiles/AsyncService';
import jwtDecode from 'jwt-decode';

import * as RootNavigation from '../../RootNavigation';

type BusScreenProps = StackScreenProps<RootStackParamList, 'Bus'>;

interface station {
  bus_id: number;
  name: string;
  lat: string;
  lng: string;
  order: number;
  arrived_time: string;
  id: number;
}

interface Bus {
  region_id: number;
  name: string;
  commute_or_leave: string;
  id: number;
  stations: station[];
  cur: any[];
}

interface jwt {
  exp: number;
  id: number;
  nickname: string;
  region: number;
  role: number;
}

const data = [
  {
    region_id: 200,
    name: '1호차',
    commute_or_leave: 'COMMUTE',
    id: 2,
    stations: [
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
        bus_id: 2,
        name: '재뜰네거리',
        lat: '36.13589',
        lng: '121.48431',
        order: 2,
        arrived_time: '07:55',
        id: 2,
      },
    ],
    cur: [],
  },
  {
    region_id: 200,
    name: '2호차',
    commute_or_leave: 'COMMUTE',
    id: 3,
    stations: [
      {
        bus_id: 2,
        name: '한남오거리',
        lat: '36.1235',
        lng: '121.42356',
        order: 1,
        arrived_time: '07:45',
        id: 1,
      },
      {
        bus_id: 2,
        name: '재뜰네거리',
        lat: '36.13589',
        lng: '121.48431',
        order: 2,
        arrived_time: '07:55',
        id: 2,
      },
    ],
    cur: [],
  },
];

const BusScreen: React.FC<BusScreenProps> = (props) => {
  const [busList, setBusList] = useState<Bus[]>([] as Bus[]);
  const [current, setCurrent] = useState('');
  const [region_id, setRegion_id] = useState<number>();
  let decoded: jwt;

  useEffect(() => {
    (async () => {
      // 토큰 해석
      let token: string;
      let isDecoded = false;
      await AsyncStorage.getData('token').then((response) => {
        token = response;
        decoded = jwtDecode(token);
        isDecoded = true;
      });

      if (isDecoded) {
        axios
          .get(requests.shuttlebus, {
            params: {
              region_id: decoded.region,
              commute_or_leave: 'COMMUTE',
            },
          })
          .then((response) => {
            // console.log(response.data);
            setBusList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, []);

  const ButtonList = () => {
    const result = [];
    for (let i = 0; i < busList.length; i++) {
      result.push(
        <Button1
          key={busList[i].id}
          text={busList[i].name}
          onPress={() =>
            RootNavigation.navigate('Station', {
              bus_id: busList[i].id,
              name: busList[i].name,
              commute_or_leave: busList[i].commute_or_leave,
            })
          }
        ></Button1>
      );
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text>출근 노선</Text>
        <Text>퇴근 노선</Text>
      </View>
      <View>{ButtonList()}</View>
      <Footer />
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
    flexDirection: 'row',
  },
});

export default BusScreen;
