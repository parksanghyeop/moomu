import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList} from "../types/StackNavigation";

type BusScreenProps = StackScreenProps<RootStackParamList,"Bus"> 

const BusScreen: React.FC<BusScreenProps> = (props) => {
  

  return (
    <View style={styles.container}> 
      <View style={styles.container2}>
        
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
    flexDirection: 'column',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
});

export default BusScreen;