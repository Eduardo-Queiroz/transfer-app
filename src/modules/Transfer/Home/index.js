import React, { useEffect } from "react";
import { withNavigation } from "react-navigation";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native";
import { FlatList } from "~/components";
import { Actions } from "~/redux/reducers/transfer";
import { Item } from "./Item";
import Header from "./Header";
import Loader from "./Loader";
import Empty from "./Empty";

const { transferList, transferBalance } = Actions;

const TransferHome = () => {
  const dispatch = useDispatch();
  const { list, pending } = useSelector(({ transfer: { list, pending } }) => ({
    list,
    pending,
  }));
  useEffect(() => {
    dispatch(transferBalance());
    dispatch(transferList());
  }, []);
  return (
    <SafeAreaView>
      <Header />
      <FlatList
        data={list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Item {...item} />}
        ListEmptyComponent={!!pending ? <Loader /> : <Empty />}
        trackExtractor={({ item }) => `Transaction_Item_${item.name}`}
      />
    </SafeAreaView>
  );
};

export default TransferHome;
