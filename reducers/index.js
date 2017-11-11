import { ADD_DECK, UPDATE_DECK } from "../actions";
import Reactotron from "reactotron-react-native";

function decks(state = initialDecksState, action) {
  switch (action.type) {
    case ADD_DECK:
    case UPDATE_DECK:
      return {
        ...state,
        ...action.deck
      };
    default:
      return state;
  }
}

const initialDecksState = {};

export default {
  decks
};
