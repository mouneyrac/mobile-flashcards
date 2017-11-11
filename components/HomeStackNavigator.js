import React from "react";
import { StackNavigator } from "react-navigation";
import RootTabs from "./RootTabs";
import DeckScreen from "./DeckScreen";
import AddCardScreen from "./AddCardScreen";
import QuizScreen from "./QuizScreen";

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
  },
  StartedQuiz: {
    screen: QuizScreen,
    navigationOptions: {
      headerTitle: ""
    }
  }
});

export default HomeStackNavigator;
