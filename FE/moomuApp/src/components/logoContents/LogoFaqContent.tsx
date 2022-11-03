import React from "react";
import { StyleSheet, Image, View, Text, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LogoFaqContent = (props: any) => {
  return (
    <Text
      style={styles.logoContent}
      onPress={() => {
        console.log("clicked");
        props.navigation.navigate("FAQ");
      }}
    >
      <FontAwesome name="question-circle-o" size={16} />
      &nbsp;
      <Text>건의사항</Text>
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

export default LogoFaqContent;
