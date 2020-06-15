// @flow

import { AsyncStorage } from "react-native";

class TransferService {
  balance = async () => {
    const user = await AsyncStorage.getItem("@User");
    const list = JSON.parse(
      await AsyncStorage.getItem("@Transfer:List" + user)
    ) || [{ value: 0 }];
    return list.map((a) => a.value).reduce((a, b) => a + b, 0);
  };
  list = async () => {
    const user = await AsyncStorage.getItem("@User");
    return (
      JSON.parse(await AsyncStorage.getItem("@Transfer:List" + user)) || []
    );
  };
  add = async ({ value, name }) => {
    const user = await AsyncStorage.getItem("@User");
    const list =
      JSON.parse(await AsyncStorage.getItem("@Transfer:List" + user)) || [];
    await AsyncStorage.setItem(
      "@Transfer:List" + user,
      JSON.stringify([{ value, name }, ...list])
    );
  };
}
export default new TransferService();
