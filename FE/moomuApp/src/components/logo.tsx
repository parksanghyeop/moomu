import React from "react";
import { StyleSheet, Image, View, Text, ImageBackground } from "react-native";
import LogoFaqContent from "./logoContents/LogoFaqContent";
import LogoInformationContent from "./logoContents/LogoInformationContent";
import LogoMainContent from "./logoContents/logoMainContent";
import LogoNotificationContent from "./logoContents/LogoNotificationContent";

let big = require("../../assets/images/Logo.png");
let small = require("../../assets/images/Logo2.jpg");

export const Logo = () => {
  return <Image style={styles.big} source={big} />;
};

export const Logo2 = () => {
  return <Image style={styles.small} source={small} />;
};

export const Logo3 = (props: any) => {
  const logoContent: any = {
    main: <LogoMainContent navigation={props.navigation} />,
    information: <LogoInformationContent navigation={props.navigation} />,
    faq: <LogoFaqContent navigation={props.navigation} />,
    notification: <LogoNotificationContent navigation={props.navigation} />,
  };

  return (
    <View style={styles.customLogo}>
      <Text style={styles.logoText}>MOOMU</Text>
      {logoContent[props.content]}
    </View>
  );
};

const styles = StyleSheet.create({
  customLogo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#63B3ED",
    justifyContent: "center",
  },
  logoText: {
    textAlign: "center",
    fontSize: 26,
    color: "#63B3ED",
  },

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  big: {
    width: 264,
    height: 264,
    resizeMode: "contain",
  },
  small: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
});
