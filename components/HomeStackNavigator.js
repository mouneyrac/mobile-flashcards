import React from "react";
import { StackNavigator } from "react-navigation";
import RootTabs from "./RootTabs";
import DeckScreen from "./DeckScreen";
import AddCardScreen from "./AddCardScreen";

const HomeStackNavigator = StackNavigator({
  Home: {
    screen: RootTabs,
    navigationOptions: {
      headerTitle: "Decks"
    }
  },
  Quiz: {
    screen: DeckScreen,
    navigationOptions: {
      headerTitle: "Quiz"
    }
  },
  AddCard: {
    screen: AddCardScreen,
    navigationOptions: {
      headerTitle: "Add Card"
    }
  }
});

export default HomeStackNavigator;
