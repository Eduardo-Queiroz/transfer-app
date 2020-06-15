import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Header } from "~/components";
import {
  TransferHome,
  TransferAddMoney,
  TransferAddName,
  TransferAddPreview,
} from "~/modules";

export default (mainStack = createStackNavigator({
  TransferHome: {
    screen: TransferHome,
    navigationOptions: {
      header: null,
    },
  },
  TransferAddName: {
    screen: TransferAddName,
    navigationOptions: {
      header: <Header back />,
    },
  },
  TransferAddMoney: {
    screen: TransferAddMoney,
    navigationOptions: {
      header: <Header back />,
    },
  },
  TransferAddPreview: {
    screen: TransferAddPreview,
    navigationOptions: {
      header: <Header close />,
    },
  },
}));
