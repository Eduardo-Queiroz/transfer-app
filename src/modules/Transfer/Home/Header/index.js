import React from "react";
import { View, StatusBar, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";
import { compose } from "recompose";
import { useSelector, useDispatch } from "react-redux";
import { TRANSACTION_TYPE } from "~/lib/types";
import {
  SecondaryButton,
  IconButton,
  Text,
  Row,
  Paragraph,
} from "~/components";
import { withTheme } from "react-native-paper";
import { formatMoney } from "~/lib/util";
import { ContainerHeader } from "./styles";

import { Actions } from "~/redux/reducers/transfer";
const { transferSetFieldForm, transferToggleVisibleBalance } = Actions;

const Header = ({ theme: { colors }, navigation }) => {
  const dispatch = useDispatch();
  const { balance, isBalanceVisible } = useSelector(
    ({ transfer: { balance, isBalanceVisible } }) => ({
      balance,
      isBalanceVisible,
    })
  );
  const logout = () => {
    AsyncStorage.setItem("@User", "");
    dispatch({ type: "CLEAR" });
    navigation.navigate("Login");
  };
  return (
    <ContainerHeader style={{ backgroundColor: colors.primary }}>
      <StatusBar barStyle="#fff" backgroundColor={colors.primary} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 14, paddingLeft: 0 }}>
          <Text style={{ color: "#fff" }}>Seu saldo atual</Text>
        </View>
        <IconButton
          idTrack="Transaction_Header_Logout"
          size={22}
          color="#fff"
          icon="logout"
          onPress={() => logout()}
        />
      </View>
      <Row>
        <Text
          idTrack="Transaction_Header_Balance"
          style={{ fontSize: 30, color: "#fff" }}
        >
          {isBalanceVisible ? formatMoney(balance) : "R$******"}
        </Text>
        <IconButton
          idTrack="Transaction_Header_Toggle_Visible_Balance"
          size={22}
          color="#fff"
          icon="eye"
          onPress={() => dispatch(transferToggleVisibleBalance())}
        />
      </Row>
      <Row>
        <SecondaryButton
          idTrack="Transaction_Header_Deposit"
          color="#fff"
          title="Depositar"
          onPress={() => {
            dispatch(transferSetFieldForm({ type: TRANSACTION_TYPE.DEPOSIT }));
            navigation.navigate("TransferAddName");
          }}
        />
        <SecondaryButton
          idTrack="Transaction_Header_Transfer"
          color="#fff"
          style={{ borderColor: "#fff" }}
          mode="outlined"
          title="Transferir"
          onPress={() => {
            dispatch(transferSetFieldForm({ type: TRANSACTION_TYPE.TRANSFER }));
            navigation.navigate("TransferAddName");
          }}
        />
      </Row>
    </ContainerHeader>
  );
};
export default compose(
  withTheme,
  withNavigation
)(Header);
