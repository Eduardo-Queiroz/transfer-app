import { expectRoute, containsText, expectBool } from "../util";
import { navigate } from "~/lib/util";
import { AsyncStorage } from "react-native";

export const goToDeposit = async (
  spec,
  { route } = {
    route: "TransferAddName",
  }
) => {
  navigate("TransferHome");
  await spec.press("Transaction_Header_Deposit");
  expectRoute(route);
};

export const goToTransfer = async (
  spec,
  { route } = {
    route: "TransferAddName",
  }
) => {
  navigate("TransferHome");
  await spec.press("Transaction_Header_Transfer");
  expectRoute(route);
};

export const transferName = async (
  spec,
  { nameInput, nameError, route } = {
    nameInput: "DESCRIPTION",
    nameLabel: "Qual a descrição da transferencia?",
    nameError: "",
    route: "TransferAddMoney",
  }
) => {
  const transferNameLabel = await spec.findComponent(
    `Transaction_Add_Name_Label`
  );
  containsText(transferNameLabel, nameLabel);

  if (nameInput) await spec.fillIn("Transaction_Add_Name", nameInput);
  if (nameError) {
    const transferNameError = await spec.findComponent(
      `Transaction_Add_Name_Error`
    );
    containsText(transferNameError, nameError);
  }
  await spec.press("Transaction_Add_Name_Next");
  expectRoute(route);
};

export const transferMoney = async (
  spec,
  { moneyInput, moneyError, nameLabel, route } = {
    moneyInput: "200",
    nameLabel: "Qual a descrição da transferencia?",
    moneyError: "",
    route: "TransferAddPreview",
  }
) => {
  const transferMoneyLabel = await spec.findComponent(
    `Transaction_Add_Money_Label`
  );
  containsText(transferMoneyLabel, nameLabel);

  if (moneyInput) await spec.fillIn("Transaction_Money_Name", moneyInput);
  if (moneyError) {
    const transferMoneyError = await spec.findComponent(
      `Transaction_Money_Name_Error`
    );
    containsText(transferMoneyError, moneyError);
  }
  await spec.press("Transaction_Money_Name_Next");
  await spec.pause(1500);
  expectRoute(route);
};

export const transferPreview = async (
  spec,
  { nameLabel, moneyLabel, typeLabel, route } = {
    nameLabel: "DESCRIPTION",
    moneyLabel: "R$200,00",
    typeLabel: "Você está tranferindo",
    route: "TransferHome",
  }
) => {
  const transferTypeLabel = await spec.findComponent(
    `Transaction_Add_Preview_Type`
  );
  containsText(transferTypeLabel, typeLabel);

  const transferNameLabel = await spec.findComponent(
    `Transaction_Add_Preview_Description`
  );
  containsText(transferNameLabel, nameLabel);

  const transferMoneyLabel = await spec.findComponent(
    `Transaction_Add_Preview_Money`
  );
  containsText(transferMoneyLabel, moneyLabel);

  await spec.press("Transaction_Add_Preview_Confirm");
  await spec.pause(1500);
  expectRoute(route);
};

export const transferToggleVisible = async (spec) => {
  const balance = await spec.findComponent(`Transaction_Header_Balance`);
  containsText(balance, ",");
  await spec.press("Transaction_Header_Toggle_Visible_Balance");
  const changedBalance = await spec.findComponent(`Transaction_Header_Balance`);
  containsText(changedBalance, "*");
  await spec.press("Transaction_Header_Toggle_Visible_Balance");
};

export const transferList = async (
  spec,
  { nameItem, valueItem } = {
    nameItem: "",
    valueItem: 0,
  }
) => {
  const transferItem = await spec.findComponent(`Transaction_Item_${nameItem}`);
  expectBool(valueItem, transferItem.props.value);
};
