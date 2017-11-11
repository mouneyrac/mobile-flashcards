import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootTabs from "./components/RootTabs";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import "./ReactotronConfig";
import Reactotron from "reactotron-react-native";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import { PersistGate } from "redux-persist/es/integration/react";
import Deck from "./components/Deck";

const config = {
  key: "root",
  storage
};

const reducer = persistCombineReducers(config, reducers);

const store = Reactotron.createStore(reducer, compose(applyMiddleware()));
const persistor = persistStore(store);

const onBeforeLift = () => {
  // persistor.purge();
};

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Deck title="Currently Loading" cards={[]} />}
          onBeforeLift={onBeforeLift}
          persistor={persistor}
        >
          <View style={styles.container}>
            <RootTabs />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
