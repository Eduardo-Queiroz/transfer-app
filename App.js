import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import OfflineNotice from "~/components/offlineNotice";
import { store } from "~/redux/store";
import Navigator from "~/navigation";

const App = () => (
  <ReduxProvider store={store}>
    <PaperProvider>
      <Navigator />
      {/* <OfflineNotice /> */}
    </PaperProvider>
  </ReduxProvider>
);

export default App;
