import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, View, Text } from "react-native";

const MainScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Main Screen</Text>
      <Button
        title="노선 조회"
        onPress={() => navigation.navigate("노선조회")}
      />
      <Button
        title="공지사항"
        onPress={() => navigation.navigate("공지사항")}
      />
      <Button title="FAQ" onPress={() => navigation.navigate("FAQ")} />
    </View>
  );
};

const BusSearchScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>노선 조회 페이지입니다</Text>
    </View>
  );
};

const InformationScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>공지사항 페이지입니다</Text>
    </View>
  );
};

const FAQScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>FAQ 페이지입니다</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="노선조회" component={BusSearchScreen} />
        <Stack.Screen name="공지사항" component={InformationScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
