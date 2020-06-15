import React from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "~/styles";
import { useInit } from "~/lib/hooks";
import { styles } from "./styles";

const AuthLoadingNavigation = () => {
  useInit();
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.primaryDark, colors.primary]}
      style={styles.container}
    >
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ActivityIndicator hidesWhenStopped={true} color={colors.white} />
    </LinearGradient>
  );
};

export default AuthLoadingNavigation;
