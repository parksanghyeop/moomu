import React from "react";
import { StyleSheet, Image, View, Text, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LogoInformationContent = (props: any) => {
  return (
    <Text
      style={styles.logoContent}
      onPress={() => {
        console.log("clicked");
        props.navigation.navigate("Information");
      }}
    >
      <FontAwesome name="check" size={14} />
      <Text>공지사항</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  logoContent: {
    color: "#63B3ED",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default LogoInformationContent;
