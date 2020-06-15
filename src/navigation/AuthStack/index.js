import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Header } from "~/components";
import { Login, RegisterEmail, RegisterPassword } from "~/modules";

export default (mainStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  RegisterEmail: {
    screen: RegisterEmail,
    navigationOptions: {
      header: <Header back />,
    },
  },
  RegisterPassword: {
    screen: RegisterPassword,
    navigationOptions: {
      header: <Header back />,
    },
  },
}));
