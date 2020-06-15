import React from "react";
import { AsyncStorage } from "react-native";
import { navigate } from "~/lib/util";

export default (useInit = () => {
  const checkLogin = async () => {
    try {
      const user = await AsyncStorage.getItem("@User");
      return !!user;
    } catch (e) {
      console.log(e);
    }
  };

  const isLogged = async () => {
    if (await checkLogin()) navigate("TransferHome");
    else navigate("Login");
  };

  isLogged();
});
