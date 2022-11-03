import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch } from "react-native";
import Footer from "../components/footer";
import Button1 from "../components/button1";
import "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/StackNavigation";
import { Logo3 } from "../components/logo";
type FaqScreenProps = StackScreenProps<RootStackParamList, "FAQ">;

const FaqScreen: React.FC<FaqScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={[{ flex: 1, alignItems: "center", marginTop: 50 }]}>
        <Logo3 content="faq" navigation={props.navigation} />
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    width: 220,
    height: 21,
    top: 109,

    fontFamily: "Pretendard Variable",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",

    /* BLUE 500 */
    color: "#3182CE",
  },
  text1: {
    position: "absolute",
    width: 220,
    height: 21,
    top: 109,

    fontFamily: "Pretendard Variable",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",

    color: "#000000",
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
});

export default FaqScreen;
