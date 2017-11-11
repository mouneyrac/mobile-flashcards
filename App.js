import React from "react";
import { Text, View } from "react-native";
import HomeStackNavigator from "./components/HomeStackNavigator";
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
import { setLocalNotification } from "./utils/helpers";

const config = {
  key: "root",
  storage
};

const reducer = persistCombineReducers(config, reducers);

const store = Reactotron.createStore(reducer, compose(applyMiddleware()));
const persistor = persistStore(store);

const onBeforeLift = () => {
  // Uncomment this following line to purge the store from AsyncStorage
  // persistor.purge();
};

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Deck title="Currently Loading" cards={[]} />}
          onBeforeLift={onBeforeLift}
          persistor={persistor}
        >
          <HomeStackNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
