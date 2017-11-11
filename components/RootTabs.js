import React from "react";
import { TabNavigator } from "react-navigation";
import AddDeckScreen from "./AddDeckScreen";
import DeckListScreen from "./DeckListScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const RootTabs = TabNavigator(
  {
    Decks: {
      screen: DeckListScreen,
      navigationOptions: {
        tabBarLabel: "Deck List",
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? "ios-home" : "ios-home-outline"}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    },
    Add: {
      screen: AddDeckScreen,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialCommunityIcons
            name={focused ? "plus" : "plus-outline"}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

export default RootTabs;
